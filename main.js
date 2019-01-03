var ipaddress;
setInterval(function(){
  document.getElementsByClassName("main")[0].height=window.innerHeight;
},15);
var salas=new SALAS();
function SALAS(){
  this.run=function (com){
    this.console.log(this.decrypt(com));
  }
  this.decrypt=function(com){
    var coms=split(com,' ');
    var tmp="";
    console.log(coms);
    if(coms[0]==="get"){
      return this.get(coms);
    }
  }
  this.console={
    log:function(i){
      document.getElementById("console").children[0].innerHTML+=i+"\n";
    },
    clear:function(){
      document.getElementById("console").children[0].innerHTML="";
    }
  }
  this.get=function(coms){
    if(coms[1]="IP_ADDRESS"){
      this.getIP();
      return ipaddress;
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






var letters="abcdefghijklmnopqrstuvqxyz"
document.addEventListener("keydown", function(event) { 
  if(event.keyCode>64&&event.keyCode<91){
    document.getElementById("comm").innerHTML+=letters.charAt(event.keyCode-65)
  }
});
