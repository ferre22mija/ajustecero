import { Badge, Td, Tr } from "@chakra-ui/react";
import { ProductoApi } from "../models/ProductoApi";
import { useEffect, useState } from "react";

function Fila({ producto }: { producto: ProductoApi }) {
  const [colorBadge, SetColorBadge] = useState("gray");

  useEffect(() => {
    function changeBadge() {
      const estado = producto.estado;
      if (estado === "sin procesar") {
        SetColorBadge("gray");
      } else if (estado === "sin proceso") {
        SetColorBadge("green");
      } else {
        SetColorBadge("red");
      }
    }
    changeBadge();
  }, [colorBadge, producto]);
  return (
    <Tr key={producto.id}>
      <Td>{producto.id}</Td>
      <Td>{producto.name}</Td>
      <Td>
        {producto.inventory.warehouses
          ? producto.inventory.warehouses[0].availableQuantity
          : "sin cantidad"}
      </Td>
      <Td>
        {" "}
        <Badge colorScheme={colorBadge}>{producto.estado}</Badge>
      </Td>
      <Td>{producto.resultado}</Td>
    </Tr>
  );
}
export default Fila;
