function readTextFile(file)
{
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
readTextFile("js/codigos/code_small.nc");
function readline(text){
  var frase="";
  for(var i=0;i<text.length;i++){
    if(text[i]!='\n'){
      frase+=text[i];
    }
    else{
      //Envia o Código(frase)
      //Trava até receber resposta
      sock.send(frase);
      frase="";
      console.log("Dormiu");
      sleep(1000);
      console.log("Acordou");
    }
  }
  alert("ok");
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
