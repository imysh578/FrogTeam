let a = [{value:1, name:'name'},{value:2, name:'name1'},{value:3, name:'name2', price :100},]

let b = [{value:2, name:'name3'}, {value:7, name:'name2'}, {value:7, name:'name4'}]
let d = [{value:2, name:'name5'}, {value:7, name:'name2'}, {value:7, name:'name4'}]

let c = [...a, ...b, ...d]

c.sort((x,y)=>x.name.localeCompare(y.name));

// c.forEach((el,i)=>{
//   if(i<c.length-1){
//     if(el.name===c[i+1].name){
//       el.value += c[i+1].value;
//       c.splice(i+1,1)
//       i-=1;
//     }
//   }
// })

for (let i = 0; i < c.length; i++) {
  if(i<c.length-1){
    if(c[i].name === c[i+1].name ){
      c[i].value += c[i+1].value;
      c.splice(i+1,1);
      i-=1;
    }
  }
  
}


console.log(c)