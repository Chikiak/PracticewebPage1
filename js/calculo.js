const costobasico=0.33;
const costosB=[0.33, 1.07, 1.43, 2.46, 3.00, 4.00, 5.00, 6.00, 7.00, 9.20, 9.45, 9.45];
const costos=[32.78, 86.06, 157.78, 280.72, 430.72, 630.72, 880.72, 1180.72, 1530.72, 2450.72, 3395.72, 3395.72];

function calculateAll(ev){
  ev.preventDefault();
  let n1=document.forms["fcorriente"]["Number1"].value;
  let n2=document.forms["fcorriente"]["Number2"].value;
  let gasto=n2-n1;
  let costo=0;
  if (gasto<=100){
    costo=gasto*costobasico;
  } else if (gasto<=500){
    let div1=parseInt((gasto/50)-2);
    let rest=(gasto%50)*costosB[div1+1];
    costo=costos[div1]+rest;
  } else {
    let div1=parseInt(((gasto-500)/100)+8);
    let rest=((gasto-500)%100)*costosB[div1+1];
    costo=costos[div1]+rest;
    if(isNaN(costo)){
      alert("Supero el gasto de 700 y no hay datos sobre el precio");
    }
  }
  outputCalculate(gasto,costo);
  resetNumbers()
}

function outputCalculate(n1,n2){
  document.getElementById("Resp1").innerHTML= n1;
  document.getElementById("Resp2").innerHTML= valueToDolar(n2);
  if(n1>630){
      document.getElementById("Resp1").className += " text-danger bg-dark";
      document.getElementById("Resp2").className += " text-danger bg-dark";
  }else{
      document.getElementById("Resp1").className = "form-control mt-4 mb-2";
      document.getElementById("Resp2").className = "form-control mt-4 mb-2";
  }
}

function resetNumbers(){
  document.forms["fcorriente"].reset();
}
function valueToDolar(value){
  const dollarformatter = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2});
  return dollarformatter.format(value);
}