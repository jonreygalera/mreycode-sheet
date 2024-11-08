import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
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

const Spreadsheet: React.FC<Props> = ({ rowSize = 1000, columnSize = 100, options }) => {
  const [speadsheetOptions, setSpreadsheetOptions] = useState<ICellOptions[]>(options);
  const [focusedCell, setFocusedCell] = useState<ICellOptions>(options[0] ?? DEFAULT_CELL);
  const [selectedCells, setSelectedCells] = useState<ICellOptions[]>([]);

  const memoizedOptions = useMemo(() => speadsheetOptions, [speadsheetOptions]);

  const handleOnNavigateCell = useCallback((option: ICellOptions, direction: TCellDirection) => {
    const { coordinates } = option;
    let newCoordinates = coordinates;
    switch(direction) {
      case 'up':
        newCoordinates = {...coordinates, rowIndex: coordinates.rowIndex - 1};
        break;
      case 'enter':
      case 'down':
        newCoordinates = {...coordinates, rowIndex: coordinates.rowIndex + 1};
        break;
      case 'right':
        newCoordinates = {...coordinates, columnLetter: generateColumn(coordinates.columnIndex + 1), columnIndex: coordinates.columnIndex + 1};
        break;
      case 'left':
        newCoordinates = {...coordinates, columnLetter: generateColumn(coordinates.columnIndex - 1), columnIndex: coordinates.columnIndex - 1};
        break;
      default:
        break;
    }
    setFocusedCell({...option, coordinates: newCoordinates});
  }, []);

  const handleOnChangeCellValue = useCallback((value: string, cellOption: ICellOptions) => {
    const updatedOption = {...cellOption, value};
    setSpreadsheetOptions((prevOptions) => {
      const updatedOptions = prevOptions.map(option =>
        option.id === updatedOption.id ? updatedOption : option
      );
      if (!prevOptions.some(option => option.id === updatedOption.id)) {
        updatedOptions.push(updatedOption);
      }
      return updatedOptions;
    });
    setFocusedCell(updatedOption);
  }, []);

  useEffect(() => {
    setSpreadsheetOptions(options);
  }, [options]);

  return (
    <SpreadsheetProvider.Provider value={{ isCtrlPressed: true }}>
      <SpreadsheetHeader option={focusedCell} onChange={handleOnChangeCellValue} />
      <SheetTable className='overflow-scroll'>
        <SheetHeader>
          {Array.from({length: columnSize }).map((_, columnIndex) => {
            if (columnIndex === 0) return <SheetCornerCell key={`mreycode-sheet-corner-cell${columnIndex}`} />;
            const columnIdx = columnIndex - 1;
            const columnCoordinates = generateColumn(columnIdx);
            return (
              <SheetHead 
                key={`mreycode-sheet-column${columnIndex}`} 
                className={columnCoordinates === focusedCell.coordinates.columnLetter ? 'bg-orange-200' : ''}
              >
                {columnCoordinates}
              </SheetHead>
            );
          })}
        </SheetHeader>
        <SheetBody>
          {Array.from({length: rowSize + 1}).map((_, rowIndex) => {
            if (rowIndex === 0) return <SheetRow key={`mreycode-sheet-row${rowIndex}`} />;
            return (
              <SheetRow key={`mreycode-sheet-row${rowIndex}`}>
                {Array.from({length: columnSize}).map((_, columnBodyIndex) => {
                  if (columnBodyIndex === 0) return (
                    <SheetRowCoordinates 
                      key={`mreycode-sheet-column-row${columnBodyIndex}`} 
                      className={rowIndex === focusedCell.coordinates.rowIndex ? 'bg-orange-200' : ''}
                    >
                      <span>{rowIndex}</span>
                    </SheetRowCoordinates>
                  );
                  const cbi = columnBodyIndex - 1;
                  const columnCoordinates = generateColumn(cbi);
                  const sheetCellId = `${columnCoordinates}${rowIndex}`;
                  const foundOption = memoizedOptions.find(option => option.id === sheetCellId);
                  let sheetCellOption = foundOption ?? {
                    id: sheetCellId,
                    coordinates: {
                      columnLetter: columnCoordinates,
                      rowIndex,
                      columnIndex: cbi,
                      coord: sheetCellId
                    },
                    type: 'text' as TCellType,
                    value: '',
                  } as ICellOptions;

                  const sheetCellValue = foundOption?.id === focusedCell.id ? (isBlank(focusedCell.value) ? foundOption.value : focusedCell.value) : foundOption?.value;

                  sheetCellOption = {...sheetCellOption, value: sheetCellValue as string};

                  return (
                    <SheetCell
                      isFocused={sheetCellId === `${focusedCell.coordinates.columnLetter}${focusedCell.coordinates.rowIndex}`} 
                      key={`mreycode-sheet-cell${columnBodyIndex}`}
                      id={sheetCellId}
                      coordinates={sheetCellOption.coordinates}
                      option={sheetCellOption}
                      onChangeCell={handleOnChangeCellValue}
                      onNavigateCell={handleOnNavigateCell}
                      onSelectedCell={setFocusedCell}
                    />
                  );
                })}
              </SheetRow>
            );
          })}
        </SheetBody>
      </SheetTable>
    </SpreadsheetProvider.Provider>
  );
};

export default React.memo(Spreadsheet);
