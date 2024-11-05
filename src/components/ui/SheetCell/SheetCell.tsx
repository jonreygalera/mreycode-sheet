import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import ICellOptions from '../../../interface/ICellOptions';
import TCellCoordinates from '../../../types/TCellCoordinates';
import TCellType from '../../../types/TCellType';
import TCellDirection from '../../../types/TCellDirection';

const DEFAULT_OPTION : ICellOptions = {
  id: 'A1',
  coordinates: ['A', 1, 1],
  type: 'text' as TCellType,
  value: '',
}

interface Props {
  className?: string,
  children?: any,
  id: string,
  coordinates: TCellCoordinates,
  option?: ICellOptions,
  onChangeCell: (value: any, option: ICellOptions) => void,
  onNavigateCell?: (coordinates: TCellCoordinates, direction: TCellDirection) => void,
  onSelectedCell?: (coordinates: TCellCoordinates) => void
  isFocused?: boolean
}

const SheetCell: React.FC<Props> = (props) => {
  const {
    className,
    id,
    coordinates,
    option,
    onChangeCell,
    onNavigateCell, 
    onSelectedCell,
    isFocused = false
  } = props;

  const [ cellValue, setCellValue ] = useState<string>(option?.value ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  const memoizedClassName = useMemo(() => {
    const formatClassName = option?.format?.className;
    setCellValue(option?.value ?? '');
    if (formatClassName) {
      return typeof formatClassName === 'string' ? formatClassName : formatClassName.join(' ');
    }
    return '';
  }, [option]);

  const handleOnChangeCellValue = useCallback((value: any, type: TCellType) => {
    setCellValue(value);
  }, []);

  const handleOnBlur = useCallback((value: any) => {
    const cellOption = option ? {...option, value: value} : {...DEFAULT_OPTION, id: id, coordinates: coordinates, value: value};
    if(cellValue !== cellOption.value) {
      onChangeCell(value, cellOption);
    }
  }, [cellValue, onChangeCell, option]);

  const handleOnKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        onNavigateCell?.(coordinates, 'up' as TCellDirection);
        break;
      case 'ArrowDown':
        event.preventDefault();
        onNavigateCell?.(coordinates, 'down' as TCellDirection);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        onNavigateCell?.(coordinates, 'left' as TCellDirection);
        break;
      case 'Tab':
      case 'ArrowRight':
        event.preventDefault();
        onNavigateCell?.(coordinates, 'right' as TCellDirection);
        break;
      default:
        break;
    }
  }, [onNavigateCell, coordinates]);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <td
      className={cn("mreycode-sheet-cell border-opacity-50 border-r-2 border-t-2 border-solid border-gray-300", className)}
    >
      <input
        ref={inputRef}
        className={cn("w-full h-full ps-1", memoizedClassName )}
        type={"text"}
        onChange={(event) => {
          handleOnChangeCellValue(event.target.value, 'text')
        }}
        value={cellValue}
        onBlur={(event) => handleOnBlur(event.target.value)}
        onKeyDown={handleOnKeyDown}
        onFocus={() => onSelectedCell?.(coordinates)}
      />
    </td>
  );
}

export default React.memo(SheetCell);
