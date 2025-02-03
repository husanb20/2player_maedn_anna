import {WebSocketServer, WebSocket} from "ws";
import {WSHandler} from "./WSHandler";
import {GameLogic} from "./GameLogic";

export class GameServer {
    private readonly clients: Set<WebSocket> = new Set();
    private readonly ws_server : WebSocketServer;
    private readonly ws_handler : WSHandler;
    private readonly MAX_PLAYERS = 2

    private gameLogic?: GameLogic;

    constructor(port:number) {
        this.ws_server = new WebSocketServer({port: port});
        console.log("Server running on port: ", port);

        this.ws_handler = new WSHandler(this.clients);
        this.gameLogic = GameLogic.getInstance(this.ws_handler)

        this.connection();
    }

    private connection():void {
        this.ws_server.on("connection", (webSocket:WebSocket)=> {
            console.log("Neue connection");

            this.clients.add(webSocket);
            this.ws_handler.setUpHandler(webSocket);
        });
    }
}