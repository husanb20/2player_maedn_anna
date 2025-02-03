import {ISpieler} from "./ISpieler";

export interface ISpielStatus {
    spieler: ISpieler[];
    status: string;
    setSpieler: (spieler: ISpieler[]) => void;
    setStatus: (status: string) => void;
    aktuellerSpieler:ISpieler,
    setAktuellerSpieler: (aktuellerSpieler: ISpieler) => void
}