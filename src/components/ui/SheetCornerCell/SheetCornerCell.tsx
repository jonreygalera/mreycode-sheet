import React from 'react';
import { cn } from '../../../utils/cn';
import './SheetCornerCell.css';

interface Props {
  className?: string,
  children?: React.ReactNode,
}

const SheetCornerCell: React.FC<Props> = (props) => {
  const {
    className,
    children,
  } = props;

  return (
    <th
      className={cn("mreycode-sheet-corner-cell bg-gray-100 font-thin border-r-2 border-b-2 border-solid border-gray-300", className)}
    >
      { children }
    </th>
  );
}

export default SheetCornerCell;
