import React, { useEffect, useMemo, useState } from 'react';
import SheetTable from '../ui/SheetTable/SheetTable';
import SheetHeader from '../ui/SheetHeader/SheetHeader';
import SheetHead from '../ui/SheetHead/SheetHead';
import SheetRow from '../ui/SheetRow/SheetRow';
import SheetCell from '../ui/SheetCell/SheetCell';
import SheetRowCoordinates from '../ui/SheetRowCoordinates/SheetRowCoordinates';
import SheetCornerCell from '../ui/SheetCornerCell/SheetCornerCell';
import ICellOptions from '../../interface/ICellOptions';
import { generateColumn } from '../../utils/columnGenerator';
import SheetBody from '../ui/SheetBody/SheetBody';
import TCellDirection from '../../types/TCellDirection';
import TCellCoordinates from '../../types/TCellCoordinates';

interface Props {
  rowSize?: number,
  columnSize?: number,
  options: ICellOptions[]
}

const Spreadsheet: React.FC<Props> = (props) => {
  const { rowSize = 1000, columnSize = 100, options } = props;
  const [ speadsheetOptions, setSpreadsheetOptions ] = useState<ICellOptions[]>([]);
  const [ selectedCell, setSelectedCell ] = useState<TCellCoordinates>(["A", 1, 1]);
  const [ selectedCells, setSelectedCells ] = useState<Record<string, TCellCoordinates>>();
  
  const memoizedOptions = useMemo(() => {
    return speadsheetOptions;
  }, [speadsheetOptions]);

  const handleOnNavigateCell = (coordinates : TCellCoordinates, direction: TCellDirection) => {
    const [columnLetter, rowIndex, columnIndex] = coordinates;
    let newCoordinates = coordinates;
    switch(direction) {
      case 'up':
        newCoordinates = [ columnLetter, rowIndex - 1, columnIndex ];
        break;
      case 'down':
        newCoordinates = [ columnLetter, rowIndex + 1, columnIndex ];
        break;
        case 'right':
          newCoordinates = [ generateColumn(columnIndex + 1), rowIndex, columnIndex + 1 ];
        break;
      case 'left':
        newCoordinates = [ generateColumn(columnIndex - 1), rowIndex, columnIndex - 1 ];
        break;
      default:
        break;
    }
    handleOnSelectedCell(newCoordinates);
  }

  const handleOnSelectedCell = (coordinates: TCellCoordinates) => {
    setSelectedCell(coordinates);
    setSelectedCells(prev => ({...prev, [`${coordinates[0]}${coordinates[1]}`] : coordinates}));
  }

  useEffect(() => {
    setSpreadsheetOptions(options);
  }, [options]);

  return (
    <SheetTable className='overflow-scroll'>
      <SheetHeader>
      {
        Array.from({length: columnSize }).map((_, columnIndex) => {
          if(columnIndex == 0) return (<SheetCornerCell key={`mreycode-sheet-corner-cell${columnIndex}`}></SheetCornerCell>)
          const columnIdx = columnIndex - 1;
          const columnCoordinates = generateColumn(columnIdx);
          return (
            <SheetHead key={`mreycode-sheet-column${columnIndex}`} className={columnCoordinates === selectedCell[0] ? 'bg-orange-200' : ''}>{columnCoordinates}</SheetHead>
          )
        })
      }
      </SheetHeader>
      <SheetBody>
      {
        Array.from({length: rowSize + 1}).map((_, rowIndex) => {
          if(rowIndex == 0) return <SheetRow key={`mreycode-sheet-row${rowIndex}`}></SheetRow>;
          return (
            <SheetRow key={`mreycode-sheet-row${rowIndex}`}>
              {
                Array.from({length: columnSize}).map((_, columnBodyIndex) => {
                  if(columnBodyIndex == 0) return (
                    <SheetRowCoordinates 
                      key={`mreycode-sheet-column-row${columnBodyIndex}`} 
                      className={rowIndex === selectedCell[1] ? 'bg-orange-200' : ''}
                    >
                      <span>{rowIndex}</span>
                    </SheetRowCoordinates>)
                  const cbi = columnBodyIndex - 1;
                  const columnCoordinates = generateColumn(cbi);
                  return (
                    <SheetCell
                      isFocused={`${columnCoordinates}${rowIndex}` === `${selectedCell[0]}${selectedCell[1]}`} 
                      key={`mreycode-sheet-cell${columnBodyIndex}`}
                      id={`${columnCoordinates}${rowIndex}`}
                      coordinates={[columnCoordinates, rowIndex, cbi]}
                      option={memoizedOptions.find(option => option.id === `${columnCoordinates}${rowIndex}`)}
                      onChangeCell={(value, cellOption) => {
                        const optionIndex = memoizedOptions.findIndex(option => option.id === cellOption.id);
                        const tempSpreadsheetOptions = [...speadsheetOptions];
                        if(optionIndex < 0) {
                          tempSpreadsheetOptions.push(cellOption)
                        } else {
                          tempSpreadsheetOptions[optionIndex] = cellOption;
                        }
                        setSpreadsheetOptions(tempSpreadsheetOptions);
                      }}
                      onNavigateCell={handleOnNavigateCell}
                      onSelectedCell={handleOnSelectedCell}
                    />
                  )
                })
              }
            </SheetRow>
          )
        })
      }
      </SheetBody>
    </SheetTable>
  )
}

export default React.memo(Spreadsheet);
