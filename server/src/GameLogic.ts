import {WSHandler} from "./WSHandler";
import {ISpieler} from "./models/ISpieler";

export class GameLogic {
    private static readonly MAX_FELDER = 20;  // Maximale Felder auf dem Spielbrett
    private spielerArray: ISpieler[] = [];
    private aktuellerSpielerIndex = 0;

    private constructor(private ws_handler?:WSHandler) {
    }

    //Singelton
    private static instance: GameLogic;

    //Singelton
    public static getInstance(newWs_Handler?: WSHandler) : GameLogic {
        if (!GameLogic.instance) {
            GameLogic.instance = new GameLogic(newWs_Handler);
        }
        return GameLogic.instance;
    }

    handleWuerfeln():void {
        if (!this.ws_handler) {
            return;
        }

        const aktuellerSpieler = this.spielerArray[this.aktuellerSpielerIndex]; // Beispiel: Immer der erste Spieler würfelt
        const wurf = Math.floor(Math.random() * 6) + 1;
        aktuellerSpieler.position += wurf;

        this.ws_handler.sendToAll({ type: 'Zug', payload: this.spielerArray });

        if (aktuellerSpieler.position >= GameLogic.MAX_FELDER) {
            this.ws_handler.sendToAll({ type: 'Gewonnen', payload: aktuellerSpieler.id });
            this.resetSpiel();
            return;
        }

        const gegner = this.checkGegner(aktuellerSpieler);

        if(gegner){
            gegner.position = 0;
            this.ws_handler.sendToAll({type: "SpielerGeworfen", payload: gegner.id})
        }

        //Spielertausch
        this.aktuellerSpielerIndex = (this.aktuellerSpielerIndex + 1) % this.spielerArray.length;

        // Informiere alle über den neuen aktuellen Spieler
         this.ws_handler.sendToAll({
            type: "AktuellerSpieler",
            payload: this.aktuellerSpielerIndex
        });
    }

    checkGegner(aktuellerSpieler : ISpieler):ISpieler | null {
        return this.spielerArray.find(s => s !== aktuellerSpieler && s.position === aktuellerSpieler.position) || null;
    }

    addSpieler(newSpieler: string):void {
        console.log("SpielerString: ", newSpieler)
        this.spielerArray.push({id: newSpieler, position: 0});
        this.ws_handler?.sendToAll({ type: "Anmeldung", payload: newSpieler });
    }

    resetSpiel():void {
        this.spielerArray.forEach(s => s.position = 0)
    }

    startTimer(): void {

    }
}
