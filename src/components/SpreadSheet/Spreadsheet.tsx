import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { isBlank } from '../../utils/str';

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
  const [ focusedCell, setFocusedCell ] = useState<ICellOptions>(options[0] ?? DEFAULT_CELL);
  const [ selectedCells, setSelectedCells ] = useState<ICellOptions[]>([]);
  
  const memoizedOptions = useMemo(() => {
    return speadsheetOptions;
  }, [speadsheetOptions, focusedCell?.value]);

  const handleOnNavigateCell = (option : ICellOptions, direction: TCellDirection) => {
    const { coordinates } = option;
    let newCoordinates = coordinates;
    switch(direction) {
      case 'up':
        newCoordinates = {...coordinates, rowIndex: coordinates.rowIndex - 1}
        break;
      case 'enter':
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

  const handleOnChangeCellValue = (value: string, cellOption: ICellOptions) => {
    const sheetCellOption = {...cellOption, value: value};
    const optionIndex = memoizedOptions.findIndex(option => option.id === sheetCellOption?.id);
    const tempSpreadsheetOptions = [...speadsheetOptions];
    if(optionIndex < 0) {
      tempSpreadsheetOptions.push(sheetCellOption)
    } else {
      tempSpreadsheetOptions[optionIndex] = sheetCellOption;
    }
    setFocusedCell(sheetCellOption);
    setSpreadsheetOptions(tempSpreadsheetOptions);
  };

  useEffect(() => {
    setSpreadsheetOptions(options);
  }, [options]);

  return (
    <SpreadsheetProvider.Provider value={{ isCtrlPressed: true }}>
      <SpreadsheetHeader
        // option={selectedCells.length > 1 ? selectedCells[0] : selectedCells[0] ?? focusedCell}
        option={focusedCell}
        onChange={handleOnChangeCellValue}
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
                      const sheetCellId = `${columnCoordinates}${rowIndex}`;
                      const foundOption = memoizedOptions.find(option => option.id === sheetCellId);
                      let sheetCellOption = {
                        id: sheetCellId,
                        coordinates: {
                          columnLetter: columnCoordinates,
                          rowIndex: rowIndex,
                          columnIndex: cbi,
                          coord: sheetCellId
                        },
                        type: 'text' as TCellType,
                        value: '',
                      } as ICellOptions;

                      if(foundOption) {
                        const sheetCellValue = foundOption?.id == focusedCell.id ? (isBlank(focusedCell.value) ? foundOption.value : focusedCell.value) : foundOption.value;
                        sheetCellOption = {...foundOption, value: sheetCellValue};
                      }
                      return (
                        <SheetCell
                          isFocused={sheetCellId === `${focusedCell.coordinates.columnLetter}${focusedCell.coordinates.rowIndex}`} 
                          key={`mreycode-sheet-cell${columnBodyIndex}`}
                          id={sheetCellId}
                          coordinates={sheetCellOption.coordinates}
                          option={sheetCellOption}
                          onChangeCell={handleOnChangeCellValue}
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
