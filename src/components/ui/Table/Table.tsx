import React from 'react';
import { cn } from '../../../utils/cn';

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="overflow-auto flex-grow">
    <table
      className={
        cn("w-screen", className)
      }
      ref={ref}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

export default Table;
