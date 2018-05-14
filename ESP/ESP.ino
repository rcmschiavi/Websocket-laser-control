//Programa para comunicação Websocket entre um PC e uma ESP8266 
//para enviar comandos via serial para um arduino com grbl

#include <ESP8266WebServer.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WebSocketsServer.h>
#include <Hash.h>

WebSocketsServer webSocket = WebSocketsServer(80); //Ativa a comunicação por websocket na porta 80

//Atribuições para conexão com o roteador
const char* ssid     = "SSID";
const char* password = "PASSWORD";


void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t lenght) {

  switch (type) { //verifica o tipo de mensagem recebida
    case WStype_CONNECTED: { //caso conecte
        IPAddress ip = webSocket.remoteIP(num);
        webSocket.sendTXT(num, "Conectado"); //Envia a mensagem para o cliente
      }
      break;
    case WStype_TEXT: { //Caso receba mensagem
        String text = String((char *) &payload[0]); //Converte a mensagem para string
        Serial.println(text); //Envia o comando via serial para o arduino
        break;
      }

  }
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { //Conectando a rede
    delay(100);
  }
  webSocket.begin();
  webSocket.onEvent(webSocketEvent);
}

void loop() {
  webSocket.loop();
}
