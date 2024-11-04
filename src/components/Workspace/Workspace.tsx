import React, { useState } from 'react';
import Spreadsheet from '../SpreadSheet/Spreadsheet';

const sheets = [
  {
    id: 'sheet1',
    name: 'Sheet 1',
    rowSize: 500,
    columnSize: 50,
    data: [
      { 
        id: 'A1',
        coordinates: ['A', 1],
        type: 'text',
        value: 'hello',
        format: {
          className: "bg-slate-500 font-extrabold uppercase text-slate-50"
        }
      },
      { 
      id: 'B10',
      coordinates: ['B', 10],
      type: 'text',
      value: 'hello',
      format: {
        className: "bg-red-500 font-extrabold"
      }
    },
    { 
      id: 'C10',
      coordinates: ['C', 10],
      type: 'text',
      value: 'hello'
    },
    { 
      id: 'A11',
      coordinates: ['A', 11],
      type: 'text',
      value: 'hello'
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
