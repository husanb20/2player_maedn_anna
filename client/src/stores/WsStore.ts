import {create} from "zustand";

export interface IWsStore {
    isConnection: boolean // zeigt den Connection Status zum Server an
    setIsConnection: (isConnection:boolean) => void
}

export const useWsStore = create<IWsStore>(
    (set) => ({
        isConnection: false,
        setIsConnection: (isConnection) => set({isConnection})
    }))