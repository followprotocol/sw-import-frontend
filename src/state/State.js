import { create } from "zustand";

const useBearStore = create((set) => ({
  currentPage: "Login",
  setcurrentPage: (arg) => set({ currentPage: arg }),

  authToken: "",
  setauthToken: (arg) => set({ authToken: arg }),

  sessionId: "",
  setsessionID: (arg) => set({ sessionId: arg }),
}));

export default useBearStore;
