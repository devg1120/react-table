import { styled } from "@stitches/react";

import { IColumnType } from "./Table";
import { TableRowCell } from "./TableRowCell";

interface Props<T> {
  data: T[];
  columns: IColumnType<T>[];
}

const TableRowItem = styled("tr", {
  cursor: "auto",
  "&:nth-child(odd)": {
    backgroundColor: "#f9f9f9",
  },
  "&:last-child": {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});

const TableRowButton = styled("td", {
  border: "solid gray 1px",
  paddingTop: "6px",
  cursor: "auto",
  "&:nth-child(odd)": {
    backgroundColor: "#f9f9f9",
  },
  "&:last-child": {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
/*
  const handleAdd = (index) => {
    alert("Add: " + index);
  };
  const handleUp = (index) => {
    alert("Up: " + index);
  };
  const handleDown = (index) => {
    alert("Down: " + index);
  };
  const handleDelete = (index) => {
    alert("Delete: " + index);
  };
*/

export function TableRow<T>({ data, columns, reset, handleAdd, handleUp, handleDown, handleDelete, handleChange }: Props<T>): JSX.Element {
    console.log("TableRow", data)
  return (
    <>
      {data.map((item, itemIndex) => (
        <TableRowItem key={`table-body-${itemIndex}`}>
          {columns.map((column, columnIndex) => (
            <TableRowCell
              key={`table-row-cell-${columnIndex}`}
              item={item}
              column={column}
	      reset={reset}
	      handleChange={handleChange}
            />
          ))}
	  <TableRowButton>
	    <button onClick={() => handleAdd(itemIndex)} >□</button>
	    <button onClick={() => handleUp(itemIndex)} >↑</button>
	    <button onClick={() => handleDown(itemIndex)} >↓</button>
	    <button onClick={() => handleDelete(itemIndex)} >×</button>
	  </TableRowButton>
        </TableRowItem>
      ))}
    </>
  );
}
