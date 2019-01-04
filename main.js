var ipaddress;
var shift=false;
setInterval(function(){
  document.getElementsByClassName("main")[0].height=window.innerHeight;
},15);
var salas=new SALAS();
function SALAS(){
  this.run=function(com){
    this.console.log(this.decrypt(com));
  }
  this.decrypt=function(com){
    var coms=split(com,' ');
    var tmp="";
    console.log(coms);
    if(coms[0]==="get"){
      coms.splice(0,1);
      return this.get(coms);
    }
    if(coms[0]==="clear"){
      this.console.clear();
    }
    if(coms[0]==="log"){
      coms.splice(0,1);
      this.console.log(coms[0]);
    }
    if(coms[0]==="open"){
      coms.splice(0,1);
      this.windowOpen(coms);
    }
  }
  this.windowOpen=function(coms){
    window.open(coms[0]);
  }
  this.console={
    log:function(i){
      document.getElementById("console").children[0].innerHTML+=i+"\n";
    },
    clear:function(){
      document.getElementById("console").children[0].innerHTML="";
    }
  }
  this.getUser=function(coms){
    if(coms[0]==="IP_ADDRESS"){
      this.getIP();
      return ipaddress;
    }
  }
  this.get=function(coms){
    if(coms[0]==="User"){
      coms.splice(0,1);
      return this.getUser(coms);
    }
  }
  this.getIP=function(){
    function getUserIP(onNewIP) { 
      var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      var pc = new myPeerConnection({
        iceServers: []
      }),
      noop = function() {},
      localIPs = {},
      ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
      key;
      function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
      }
      pc.createDataChannel("");
      pc.createOffer(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
          if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
          });
        pc.setLocalDescription(sdp, noop, noop);
      }, noop); 
      pc.onicecandidate = function(ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
      };
    }
    getUserIP(function(ip){
      ipaddress=ip;
    });
  }
}






function split(str){
  if(str===''||!str)
    return;
  var out=[];
  var tmp="";
  var iq=false
  for(var i=0;i<str.length;i++){
    if(str.charAt(i)==="\""){
      iq=!iq;
    }else if(str.charAt(i)===" "&&!iq){
      out.push(tmp);
      tmp="";
    }else{
      tmp+=str.charAt(i);
    }
  }
  out.push(tmp);
  return out;
}

/*
function split(str,char){
  if(str===''||!str||char===''||!char)
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
  out.push(tmp);
  return out;
}
*/





var letters="abcdefghijklmnopqrstuvwxyz"
var numbers="0123456789";
var chars=")!@#$%^&*(";
document.addEventListener("keydown", function(event) { 
  console.log(event.keyCode);
  if(event.keyCode>64&&event.keyCode<91){
    if(!shift){
      document.getElementById("comm").innerHTML+=letters.charAt(event.keyCode-65)
    }else{
      document.getElementById("comm").innerHTML+=letters.charAt(event.keyCode-65).toUpperCase();
    }
  }
  if(event.keyCode===13){
    salas.run(document.getElementById("comm").innerHTML);
  }
  if(event.keyCode===189){
    if(shift){
      document.getElementById("comm").innerHTML+="_";
    }else{
      document.getElementById("comm").innerHTML+="-";
    }
  }
  if(event.keyCode===187){
    if(shift){
      document.getElementById("comm").innerHTML+="+";
    }else{
      document.getElementById("comm").innerHTML+="=";
    }
  }
  if(event.keyCode===222){
    if(shift){
      document.getElementById("comm").innerHTML+="\"";
    }else{
      document.getElementById("comm").innerHTML+="'";
    }
  }
  if(event.keyCode===188){
    if(shift){
      document.getElementById("comm").innerHTML+="<";
    }else{
      document.getElementById("comm").innerHTML+=",";
    }
  }
  if(event.keyCode===190){
    if(shift){
      document.getElementById("comm").innerHTML+=">";
    }else{
      document.getElementById("comm").innerHTML+=".";
    }
  }
  if(event.keyCode===186){
    if(shift){
      document.getElementById("comm").innerHTML+=":";
    }else{
      document.getElementById("comm").innerHTML+=";";
    }
  }
  if(event.keyCode===219){
    if(shift){
      document.getElementById("comm").innerHTML+="{";
    }else{
      document.getElementById("comm").innerHTML+="[";
    }
  }
  if(event.keyCode===221){
    if(shift){
      document.getElementById("comm").innerHTML+="}";
    }else{
      document.getElementById("comm").innerHTML+="]";
    }
  }
  if(event.keyCode>47&&event.keyCode<58){
    if(!shift){
      document.getElementById("comm").innerHTML+=numbers.charAt(event.keyCode-48);
    }else{
      document.getElementById("comm").innerHTML+=chars.charAt(event.keyCode-48);
    }
  }
  if(event.keyCode===8){
    var q="";
    for(var i=0;i<document.getElementById("comm").innerHTML.length-1;i++){
      q+=document.getElementById("comm").innerHTML.charAt(i);
    }
    document.getElementById("comm").innerHTML=q;
  }
  if(event.keyCode===32){
    document.getElementById("comm").innerHTML+=" ";
  }
  if(event.keyCode===191){
    if(shift){
    document.getElementById("comm").innerHTML+="?";
    }else{
    document.getElementById("comm").innerHTML+="/";
    }
  }
  if(event.keyCode===20){
    console.log(!shift);
    shift=!shift;
  }
});
