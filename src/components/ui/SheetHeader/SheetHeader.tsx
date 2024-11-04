import React from 'react';
import { cn } from '../../../utils/cn';
import './SpreadHeader.css';

interface Props {
  className?: string,
  children: React.ReactNode
}

const SheetHeader: React.FC<Props> = (props) => {
  const {
    className,
    children
  } = props;

  return (
    <thead
      className={cn("mreycode-sheet-header", className)}
    >
      { children }
    </thead>
  );
}

export default React.memo(SheetHeader);
