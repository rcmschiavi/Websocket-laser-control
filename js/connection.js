//código javascript para comunicação
var sock = new WebSocket("ws://localhost:5001");

sock.onopen = function(event) {
  alert('socket Connected successfully');
  readTextFile("js/codigos/code_small.nc");
};
sock.onerror = function(event) {
  //alert('socket is not Connected');
};
sock.onmessage = function(event){
  console.log(event.data);
}

document.querySelector('button.Message').onclick = function(){
  sock.send(document.querySelector('input[name="Message"]').value);
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
                readline(allText);

            }
        }
    }
    rawFile.send(null);
}

function readline(text){
  var frase="";
  for(var i=0;i<text.length;i++){
      if(text[i]!='\n'){
      frase+=text[i];
    }
    else{
      //Envia o Código(frase)
      //Trava até receber resposta
      sock.send(frase); //Procurar por buffer no WS
      frase="";
    }

  }
}
