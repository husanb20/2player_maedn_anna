import {IMessage} from "../interfaces/IMessage.ts";
import {useSpielStore} from "../stores/SpielStore.ts";
import {ISpieler} from "../interfaces/ISpieler.ts";


export class DispatcherMsgFromClient {
    static dispatchMsgFromClient(msg: IMessage) {
        const {setSpieler, setStatus, status, spieler, setAktuellerSpieler} = useSpielStore.getState();

        console.log("Type: ", msg.type)
        console.log("payload: ", msg.payload)

        switch (msg.type) {
            case "Anmeldung": //payload = spielerArray
                if(msg.payload === "Spieler1"){
                    setStatus("Noch 1 Spieler muss sich anmelden!");
                } else if (msg.payload === "Spieler2") {
                    setStatus("Spiel kann mit dem Button 'Würfeln' gestartet werden!")
                }
                console.log("Status: ", status)
                setSpieler(msg.payload);
                break;
            case "Zug": //payload = spielerArray
                setStatus(`Die beiden Spieler spielen.`)
                setSpieler(msg.payload);
                break;
            case "AktuellerSpieler": {
                const aktuellerSpielerIndex: number = msg.payload;
                const neuerAktuellerSpieler: ISpieler =
                    spieler[aktuellerSpielerIndex];
                setAktuellerSpieler(neuerAktuellerSpieler);
                break;
            }
            case "SpielerGeworfen": //payload = spieler der zurückgesetzt werden muss
                setStatus(`${msg.payload} wurde zurückgesetzt! (geworfen)`)
                break;
            case "Gewonnen": //payload = ID des Gewinners
                setStatus(`${msg.payload} hat gewonnen!`)
                break;
            //TODO Timer Alarm Case
            default:
                console.log("Default case im Dispatcher ausgelöst frontend.")
        }
    }
}