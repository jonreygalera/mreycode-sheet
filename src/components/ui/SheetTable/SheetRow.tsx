import React from 'react';
import { cn } from '../../../utils/cn';

interface Props {
  className?: string,
  children?: React.ReactNode
}

const SheetRow: React.FC<Props> = (props) => {
  const {
    className,
    children
  } = props;

  return (
    <tr
      className={cn("mreycode-sheet-cell", className)}
    >
      { children }
    </tr>
  );
}

export default SheetRow;
