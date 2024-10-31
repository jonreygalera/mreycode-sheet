import React from 'react';
import { cn } from '../../../utils/cn';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_td]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

export default TableHeader;
