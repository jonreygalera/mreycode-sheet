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
import { SpreadsheetProvider } from '../../providers/SpreadsheetProvider';
import SpreadsheetHeader from '../ui/SpreadsheetHeader/SpreadsheetHeader';
import TCellType from '../../types/TCellType';

interface Props {
  rowSize?: number,
  columnSize?: number,
  options: ICellOptions[]
}

const DEFAULT_CELL = { 
  id: 'A1',
  coordinates: {
    columnLetter: 'A',
    rowIndex: 1,
    columnIndex: 1,
    coord: 'A1'
  },
  type: 'text' as TCellType,
  value: '',
}

const Spreadsheet: React.FC<Props> = (props) => {
  const { rowSize = 1000, columnSize = 100, options } = props;
  const [ speadsheetOptions, setSpreadsheetOptions ] = useState<ICellOptions[]>([]);
  const [ focusedCell, setFocusedCell ] = useState<ICellOptions>(DEFAULT_CELL);
  const [ selectedCells, setSelectedCells ] = useState<ICellOptions[]>([]);
  
  const memoizedOptions = useMemo(() => {
    return speadsheetOptions;
  }, [speadsheetOptions]);

  const handleOnNavigateCell = (option : ICellOptions, direction: TCellDirection) => {
    const { coordinates } = option;
    let newCoordinates = coordinates;
    switch(direction) {
      case 'up':
        newCoordinates = {...coordinates, rowIndex: coordinates.rowIndex - 1}
        break;
      case 'down':
        newCoordinates = {...coordinates, rowIndex: coordinates.rowIndex + 1}
        break;
      case 'right':
          newCoordinates = {...coordinates, columnLetter: generateColumn(coordinates.columnIndex + 1), columnIndex: coordinates.columnIndex + 1}
        break;
      case 'left':
        newCoordinates = {...coordinates, columnLetter: generateColumn(coordinates.columnIndex - 1), columnIndex: coordinates.columnIndex - 1}
        break;
      default:
        break;
    }
    setFocusedCell({...option, coordinates: newCoordinates});
  }

  // const handleOnSelectedCell = (coordinates: TCellCoordinates) => {
  //   const selectCellIndex = selectedCells.findIndex((selectedCell) => (
  //     selectedCell.columnLetter === coordinates.columnLetter &&
  //     selectedCell.rowIndex === coordinates.rowIndex
  //   ))

  //   const tempSelectedCells = [...selectedCells];
  //   if(selectCellIndex < 0) {
  //     tempSelectedCells.push(coordinates)
  //   }
    
  //   setSelectedCells(tempSelectedCells);
  // }

  useEffect(() => {
    setSpreadsheetOptions(options);
  }, [options]);

  return (
    <SpreadsheetProvider.Provider value={{ isCtrlPressed: true }}>
      <SpreadsheetHeader
        option={selectedCells.length > 1 ? selectedCells[0] : selectedCells[0] ?? focusedCell}
        // value={selectedCells.length > 0 ? selectedCells[0].coord : memoizedOptions.find(option => option.id === focusedCell.coord)?.value ?? ''}
      />
      <SheetTable className='overflow-scroll'>
        <SheetHeader>
        {
          Array.from({length: columnSize }).map((_, columnIndex) => {
            if(columnIndex == 0) return (<SheetCornerCell key={`mreycode-sheet-corner-cell${columnIndex}`}></SheetCornerCell>)
            const columnIdx = columnIndex - 1;
            const columnCoordinates = generateColumn(columnIdx);
            return (
              <SheetHead 
                key={`mreycode-sheet-column${columnIndex}`} 
                className={(
                  // selectedCells.find((selectedCell) => selectedCell.columnLetter === columnCoordinates) || 
                  columnCoordinates === focusedCell.coordinates.columnLetter
                ) ? 'bg-orange-200' : ''}
              >
                {columnCoordinates}
              </SheetHead>
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
                        className={(
                          // selectedCells.find((selectedCell) => selectedCell.rowIndex === rowIndex) ||
                          rowIndex === focusedCell.coordinates.rowIndex
                        ) ? 'bg-orange-200' : ''}
                      >
                        <span>{rowIndex}</span>
                      </SheetRowCoordinates>)
                    const cbi = columnBodyIndex - 1;
                    const columnCoordinates = generateColumn(cbi);
                    return (
                      <SheetCell
                        isFocused={`${columnCoordinates}${rowIndex}` === `${focusedCell.coordinates.columnLetter}${focusedCell.coordinates.rowIndex}`} 
                        key={`mreycode-sheet-cell${columnBodyIndex}`}
                        id={`${columnCoordinates}${rowIndex}`}
                        coordinates={{
                          columnLetter: columnCoordinates,
                          rowIndex: rowIndex,
                          columnIndex: cbi,
                          coord: `${columnCoordinates}${rowIndex}`
                        }}
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
                        onSelectedCell={(option) => setFocusedCell(option)}
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
    </SpreadsheetProvider.Provider>
  )
}

export default React.memo(Spreadsheet);
