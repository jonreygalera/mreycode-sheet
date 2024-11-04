import React, { useMemo } from 'react';
import { cn } from '../../../utils/cn';
import ICellOptions from '../../../interface/ICellOptions';

interface Props {
  className?: string,
  children?: any,
  id: string,
  option?: ICellOptions
}

const SheetCell: React.FC<Props> = (props) => {
  const {
    className,
    id,
    option
  } = props;

  const memoizedClassName = useMemo(() => {
    const className = option?.format?.className;
    if(className) {
      if(typeof className === 'string') {
        return className;
      }
      return className.join(" ");
    }
    return className ?? '';
  }, [option]);

  const handleOnTextChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    console.log(event, id)
  }

  return (
    <td
      className={cn("mreycode-sheet-cell border-opacity-50 border-r-2 border-t-2 border-solid border-gray-300", className)}
    >
      <input
        className={cn("w-full h-full ps-1", memoizedClassName )}
        type={"text"}
        onChange={handleOnTextChange}
        value={option?.value ?? ''}
      />
    </td>
  );
}

export default SheetCell;
