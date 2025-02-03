import {WsHandlerClient} from "../wsComponents/WsHandlerClient.ts";
import {useSpielStore} from "../stores/SpielStore.ts";
import {useEffect, useState} from "react";


const GameDashboard = () => {
    const [wsHandler, setWsHandler] = useState<WsHandlerClient | null>(null);
    const { status, aktuellerSpieler, spieler } = useSpielStore();

    useEffect(() => {
        const newHandler = new WsHandlerClient();
        newHandler.connect();
        setWsHandler(newHandler);

        return () => {
            newHandler.close();
        };
    }, []);


    const handleAnmeldung = (spieler: string) => {
        if(!wsHandler){
            return;
        }

        wsHandler.sendMsg({type: "Anmeldung", payload: spieler});
    }

    return (
        <div>
            <h3>Hi aus dem GameDashboard</h3>
            <p>Current Status: {status}</p>
            <p>Aktueller Spieler: {aktuellerSpieler?.id}</p>
            <button onClick={() => handleAnmeldung("Spieler1")}>Anmelden Dummy 1</button>
            <button onClick={() => handleAnmeldung("Spieler2")}>Anmelden Dummy 2</button>
            <button onClick={() => wsHandler?.sendMsg({type: "Wuerfeln"})} disabled={spieler.length < 2}>Würfeln</button>
        </div>
    );
};

export default GameDashboard;