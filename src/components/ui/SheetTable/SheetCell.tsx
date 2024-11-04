import React from 'react';
import { cn } from '../../../utils/cn';

interface Props {
  className?: string,
  children?: any
}

const SheetCell: React.FC<Props> = (props) => {
  const {
    className,
    children
  } = props;

  return (
    <div
      className={cn("mreycode-sheet-cell flex flex-grow min-w-[100px] border-opacity-50 border-r-2 border-t-2 border-solid border-gray-300", className)}
    >
      <input
        className="w-full h-full ps-1"
        type="text"
      />
    </div>
  );
}

export default SheetCell;
