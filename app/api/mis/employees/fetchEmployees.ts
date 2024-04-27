import prisma from "@/prisma/client";

export const fetchOriginEmployees = async (ygdm: string) =>
  // await axios
  //     .get(`http://10.160.128.5:8000/mis/employeephones/?search=${search}`, {
  //       headers: {
  //         Authorization: env.MIS_AUTHORIZATION,
  //       },
  //     })
  //     .then((res) => res.data.results)
  await prisma.mis_V_CYP_YGSJ.findFirstOrThrow({
    where: {
      ygdm: ygdm
    }
  })

// export const fetchShowCompanys = async (ygmc: string) => {
//   const fetchedEmployees = await fetchEmployeesFromYgmc(ygmc)
//   const fixedCompanys = JSON.parse(
//     JSON.stringify(fetchedEmployees)
//       .replace(/ygdm/g, "CCZ")
//       .replace(/ygmc/g, "XSZ")
//   );
//   return fixedCompanys;
// }

const fetchEmployees = async (ygmc: string) => {
  // const fetchedCompanys =  await fetchOriginEmployees(serach);
  const fetchedEmployees = await fetchEmployeesFromYgmc(ygmc)
  const fixedEmployees = JSON.parse(
    JSON.stringify(fetchedEmployees)
      .replace(/ygdm/g, "value")
      .replace(/ygmc/g, "label")
  );
  return fixedEmployees;
}

export default fetchEmployees;

async function fetchEmployeesFromYgmc(ygmc: string) {
  return await prisma.mis_V_CYP_YGSJ.findMany(
    {
      where: {
        ygmc: {
          contains: ygmc,
        }
      }
    }
  );
}

