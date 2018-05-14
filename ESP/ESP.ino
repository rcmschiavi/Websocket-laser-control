#include <ESP8266WebServer.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WebSocketsServer.h>
#include <Hash.h>

WebSocketsServer webSocket = WebSocketsServer(80); //Ativa a comunicação por websocket na porta 80

const char* ssid     = "SSID";
const char* password = "PASSWORD";
uint8_t endereco=0;


void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t lenght) {

  switch (type) { //verifica o tipo de mensagem recebida
    case WStype_CONNECTED: { //caso conecte
        IPAddress ip = webSocket.remoteIP(num);
        endereco=num;
        webSocket.sendTXT(num, "Conectado");
      }
      break;
    case WStype_TEXT: {
        String text = String((char *) &payload[0]);
        Serial.println(text);
        break;
      }

  }
}

void setup() {
  Serial.begin(115200);
  MeuServo.attach(0); //Declarando Servo
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { //Conectando a rede
    Serial.println(".");
    delay(100);
  }
  Serial.println(WiFi.localIP()); //Mostra o IP na rede
  webSocket.begin();
  webSocket.onEvent(webSocketEvent);
}

void loop() {
  webSocket.loop();
}
