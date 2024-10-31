import React from 'react';
import './SpreadSheet.css';
import Table from '../ui/Table/Table';
import TableHeader from '../ui/Table/TableHeader';
interface Props {
  rowSize?: number,
  columnSize?: number,
}

const generateColumn = (index: number) => {
  let columnName = '';
  while (index >= 0) {
    columnName = String.fromCharCode((index % 26) + 65) + columnName;
    index = Math.floor(index / 26) - 1;
  }
  return columnName;
}

const Spreadsheet: React.FC<Props> = (props) => {
  const { rowSize = 1000, columnSize = 10 } = props;
  return (
    <Table className="mreycode-sheet-table">
      <TableHeader className="mreycode-sheet-thead mreycode-sheet-text-small">
      {
        Array.from({length: columnSize }).map((_, columnIndex) => {
          if(columnIndex == 0) return (<td key={`mreycode-sheet-column${columnIndex}`}></td>)
          return (
            <td key={`mreycode-sheet-column${columnIndex}`}  className="w-0 text-sm bg-slate-400">{generateColumn(columnIndex - 1)}</td>
          )
        })
      }
      </TableHeader>
      <tbody className="mreycode-sheet-tbody">
      {
        Array.from({length: rowSize + 1}).map((_, rowIndex) => {
          if(rowIndex == 0) return <></>;
          return (
            <tr key={`mreycode-sheet-row${rowIndex}`}>
              {
                Array.from({length: columnSize}).map((_, rowColumnIndex) => {
                  if(rowColumnIndex == 0) return (<td className="w-0 text-sm bg-slate-400" key={`mreycode-sheet-column-row${rowColumnIndex}`}><span>{rowIndex}</span></td>)
                  const columnCoordinate = generateColumn(rowColumnIndex - 1);
                  return (
                    <td key={`mreycode-sheet-cell${rowColumnIndex}`}>{`[${columnCoordinate}:${rowIndex}]`}</td>
                  )
                })
              }
            </tr>
          )
        })
      }
      </tbody>
    </Table>
  )
}

export default React.memo(Spreadsheet);
