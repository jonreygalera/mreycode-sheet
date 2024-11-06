import { createContext } from "react";

interface SpreadsheetProviderProps {
  isCtrlPressed: boolean;
}

export const SpreadsheetProvider = createContext<SpreadsheetProviderProps>({
  isCtrlPressed: false,
});