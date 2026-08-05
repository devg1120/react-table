import { styled } from "@stitches/react";

import { IColumnType } from "./Table";

interface Props<T> {
  columns: IColumnType<T>[];
}

const TableHeaderCell = styled("th", {
  backgroundColor: "#f1f1f1",
  padding: 4,
  paddingTop: 5,
  fontWeight: 900,
  //textAlign: "left",
  textAlign: "cemter",
  fontSize: 15,
  border: "solid gray 1px",
  backgroundColor: "#e0e0e0",
  "&:first-child": {
    borderTopLeftRadius: 12,
  },
  "&:last-child": {
    borderTopRightRadius: 12,
  },
});

const TableHeaderButton = styled("th", {
  backgroundImage: 'linear-gradient(  to left top, transparent calc(50% - 0.5px), gray 50%, gray calc(50% + 0.5px), transparent calc(50% + 1px));',
  backgroundRepeat:' no-repeat;',
  backgroundColor: "#e0e0e0",

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
