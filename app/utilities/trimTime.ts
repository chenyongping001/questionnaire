export  const convertDateToString = (date:Date)=>
    new Date(+date+8*3600*1000)
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
            

export const keep2Dec = (num:number) =>
    Math.round(num * 100)/100;

export  const convertDateToString2 = (date:Date)=>
date.toISOString()
            .substring(10)
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
            
