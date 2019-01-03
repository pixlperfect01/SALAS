var salas=new SALAS();
function SALAS(){
  this.run=function (com){
    decrypt(com);
  }
}

function decrypt(com){
  var coms=split(com,' ');
  console.log(coms);
  
}

function split(str,char){
  if(str=''||!str||char=''||!char)
    return;
  var out=[];
  var tmp="";
  for(var i=0;i<str.length;i++){
    if(str.charAt(i)!==char){
      tmp+=str.charAt(i);
    }else{
      out.push(tmp);
      tmp="";
    }
  }
  return out;
}
