import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import ICellOptions from '../../../interface/ICellOptions';
import TCellCoordinates from '../../../types/TCellCoordinates';
import TCellType from '../../../types/TCellType';
import TCellDirection from '../../../types/TCellDirection';

const DEFAULT_OPTION: ICellOptions = {
  id: 'A1',
  coordinates: {
    columnLetter: 'A',
    rowIndex: 1,
    columnIndex: 1,
    coord: 'A1',
  },
  type: 'text' as TCellType,
  value: '',
};

interface Props {
  className?: string;
  id: string;
  coordinates: TCellCoordinates;
  option?: ICellOptions;
  onChangeCell: (value: any, option: ICellOptions) => void;
  onNavigateCell?: (option: ICellOptions, direction: TCellDirection) => void;
  onSelectedCell?: (option: ICellOptions) => void;
  isFocused?: boolean;
}

const SheetCell: React.FC<Props> = ({
  className,
  id,
  coordinates,
  option = DEFAULT_OPTION,
  onChangeCell,
  onNavigateCell,
  onSelectedCell,
  isFocused = false,
}) => {
  const [cellValue, setCellValue] = useState(option.value);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const cellClasses = useMemo(() => {
    const formatClasses = option?.format?.className || '';
    const focusClass = isFocused ? 'border-2 border-blue-500 rounded-md' : 'border border-gray-300';
    return cn(`px-2 py-1 text-sm ${focusClass}`, formatClasses);
  }, [isFocused, option?.format]);

  const handleOnChange = useCallback(
    (value: string) => {
      setCellValue(value);
      onChangeCell(value, { ...option, id, coordinates, value });
    },
    [onChangeCell, option, id, coordinates]
  );

  const handleOnFocus = useCallback(() => {
    onSelectedCell?.({ ...option, id, coordinates });
  }, [onSelectedCell, option, id, coordinates]);

  const handleOnKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' && !isEditing) {
        setIsEditing(true);
        return;
      } else if(event.key === 'Escape' && isEditing) {
        setIsEditing(false);
        return;
      }

      const directionMap: Record<string, TCellDirection> = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        Enter: 'enter',
      };
      const direction = directionMap[event.key];

      if (direction) {
        onNavigateCell?.({ ...option, id, coordinates }, direction);
      }
    },
    [isEditing, onNavigateCell, option, id, coordinates]
  );

  useEffect(() => {
    setCellValue(option.value);
  }, [option.value]);

  useEffect(() => {
    if (isFocused && !isEditing) {
      inputRef.current?.focus();
    }
  }, [isFocused, isEditing]);

  return (
    <td
      className={cn(
        `relative mreycode-sheet-cell border-gray-200`,
        className,
        cellClasses
      )}
      onDoubleClick={() => setIsEditing(true)}
      // onKeyDown={handleTdOnKeyDown}
    >
      <input
        ref={inputRef}
        className={cn(
          'inset-0 w-full h-full ps-1 focus:outline-none',
          isEditing ? 'bg-white' : 'bg-transparent cursor-pointer'
        )}
        type="text"
        value={cellValue}
        readOnly={!isEditing}
        onChange={(e) => handleOnChange(e.target.value)}
        onBlur={() => setIsEditing(false)}
        onKeyDown={handleOnKeyDown}
        onFocus={handleOnFocus}
      />
    </td>
  );
};

export default React.memo(SheetCell);
