import axios from "axios";

const options = {
    method: 'GET',
    url: 'https://api.alegra.com/api/v1/items?start=1&limit=10',
    headers: {
      accept: 'application/json',
      authorization: 'Basic ZmVycmV0ZXJpYWNlcmFtaWNhc21pamFyZXNAZ21haWwuY29tOjBjNzE0YTRjNjE0MGJkYjdhYzg1'
    }
  };
  
export const ListarProductos = async () => {
    const productos = await axios.request(options)
    console.log(productos);
    return productos
};
