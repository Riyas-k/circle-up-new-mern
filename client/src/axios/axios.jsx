import axios from "axios";

const connection = axios.create({
  baseURL: "http://ww2.circle-up.online/api",
});

connection.interceptors.request.use(
  (config)=>{
    const token = localStorage.getItem('user');
    if(token){
      config.headers.Authorization=  `Bearer ${token}`;
    }
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
)

export default connection;  
