import React, { useMemo } from 'react';
import SheetTable from '../ui/SheetTable/SheetTable';
import SheetHeader from '../ui/SheetHeader/SheetHeader';
import SheetHead from '../ui/SheetHead/SheetHead';
import SheetRow from '../ui/SheetTable/SheetRow';
import SheetCell from '../ui/SheetTable/SheetCell';
import SheetRowCoordinates from '../ui/SheetRowCoordinates/SheetRowCoordinates';
import SheetCornerCell from '../ui/SheetCornerCell/SheetCornerCell';
import ICellOptions from '../../interface/ICellOptions';

interface Props {
  rowSize?: number,
  columnSize?: number,
  options: ICellOptions[]
}

const generateColumn = (index: number) => {
  let columnName = '';
  while (index >= 0) {
    columnName = String.fromCharCode((index % 26) + 65) + columnName;
    index = Math.floor(index / 26) - 1;
  }
  return columnName;
}

const Spreadsheet: React.FC<Props> = (props) => {
  const { rowSize = 1000, columnSize = 100, options } = props;

  const memoizedOptions = useMemo(() => {
    return options;
  }, [options]);

  return (
    <SheetTable className='overflow-scroll'>
      <SheetHeader>
      {
        Array.from({length: columnSize }).map((_, columnIndex) => {
          if(columnIndex == 0) return (<SheetCornerCell key={`mreycode-sheet-corner-cell${columnIndex}`}></SheetCornerCell>)
          return (
            <SheetHead key={`mreycode-sheet-column${columnIndex}`}>{generateColumn(columnIndex - 1)}</SheetHead>
          )
        })
      }
      </SheetHeader>
      <tbody className="mreycode-sheet-div bg-slate-50">
      {
        Array.from({length: rowSize + 1}).map((_, rowIndex) => {
          if(rowIndex == 0) return <SheetRow key={`mreycode-sheet-row${rowIndex}`}></SheetRow>;
          return (
            <SheetRow key={`mreycode-sheet-row${rowIndex}`}>
              {
                Array.from({length: columnSize}).map((_, rowColumnIndex) => {
                  if(rowColumnIndex == 0) return (<SheetRowCoordinates key={`mreycode-sheet-column-row${rowColumnIndex}`} className=""><span>{rowIndex}</span></SheetRowCoordinates>)
                  const columnCoordinate = generateColumn(rowColumnIndex - 1);
                  return (
                    <SheetCell 
                      key={`mreycode-sheet-cell${rowColumnIndex}`}
                      id={`${columnCoordinate}${rowIndex}`}
                      option={memoizedOptions.find(option => option.id === `${columnCoordinate}${rowIndex}`)}
                    />
                  )
                })
              }
            </SheetRow>
          )
        })
      }
      </tbody>
    </SheetTable>
  )
}

export default React.memo(Spreadsheet);
