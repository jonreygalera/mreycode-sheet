import React, { useState } from 'react';
import Spreadsheet from '../SpreadSheet/Spreadsheet';
import TCellType from '../../types/TCellType';

const sheets = [
  {
    id: 'sheet1',
    name: 'Sheet 1',
    rowSize: 120,
    columnSize: 50,
    data: [
      { 
        id: 'A1',
        coordinates: {
          columnLetter: 'A',
          rowIndex: 1,
          columnIndex: 1,
          coord: 'A1'
        },
        type: 'text' as TCellType,
        value: 'Name',
        format: {
          className: "font-extrabold uppercase",
          classNameColor: "bg-slate-500 text-red-500" 
        }
      },
      { 
      id: 'B10',
      coordinates: {
        columnLetter: 'B',
        rowIndex: 10,
        columnIndex: 2,
        coord: 'B1'
      },
      type: 'text' as TCellType,
      value: 'Test',
      format: {
        className: "font-extrabold",
        classNameColor: "bg-red-500 " 
      }
    },
    { 
      id: 'C10',
      coordinates: {
        columnLetter: 'C',
        rowIndex: 10,
        columnIndex: 3,
        coord: 'C10'
      },
      type: 'text' as TCellType,
      value: 'Alryt'
    },
    { 
      id: 'A11',
      coordinates: {
        columnLetter: 'A',
        rowIndex: 11,
        columnIndex: 1,
        coord: 'A11'
      },
      type: 'text' as TCellType,
      value: 'Yeah sdadsadsdsd sdsdas'
    }]
  }
];

interface Props {
  initialSheetSize?: number;
}

const Workspace: React.FC<Props> = ({ initialSheetSize = 1 }) => {
  const [sheetSize, setSheetSize] = useState(initialSheetSize);

  const addSheet = () => {
    setSheetSize(prevSize => prevSize + 1);
  };

  return (
    <div className="flex flex-col pl-4" >
      <div className="h-[90dvh] w-full overflow-scroll bg-gray-100" >
        {sheets.map((sheet, sheetIndex) => (
         <Spreadsheet 
            key={`workspace-sheet-${sheetIndex}`}
            rowSize={sheet.rowSize}
            columnSize={sheet.columnSize}
            options={sheet.data}
          />
        ))}
      </div>
     <div className="flex items-center bg-yellow-300">
      <button 
          onClick={addSheet}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Sheet
        </button>
     </div>
    </div>
  );
};

export default Workspace;
