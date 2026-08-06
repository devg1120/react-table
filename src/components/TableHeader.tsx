import { styled } from "@stitches/react";

import { IColumnType } from "./Table";

interface Props<T> {
  columns: IColumnType<T>[];
}

const TableHeaderCell = styled("th", {
  height:"30px",
  padding: 0,

  fontSize: 14,
  fontWeight: 500,
  //fontFamily: 'sams-serif',  
  //fontFamily: 'monospace',  
  fontFamily: 'Inter',

  verticalAlign: 'middle',

  //textAlign: "left",
  textAlign: "cemter",

  border: "solid gray 1px",
  //backgroundColor: "#e0e0e0",
  backgroundColor: "#cce5ff",
  /*
  "&:first-child": {
    borderTopLeftRadius: 12,
  },
  "&:last-child": {
    borderTopRightRadius: 12,
  },
  */
});

const TableHeaderButton = styled("th", {
  backgroundImage: 'linear-gradient(  to left top, transparent calc(50% - 0.5px), gray 50%, gray calc(50% + 0.5px), transparent calc(50% + 1px));',
  backgroundRepeat:' no-repeat;',
  //backgroundColor: "#e0e0e0",
  backgroundColor: "#cce5ff",

});

export function TableHeader<T>({ columns }: Props<T>): JSX.Element {
  return (
    <tr>
      {columns.map((column, columnIndex) => (
        <TableHeaderCell
          key={`table-head-cell-${columnIndex}`}
          style={{ width: column.width }}
        >
          {column.title}
        </TableHeaderCell>
      ))}
          <TableHeaderButton>
	    
          </TableHeaderButton>
    </tr>
  );
}
