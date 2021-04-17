function findChars(str){
  let status=false
  for(let c of str){
    if(c=='a'){
      status = true
      continue
    }
    if(status){
      if(c=='b')
        return true
      else
        return false
    }
  }
  return false
}
console.log(findChars('I abm groot'));
// console.log(findChars('I acbm groot'));