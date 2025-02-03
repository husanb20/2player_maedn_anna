import {useWsStore} from "../stores/WsStore.ts";
import {DispatcherMsgFromClient} from "./DispatcherMsgFromServer.ts";
import {IMessage} from "../interfaces/IMessage.ts";


export class WsHandlerClient {
    private socket: WebSocket | null = null;

    constructor() {
    }

    connect() {
        this.socket = new WebSocket("ws://localhost:8765");

        this.socket.onopen = () => {
            console.log("************onopen:socket=", this.socket);
            useWsStore.getState().setIsConnection(true);
        };

        this.socket.onclose = () => {
            useWsStore.getState().setIsConnection(false);
        };

        this.socket.onmessage = (event) => {
            console.log("onmessage:socket=", this.socket);

            const msg:IMessage = JSON.parse(event.data);
            DispatcherMsgFromClient.dispatchMsgFromClient(msg);
        };
    }


    sendMsg(message: IMessage) {
        if (this.socket?.readyState === WebSocket.OPEN) {
            const msgStr = JSON.stringify(message);
            this.socket.send(msgStr);
            console.log("Message: ", msgStr)
        } else {
            console.log("Message could not be send to server!!!")
        }
    }

    close() {
        if (this.socket) {
            this.socket.close();
        }
    }
}