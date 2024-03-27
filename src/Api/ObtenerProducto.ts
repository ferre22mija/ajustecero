import axios from "axios";

const options = {
    method: 'GET',
    url: 'https://api.alegra.com/api/v1/items/',
    headers: {
      accept: 'application/json',
      authorization: 'Basic ZmVycmV0ZXJpYWNlcmFtaWNhc21pamFyZXNAZ21haWwuY29tOjBjNzE0YTRjNjE0MGJkYjdhYzg1'
    }
  };


export const ObtenerProducto = async(id:number)=>{
    try {
      const producto = await axios.request({...options,url:options.url+id});
      return producto
    } catch (error) {
      return error;
    }
    
}