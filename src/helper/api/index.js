import axios from "axios";

export const fetchAPI = async(type, route, payload = {}) => {
  try{
    const https = ["get", "post", "patch", "delete", "put"]; 
    if(!https.includes(type)){
      throw new Error(`${type} is not an http method`)
    }
    const url = `${import.meta.env.VITE_SERVER_URL}/api${route}`;
    
    const res = await axios[type](url, payload);
    return res;
  }catch(e){
  }
}