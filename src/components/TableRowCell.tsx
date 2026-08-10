import { useState, useEffect } from "react";

import { styled } from "@stitches/react";
import get from "lodash.get";

import { IColumnType } from "./Table";

interface Props<T> {
  item: T;
  column: IColumnType<T>;
}

const default_style = {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 5,
  paddingRight: 5,

  //fontFamily: 'sams-serif',
  //fontFamily: 'monospace',
  fontFamily: "Inter",

  fontWeight: "400",
  fontSize: 15,

  verticalAlign: "middle",
  //verticalAlign: 'bottom',
  //verticalAlign: 'top',

  //textAlign: 'center',
  textAlign: "left",
  //textAlign: 'right',

  color: "black",
  border: "solid gray 1px",
  // Focus styles
  "&:focus": {
    outline: "solid 3px #0080ff",
    outlineOffset: "-1px",
    borderBottomRightRadius: "-6px",
  },
};


export function TableRowCell<T>({
  rown,
  coln,
  item,
  column,
  edit,
  handleChange,
  handleFocus,
  style = {},
}: Props<T>): JSX.Element {
  const [contentEditable, setrCcontentEditable] = useState(edit);
  const value = get(item, column.key);

  const TableCell = styled("td", { ...default_style, ...style });

  const id=`Cell_${rown}_${coln}`
  /*
  useEffect(() => {
	  console.log("cell value:", value);
  }, [value]);
*/

  function onFocus() {
   //console.log("focus:", id)
   handleFocus(id)
  }

  return (
    <TableCell
      id={id}
      className="tableCell"
      contentEditable={contentEditable}
      suppressContentEditableWarning={true}
      onInput={handleChange}
      onFocus={onFocus}
    >
      {column.render ? column.render(column, item) : value}
    </TableCell>
  );
}
