import { styled } from '@stitches/react';

import { IColumnType } from './Table';

interface Props<T> {
  columns: IColumnType<T>[];
}

const default_style = {
  height: '30px',
  padding: 0,

  fontSize: 14,
  fontWeight: 500,
  //fontFamily: 'sams-serif',
  //fontFamily: 'monospace',
  fontFamily: 'Inter',

  verticalAlign: 'middle',

  //textAlign: "left",
  textAlign: 'center',

  borderLeft: 'solid gray 1px',
  borderRight: 'solid gray 1px',
  //backgroundColor: "#e0e0e0",
  backgroundColor: '#cce5ff',
};

const default_style_button = {
  backgroundImage:
    'linear-gradient(  to left top, transparent calc(50% - 0.5px), gray 50%, gray calc(50% + 0.5px), transparent calc(50% + 1px));',
  backgroundRepeat: ' no-repeat;',
  //backgroundColor: "#e0e0e0",
  backgroundColor: '#cce5ff',
  borderRight: 'solid gray 1px',
};

export function TableHeader<T>({ columns, style = {}, checkCol = false }: Props<T>): JSX.Element {
  const TableHeaderCell = styled('th', { ...default_style, ...style });
  const TableHeaderCheck = styled('th', { ...default_style_button, ...style });
  const TableHeaderButton = styled('th', { ...default_style_button, ...style });

  return (
    <tr>
      {checkCol && <TableHeaderCheck></TableHeaderCheck>}
      {columns.map((column, columnIndex) => (
        <TableHeaderCell key={`table-head-cell-${columnIndex}`} style={{ width: column.width }}>
          {column.title}
        </TableHeaderCell>
      ))}
      <TableHeaderButton></TableHeaderButton>
    </tr>
  );
}
