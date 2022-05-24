import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:4000';

const useAxios = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchData = async ({url, data}) => {
      try {
        setLoading(true);
        const response= await axios.post(url, data);
        return response;
      } catch (error) {
        setError(error);
        console.dir(error);
      }finally{setLoading(false)}
    };
  
    return {fetchData, error, loading}


}

export default useAxios;