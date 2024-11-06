import React from 'react';
import { cn } from '../../../utils/cn';

interface Props {
  className?: string,
  children: React.ReactNode
}

const SheetTable: React.FC<Props> = (props) => {
  const {
    className,
    children
  } = props;

  return (
    <table
      className={cn("mreycode-sheet-table bg-red-400", className)}
      onKeyDown={(event: React.KeyboardEvent) => console.log('sd')}
    >
      { children }
    </table>
  );
}

export default SheetTable;
