import { useState, useEffect } from 'react';

import { styled } from "@stitches/react";
import get from "lodash.get";

import { IColumnType } from "./Table";

interface Props<T> {
  item: T;
  column: IColumnType<T>;
}
/*
const TableCell = styled("td", {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 5,
  paddingRight: 5,

  //fontFamily: 'sams-serif',  
  //fontFamily: 'monospace',  
  fontFamily: 'Inter',  

  fontWeight: '400',     
  fontSize: 15,

  verticalAlign: 'middle',
  //verticalAlign: 'bottom',
  //verticalAlign: 'top', 
  
  //textAlign: 'center',     
  textAlign: 'left',     
  //textAlign: 'right',     

  color: "black",
  border: "solid gray 1px"
});
*/

const default_style = {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 5,
  paddingRight: 5,

  //fontFamily: 'sams-serif',  
  //fontFamily: 'monospace',  
  fontFamily: 'Inter',  

  fontWeight: '400',     
  fontSize: 15,

  verticalAlign: 'middle',
  //verticalAlign: 'bottom',
  //verticalAlign: 'top', 
  
  //textAlign: 'center',     
  textAlign: 'left',     
  //textAlign: 'right',     

  color: "black",
  border: "solid gray 1px"
};

//const TableCell = styled("td", default_style);


/*
    <TableCell className="tableCell" contentEditable={"plaintext-only"} suppressContentEditableWarning={true} >{column.render ? column.render(column, item) : value}</TableCell>
*/
export function TableRowCell<T>({ item, column , edit, handleChange}: Props<T>): JSX.Element {
  const [contentEditable, setrCcontentEditable] = useState(edit);
  const value = get(item, column.key);
  //const [value, setValue] = useState(get(item, column.key));
  //console.log("Cell", value);
  
  const _style = { backgroundColor : "red" }
  const TableCell = styled("td", {...default_style, ..._style});

  /*
  useEffect(() => {
	  console.log("cell value:", value);
  }, [value]);
*/
  return (

    <TableCell className="tableCell"  contentEditable={contentEditable} suppressContentEditableWarning={true} onInput={handleChange} >{column.render ? column.render(column, item) : value}</TableCell>
   
  );
}

