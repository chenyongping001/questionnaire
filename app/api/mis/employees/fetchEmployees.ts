import axios from "axios";
import { env } from "process";

const fetchOriginEmployees = async (search:string)=>await axios
      .get(`http://10.160.128.5:8000/mis/employeephones/?search=${search}`, {
        headers: {
          Authorization: env.MIS_AUTHORIZATION,
        },
      })
      .then((res) => res.data.results)

export const fetchShowCompanys = async (serach:string)=>{
    const fetchedCompanys =  await fetchOriginEmployees(serach);
    const fixedCompanys = JSON.parse(
      JSON.stringify(fetchedCompanys)
        .replace(/ygdm/g, "CCZ")
        .replace(/ygmc/g, "XSZ")
    );
    return fixedCompanys;  
}

const fetchEmployees = async (serach:string)=>{
    const fetchedCompanys =  await fetchOriginEmployees(serach);
    const fixedCompanys = JSON.parse(
      JSON.stringify(fetchedCompanys)
        .replace(/ygdm/g, "value")
        .replace(/ygmc/g, "label")
    );
    return fixedCompanys;  
}

export default fetchEmployees;

