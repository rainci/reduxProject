let sampleTreeData = {
  "1": {
    pa: null
  },
  "11": {
    pa: 1,
  },
  "111": {
    pa: 11,
  },
  "12": {
    pa: 1,
  },
}
let select = ["1", "11", "111", "12"] 


let resault = [];
function f(){
 for(let [i, value] of select.entries()) {
   let item = sampleTreeData[value];
   const pa = item.pa;
   if(pa !== null) {
     resault.push([value])
     select.splice(i, 1);
   } else {
     // 已选里面找爹
     const paIndex = select.indexOf(pa);
     if (paIndex > -1) {
       resault.push([value, pa]);
       select.splice(i, 1);
       select.splice(paIndex, 1);
     } else if (paIndex) {}
     // 备选里面找爹
     
   }
 }
}