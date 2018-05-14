//código javascript para comunicação
var sock = new WebSocket("ws://10.0.1.224:80");
var endereco = 0;
var length =0;
var texto = "";
var send = false;
var valS="";

sock.onopen = function(event) {
  alert('socket Connected successfully');
  readTextFile("js/codigos/corinthians.nc");
};
sock.onerror = function(event) {
  //alert('socket is not Connected');
};
sock.onmessage = function(event){
  console.log(event.data);
  if(send){
  readline(texto);
}
}
document.querySelector('button.reiniciar').onclick = function(){
  endereco=0;
  sock.send("M5");
}
document.querySelector('button.Message').onclick = function(){
  sock.send(document.querySelector('input[name="Message"]').value);
//  console.log(texto);
}
document.querySelector('button.Iniciar').onclick = function(){
  if(send){
    send=false;
    sock.send("M5");
  }
  else{

    send = true;
    sock.send("M3 "+valS);

  }
//  console.log(texto);
}

function readTextFile(file)
{
  console.log("read");
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                length = allText.length;
                texto = allText;
                readline(allText);

            }
        }
    }
    rawFile.send(null);
}

function readline(text){
  var frase = ""
  var procuraS = false;
  if(endereco<text.length){
    while(text[endereco]!='\n'){
        if(text[endereco]=='S'){
        procuraS=true;
        }
        if(procuraS){
          valS+=text[endereco];
        }
        frase+=text[endereco];
        endereco++;
    }
    endereco++;
    console.log(frase);
    console.log(valS);
    console.log(endereco);
    sock.send(frase);
    procuraS=false;
  }
  else{
    console.log("Fim de texto");
  }
}
