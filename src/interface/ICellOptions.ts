import TCellCoordinates from "../types/TCellCoordinates";
import TCellType from "../types/TCellType";
import ICellFormat from "./ICellFormat";

interface ICellOptions {
  id: string;
  coordinates: TCellCoordinates;
  type: TCellType;
  value: string;
  format?: ICellFormat
}

export default ICellOptions;