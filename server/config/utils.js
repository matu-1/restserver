
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
console.log(pick(obj, ['apellido', 'edad']));

module.exports = { pick };


var exp = new RegExp('hola', 'i');
// console.log(exp);
var reg = /ti/;
// console.log(reg.exec('matias'));

console.log('sabe' + (undefined || '') );