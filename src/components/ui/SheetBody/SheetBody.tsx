import React from 'react';
import { cn } from '../../../utils/cn';

interface Props {
  className?: string,
  children?: React.ReactNode
}

const SheetBody: React.FC<Props> = (props) => {
  const {
    className,
    children
  } = props;

  return (
    <tbody
      className={cn("mreycode-sheet-div bg-slate-50", className)}
    >
      { children }
    </tbody>
  );
}

export default SheetBody;
