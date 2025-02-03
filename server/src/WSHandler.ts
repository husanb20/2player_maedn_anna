import { WebSocket } from "ws"
import {IMessage} from "./models/IMessage";
import {DispatcherMsgFromClient} from "./DispatcherMsgFromClient";

export class WSHandler {
    constructor(private clients:Set<WebSocket>) {
    }

    setUpHandler(webSocket:WebSocket) {
        webSocket.on("message", (msg) => {
            DispatcherMsgFromClient.dispatchMsgFromClient(JSON.parse(msg.toString()));
        })

        webSocket.on("close", () => {
            console.log("Verbindung geschlossen");
            this.clients.delete(webSocket);
        });
    }

    sendToAll(msg: IMessage):void {
        const messageString = JSON.stringify(msg);
        this.clients.forEach(client => this.sendMessage(client, messageString));
    }

    sendMessage(client:WebSocket, message:String) {
        if(client.readyState === WebSocket.OPEN){
            client.send(message);
        } else {
            console.log("No messages sent to client(s)!")
        }
    }
}