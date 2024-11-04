import TCellCoordinates from "../types/TCellCoordinates";

interface ICellOptions {
  id: string;
  coordinates: TCellCoordinates;
  type: string;
  value: string;
  format?: {
    className?: string|string[]
  }
}

export default ICellOptions;