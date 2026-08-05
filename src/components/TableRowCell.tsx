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

export function TableRowCell<T>({ item, column }: Props<T>): JSX.Element {
  const value = get(item, column.key);
  return (
    <TableCell className="tableCell" contentEditable={true} suppressContentEditableWarning={true} >{column.render ? column.render(column, item) : value}</TableCell>
  );
}

