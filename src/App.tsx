import { Badge, Button, Spacer, Text } from "@chakra-ui/react";
import "./App.css";
import { useEffect, useState } from "react";
import { ProductoApi } from "./models/ProductoApi";
import TablaInfo from "./components/TablaInfo";
import { ObtenerProducto } from "./Api/ObtenerProducto";
import { AxiosError } from "axios";
import { CrearAjusteBloque } from "./Api/CrearAjuste";

const ESPERA_TIEMPO: number = 61000;
let init = 1;
function App() {
  const [productos, SetProductos] = useState<Array<ProductoApi>>([]);
  const [estadoConsulta, SetEstadoConsulta] = useState("inactivo");
  const [arrayIndicesActualizar, SetArrayIndicesActualizar] = useState<
    Array<number>
  >([]);
  function activador() {
    SetEstadoConsulta("activo");
  }
  async function LlenarProductos() {
    
    // console.log("hola");
    const findProducto = await ObtenerProducto(init);
    // error en la consulta
    if ((findProducto as AxiosError).response?.status == 404) {
      console.log("hay un error");

      if (
        (findProducto as AxiosError).response?.data.message ===
        "El ítem no existe"
        
      ) {
        console.log("el item " + init + "no existe");
        init++
        SetEstadoConsulta("giro")
      } else {
        SetEstadoConsulta("inactivo"); //desactiva useEffect
      }
    } else {
      console.log({ producto: findProducto, posicion: init });
      if (findProducto.data.status === "active") {
        SetProductos((products) => [...products, findProducto.data]);
        if (findProducto.data.inventory.warehouses) {
          if (
            findProducto.data.inventory.warehouses[0].availableQuantity !== 0
          ) {
            SetArrayIndicesActualizar([
              ...arrayIndicesActualizar,
              findProducto.data.id,
            ]);
          }
        }
      }else{
        console.log("producto inactivo")
        SetEstadoConsulta("giro")
      }
      
      init++;
      if (init % 15 === 0) {
        SetEstadoConsulta("espera");
      }
    }
  }
  const esperar = async () => {
    console.log("esperando " + ESPERA_TIEMPO / 1000 + " segundos");
    await new Promise((resolve) => setTimeout(resolve, ESPERA_TIEMPO));
  };
  useEffect(() => {
    if (estadoConsulta === "activo") {
      LlenarProductos();
    } else if (estadoConsulta === "espera") {
      const espero = async () => {
        console.log("arrays", { arrayIndicesActualizar, productos });

        //crear ajuste
        let nuevoGrupo: Array<ProductoApi> = [];
        arrayIndicesActualizar.forEach((element) => {
          const founded = productos.find((ele) => ele.id === element);
          // console.log("operacion en" + element, founded);

          if (founded) {
            nuevoGrupo = [...nuevoGrupo,founded]
          }
        });
        console.log("nuevoGrupo en "+ init, nuevoGrupo);
        if (nuevoGrupo.length > 0) {
          const newAjuste = await CrearAjusteBloque(nuevoGrupo);
          console.log({nuevoGrupo,newAjuste});
        }
        await esperar();
        SetArrayIndicesActualizar([]);
        SetEstadoConsulta("activo");
        
      };
      espero();
    } else if (estadoConsulta === "inactivo") {
      console.log("terminó");
    } else if(estadoConsulta === "giro"){
      SetEstadoConsulta("activo")
    }
  });

  return (
    <>
      <Text fontSize="3xl">Cambiar a cero el inventario de principal</Text>

      <Button onClick={activador}>Actualizar</Button>
      <Spacer />
      <Badge
        colorScheme={
          estadoConsulta === "inactivo"
            ? "gray"
            : estadoConsulta === "activo"
            ? "green"
            : estadoConsulta === "espera"
            ? "yellow"
            : "red"
        }
      >
        {estadoConsulta}
      </Badge>
      <TablaInfo
        productos={productos}
        arrayIndicesActualizar={arrayIndicesActualizar}
        SetArrayIndicesActualizar={SetArrayIndicesActualizar}
      />
    </>
  );
}

export default App;
