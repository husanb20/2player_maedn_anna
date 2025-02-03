import { create } from 'zustand';
import {ISpieler} from "../interfaces/ISpieler.ts";

export interface ISpielStatus {
    spieler: ISpieler[];
    status: string;
    aktuellerSpieler: ISpieler | null;
    setSpieler: (spieler: ISpieler[]) => void;
    setAktuellerSpieler: (spieler: ISpieler) => void;
    setStatus: (status: string) => void;
}

export const useSpielStore = create<ISpielStatus>((set) => ({
    spieler: [],
    status: 'Noch 2 Spieler müssen sich anmelden!',
    aktuellerSpieler: null,
    setSpieler: (spieler) => set({ spieler }),
    setAktuellerSpieler: (spieler) => set({ aktuellerSpieler: spieler }),
    setStatus: (status) => set({ status }),
}));
