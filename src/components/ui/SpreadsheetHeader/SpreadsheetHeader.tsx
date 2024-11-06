import React, { useState } from 'react';
import { cn } from '../../../utils/cn';
import ICellOptions from '../../../interface/ICellOptions';

interface Props {
  className?: string;
  option: ICellOptions | ICellOptions[];
  value?: string;
  // onChange: (coordinate: string, newValue: string) => void
}

const SpreadsheetHeader: React.FC<Props> = (props) => {
  const {
    className,
    option,
    // onChange
  } = props;

  const isOptionArray = Array.isArray(option);

  return (
    <div 
      className={cn("flex bg-slate-500 mb-2", className)}
    >
      <span className="p-1">{isOptionArray ? 'a' : option.id }</span>
      <input 
        className="flex-1" 
        value={isOptionArray ? '' : option.value }
        // onChange={(event) => onChange?.(option, event.target.value)}
      />
    </div>
  );
}

export default SpreadsheetHeader;
