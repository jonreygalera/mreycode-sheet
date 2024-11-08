import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { cn } from '../../../utils/cn';
import ICellOptions from '../../../interface/ICellOptions';

interface Props {
  className?: string;
  option: ICellOptions, // | ICellOptions[];
  value?: string;
  onChange: ( newValue: string, option: ICellOptions) => void
}

const SpreadsheetHeader: React.FC<Props> = (props) => {
  const {
    className,
    option,
    onChange
  } = props;
  const [ cellValue, setCellValue ] = useState<string>(option.value);

  const memoizedOption = useMemo(() => {
    setCellValue(option.value)
    return option;
  }, [option.value]);

  useEffect(() => {
    const cellOption = {...option}
    console
    if(cellValue !== cellOption.value) {
      onChange?.(cellValue, cellOption);
    }
  }, [cellValue, memoizedOption]);

  return (
    <div 
      className={cn("flex bg-slate-500 mb-2 sticky top-0 left-0", className)}
    >
      <span className="p-1">{option.id}</span>
      <input 
        className="flex-1 ps-1 focus:outline-none"
        value={cellValue}
        onChange={(event) => setCellValue(event.target.value)}
      />
    </div>
  );
}

export default SpreadsheetHeader;
