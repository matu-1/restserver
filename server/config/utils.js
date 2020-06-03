
//retorna un nuevo objeto con las propiedades(keys) elegidas
let pick = (obj, keys) => {   
  let newObj = {};
  for (const key of keys) {
    if(obj[key]) newObj[key] = obj[key]; 
  }
  return newObj;
}

let obj = {
  nombre: 'matias',
  edad: 12,
  celuar: 897897,
}
console.log(pick(obj, ['edad']));

module.exports = { pick };
