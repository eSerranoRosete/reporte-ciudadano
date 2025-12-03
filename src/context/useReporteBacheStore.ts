import { create } from "zustand";

interface IFState {
	location: { lat: number; lng: number } | null;
}

interface IFActions {
	setLocation: (location: IFState["location"]) => void;
}

export const useReporteBacheStore = create<IFState & IFActions>((set) => ({
	//STATE
	location: null,

	//ACTIONS
	setLocation: (location) => set({ location }),
}));
