import { create } from "zustand";

interface IFState {
	location: { lat: number; lng: number } | null;
	images: string[]; // Base64 encoded
	comments: string | null;
}

interface IFActions {
	setLocation: (location: IFState["location"]) => void;
	setImages: (images: IFState["images"]) => void;
	setComments: (comments: IFState["comments"]) => void;
}

export const useReporteBacheStore = create<IFState & IFActions>((set) => ({
	//STATE
	location: null,
	images: [],
	comments: null,

	//ACTIONS
	setLocation: (location) => set({ location }),
	setImages: (images) => set({ images }),
	setComments: (comments) => set({ comments }),
}));
