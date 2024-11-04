import React from 'react';
import { cn } from '../../../utils/cn';
import './SheetRowCoordinates.css';

interface Props {
  className?: string,
  children?: React.ReactNode,
}

const SheetRowCoordinates: React.FC<Props> = (props) => {
  const {
    className,
    children,
  } = props;

  return (
    <td
      className={cn("mreycode-sheet-coordinates text-center bg-gray-100 font-thin border-t-2 border-r-2 border-solid border-gray-300", className)}
    >
      { children }
    </td>
  );
}

export default React.memo(SheetRowCoordinates);
