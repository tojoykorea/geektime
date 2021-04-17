function findChar(str,charactor){
  for(let c of str){
    if(c==charactor){
      return true
    }
  }
  return false
}
console.log(findChar('I am groot','a'));
// console.log(findChar('I m groot','a'));