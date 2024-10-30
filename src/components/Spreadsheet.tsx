import React from 'react';

interface Props {
  rowSize?: number,
  columnSize?: number,
}

const Spreadsheet: React.FC<Props> = (props) => {
  const { rowSize = 1000, columnSize = 10 } = props;
  return (
    <table>
      <thead>
      {
        Array.from({length: columnSize}).map((_, columnIndex) => {
          if(columnIndex == 0) return (<th>[X]</th>)
          return (
            <th>{`[COLUMN(${columnIndex})]`}</th>
          )
        })
      }
      </thead>
      <tbody>
      {
        Array.from({length: rowSize}).map((_, rowIndex) => {
          if(rowIndex == 0) return <></>;
          return (
            <tr>
              {
                Array.from({length: columnSize}).map((_, rowColumnIndex) => {
                  if(rowColumnIndex == 0) return (<td><span>{rowIndex}</span></td>)
                  return (
                    <td>{`[CR - ${rowColumnIndex}:${rowIndex}]`}</td>
                  )
                })
              }
            </tr>
          )
        })
      }
      </tbody>
    </table>
  )

  return (
    <div style={{ border: 'solid 1px red' }}>
      {
        Array.from({length: columnSize}).map((_, columnIndex) => {
          if(columnIndex == 0) return (<span>[X]</span>)
          return (
            <span>{`[COLUMN(${columnIndex})]`}</span>
          )
        })
      }
      <div style={{ border: '1px yellow solid'}}>
      {
        Array.from({length: rowSize}).map((_, rowIndex) => {
          if(rowIndex == 0) return <></>;
          return (
            <div>
              {
                Array.from({length: columnSize}).map((_, rowColumnIndex) => {
                  if(rowColumnIndex == 0) return (<span>{`R(${rowIndex})`}</span>)
                  return (
                    <span>{`[CR - ${rowColumnIndex}:${rowIndex}]`}</span>
                  )
                })
              }
            </div>
          )
        })
      }
      </div>
    </div>
  );
}

export default Spreadsheet;
