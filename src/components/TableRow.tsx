import { styled } from "@stitches/react";

import { IColumnType } from "./Table";
import { TableRowCell } from "./TableRowCell";

interface Props<T> {
  data: T[];
  columns: IColumnType<T>[];
}
/*
const TableRowItem = styled("tr", {
  cursor: "auto",
  //backgroundColor: "red",
  
  "&:nth-child(odd)": {
    //backgroundColor: "#f9f9f9",
    backgroundColor: "#e0e0e0",
  },
  
});
*/
const default_style_row = {
  cursor: "auto",
  //backgroundColor: "red",
  /*
  "&:nth-child(odd)": {
    //backgroundColor: "#f9f9f9",
    backgroundColor: "#e0e0e0",
  },
  */
};
/*
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
*/

const default_style_button = {
  border: "solid gray 1px",
  paddingTop: "6px",
  cursor: "auto",
  /*
  "&:nth-child(odd)": {
    backgroundColor: "#f9f9f9",
  },
  */
 /* 
  "&:last-child": {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  */
};

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

export function TableRow<T>({ data, columns, edit, handleAdd, handleUp, handleDown, handleDelete, handleChange, handleCheck,
                              rowStyle = {}, cellStyle ={}, checkCol = false}: Props<T>): JSX.Element {
    //console.log("TableRow", data)
  const TableRowItem = styled("tr", {  ...default_style_row, ...rowStyle})
  const TableRowCheck = styled("td", {...default_style_button, ...cellStyle})
  const TableRowButton = styled("td", {...default_style_button, ...cellStyle})

  return (
    <>
      {data.map((item, itemIndex) => (
        <TableRowItem key={`table-body-${itemIndex}`}>
	{ checkCol &&
	  <TableRowCheck>
	    <input type="checkbox" onClick={(e) => handleCheck(itemIndex, e)} />
	  </TableRowCheck>
	}
          {columns.map((column, columnIndex) => (
            <TableRowCell
              key={`table-row-cell-${columnIndex}`}
              item={item}
              column={column}
	      edit={edit}
	      handleChange={handleChange}
	      style={cellStyle}
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
