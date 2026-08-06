import { useState, useEffect } from 'react';

import { styled } from "@stitches/react";
import get from "lodash.get";

import { IColumnType } from "./Table";

interface Props<T> {
  item: T;
  column: IColumnType<T>;
}

const TableCell = styled("td", {
  paddingTop: 8,
  paddingBottom: 5,
  paddingLeft: 5,
  fontSize: 16,
  verticalAlign: 'middle',
  //verticalAlign: 'bottom',
  //verticalAlign: 'middle', // 上下中央
  //textAlign: 'center',     // 左右中央にする場合
  textAlign: 'left',     // 左右中央にする場合
  color: "brack",
  border: "solid gray 1px"
});
/*
    <TableCell className="tableCell" contentEditable={"plaintext-only"} suppressContentEditableWarning={true} >{column.render ? column.render(column, item) : value}</TableCell>
*/
export function TableRowCell<T>({ item, column , reset, handleChange}: Props<T>): JSX.Element {
  const value = get(item, column.key);
  console.log("Cell", value);

  useEffect(() => {
	  console.log("reset Cell");
  }, [reset]);

  return (

    <TableCell className="tableCell"  contentEditable={"plaintext-only"} suppressContentEditableWarning={true} onInput={handleChange} >{column.render ? column.render(column, item) : value}</TableCell>
   
  );
}

