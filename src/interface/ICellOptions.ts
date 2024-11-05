import TCellCoordinates from "../types/TCellCoordinates";
import TCellType from "../types/TCellType";

interface ICellOptions {
  id: string;
  coordinates: TCellCoordinates;
  type: TCellType;
  value: string;
  format?: {
    className?: string|string[]
  }
}

export default ICellOptions;