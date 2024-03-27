import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { ProductoApi } from "../models/ProductoApi";
import Fila from "./Fila";
import { useRef } from "react";

function TablaInfo({
  productos,
  arrayIndicesActualizar,
  SetArrayIndicesActualizar
}: {
  productos: Array<ProductoApi>;
  arrayIndicesActualizar:Array<number>
  SetArrayIndicesActualizar:React.Dispatch<React.SetStateAction<number[]>>
}) {
  
  return (
    <TableContainer display="block" overflowY="auto" maxH="500px">
      <Table size="sm">
        <Thead position="sticky" top="0" bg="blue.100">
          <Tr>
            <Th>ID</Th>
            <Th>Producto</Th>
            <Th isNumeric>Cantidad</Th>
            <Th isNumeric>Estado</Th>
            <Th isNumeric>Actualizar</Th>
            <Th isNumeric>Resultado</Th>
          </Tr>
        </Thead>
        <Tbody>
          {productos.map((producto: ProductoApi) => {
            producto.estado = "sin procesar";
            producto.resultado = "esperando procesar";
            if (producto.inventory.warehouses) {
              if (producto.inventory.warehouses[0].availableQuantity === 0) {
                producto.estado = "sin proceso";
                producto.resultado =
                  "ya no necesita procesar porque tiene 0 en stock";
              }
            } else {
              producto.estado = "sin proceso";
              producto.resultado =
                "ya no necesita procesar porque es padre único";
            }

            return <Fila key={producto.id} producto={producto} />;
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
export default TablaInfo;
