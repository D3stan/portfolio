import { createContext, useContext } from "react";

/** Shares the light/dark mode of the signal wave page with its components */
export const SignalThemeContext = createContext({ theme: "dark", changeTheme: () => {} });

export const useSignalTheme = () => useContext(SignalThemeContext);
