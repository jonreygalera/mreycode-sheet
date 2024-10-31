import React, { useState } from 'react';
import Spreadsheet from '../SpreadSheet/Spreadsheet';

interface Props {
  initialSheetSize?: number;
}

const Workspace: React.FC<Props> = ({ initialSheetSize = 1 }) => {
  const [sheetSize, setSheetSize] = useState(initialSheetSize);

  const addSheet = () => {
    setSheetSize(prevSize => prevSize + 1);
  };

  return (
    <div className="h-fit w-fit flex flex-col bg-gray-500" >
      <div className="h-[90dvh] overflow-auto w-screen bg-gray-100" >
        {Array.from({ length: sheetSize }).map((_, sheetIndex) => (
          <div key={`workspace-sheet-${sheetIndex}`}>
            <Spreadsheet  />
          </div>
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
