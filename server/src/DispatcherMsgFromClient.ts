import {IMessage} from "./models/IMessage";
import {GameLogic} from "./GameLogic";

export class DispatcherMsgFromClient {
    static dispatchMsgFromClient(msg: IMessage) {
        console.log("AN: ", msg.type)
        switch (msg.type) {
            case "Anmeldung":
                if (typeof msg.payload !== "string") {
                    console.error("Fehler: Anmeldung erwartet einen String als Spieler-ID, aber erhalten:", msg.payload);
                    return;
                }
                GameLogic.getInstance().addSpieler(msg.payload);
                break;
            case "Wuerfeln":
                GameLogic.getInstance().handleWuerfeln();
                break;
            default:
                console.log("Default case im Dispatcher ausgelöst.")
        }
    }
}