function match(string){
  let state=start;
  for(let c of string){
    console.log(c);
    state=state(c);
  }
  return state===end;
}
function start(c){
    if(c==="a"){
      return foundA;
    }else{
      return start;
    }
}
function end(c){
  return end;
}

function foundA(c){
  if(c==="b"){
      return foundB;
  }else{
      return start;
  }
}
function foundB(c){
  if(c==="c"){
      return foundC;
  }else{
      return start;
  }
}
function foundC(c){
  if(c==="a"){
      return foundA2;
  }else{
      return start;
  }
}
function foundA2(c){
  if(c==="b"){
      return foundB2;
  }else{
      return start;
  }
}
function foundB2(c){
  if(c==="x"){
      return end;
  }else if(c==="c"){
    return foundC;
  }else{
      return start;
  }
}

// console.log(match("abcabcabx"));
// console.log(match("abcabx"));
console.log(match("abababx"));