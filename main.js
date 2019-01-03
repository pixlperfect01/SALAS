var salas=new SALAS();
function SALAS(){
  this.run=function (com){
    console.log(decrypt(com));
  }
  this.get=function(coms){
    if(coms[1]="IP_ADDRESS"){
      return this.getIP()
    }
  }
}

function decrypt(com){
  var coms=split(com,' ');
  var tmp="";
  console.log(coms);
  if(coms[0]==="get"){
    return salas.get(coms);
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
function getIP(){
function getUserIP(onNewIP) { 
  var ipaddress;
    //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
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

     //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });
        
        pc.setLocalDescription(sdp, noop, noop);
    }, noop); 

    //listen for candidate events
    pc.onicecandidate = function(ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}

// Usage

getUserIP(function(ip){
  ipaddress=ip;
});
return ipaddress;
}
