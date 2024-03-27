import axios, { AxiosError } from "axios";
import { ProductoApi } from "../models/ProductoApi";

const options = {
  method: "POST",
  url: "https://api.alegra.com/api/v1/inventory-adjustments",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    authorization:
      "Basic ZmVycmV0ZXJpYWNlcmFtaWNhc21pamFyZXNAZ21haWwuY29tOjBjNzE0YTRjNjE0MGJkYjdhYzg1",
  },
  data: {
    warehouse: { id: "1" },
    costCenter: { id: "1" },
    date: "2023-12-26",
    observations: "ajuste por programa",
    items: [{ type: "in", id: 1, unitCost: 0.5, quantity: 5 }],
  },
};

interface ItemAjuste {
  type: string;
  id: number;
  unitCost: number;
  quantity: number;
}
export const CrearAjusteBloque = async (productos: Array<ProductoApi>) => {
  const newProducts: Array<ItemAjuste> = [];
  productos.forEach((element: ProductoApi) => {
    let tipo: string = "in";
    const cant = element.inventory.warehouses.find(ele => ele.id === "1");
    if(cant) {
      let cantidad = cant.availableQuantity
      if (cantidad > 0) {
        tipo = "out";
      } else {
        cantidad = cantidad * -1;
      }
  
      const newItemAjuste: ItemAjuste = {
        id: element.id,
        unitCost: element.inventory.unitCost,
        type: tipo,
        quantity: cantidad,
      };
      newProducts.push(newItemAjuste);
    }
    
  });
  options.data.items = newProducts;
  console.log(options);
  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    // return {message:(error as AxiosError)?.message};
    return error;
  }
  
};
