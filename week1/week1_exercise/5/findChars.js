function findChars(str,characters){
  let status=true
  for(let c of characters){
    if(str.indexOf(c)!=-1)
      status = true
    else
      status = false
  }
  return status
}
console.log(findChars('I mabcdefgroot','abcdef'));