import { styled } from "@stitches/react";

import { IColumnType } from "./Table";
import { TableRowCell } from "./TableRowCell";

//https://react-icons.github.io/react-icons/icons/ai/

import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineInsertRowBelow } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

import { Tooltip } from "react-tooltip";

import "react-tooltip/dist/react-tooltip.css";

const tooltipStyle = {
  //backgroundColor: "#696969",
  backgroundColor: "#003366",
  color: "#fff",
  borderRadius: "0px",
  fontSize: "10px",
  zIndex: 9999,
  padding: "0px",
};

interface Props<T> {
  data: T[];
  columns: IColumnType<T>[];
}

const default_style_row = {
  cursor: "auto",
  /*
  "&:nth-child(odd)": {
    //backgroundColor: "#f9f9f9",
    backgroundColor: "#e0e0e0",
  },
  */
};


const default_style_button = {
  border: "solid gray 1px",
  //paddingTop: "6px",
  cursor: "auto",
};


const icon_style = {
  fontSize: "10px",
  padding: "2px 6px 2px 3px",
  margin: "0px 0px 0px 0px",
  //transform: "scale(0.7, 0.7)",
  borderRight: "solid 1px gray",
  borderBottom: "solid 1px gray",
};

const IconPlus = styled(AiOutlinePlus, icon_style);
const IconUp = styled(AiOutlineArrowUp, icon_style);
const IconDown = styled(AiOutlineArrowDown, icon_style);
const IconClose = styled(AiOutlineClose, icon_style);

export function TableRow<T>({
  data,
  columns,
  edit,
  handleAdd,
  handleUp,
  handleDown,
  handleDelete,
  handleChange,
  handleCheck,
  rowStyle = {},
  cellStyle = {},
  checkCol = false,
}: Props<T>): JSX.Element {
  const TableRowItem = styled("tr", { ...default_style_row, ...rowStyle });
  const TableRowCheck = styled("td", { ...default_style_button, ...cellStyle });
  const TableRowButton = styled("td", {
    ...default_style_button,
    //...cellStyle,
  });

  function isChecked(index) {
    if ("_check" in data[index]) {
      return data[index]._check;
    }
    return false;
  }
  return (
    <>
      {data.map((item, itemIndex) => (
        <TableRowItem key={`table-body-${itemIndex}`}>
          {checkCol && (
            <TableRowCheck>
              <input
                type="checkbox"
                defaultChecked={isChecked(itemIndex)}
                onClick={(e) => handleCheck(itemIndex, e)}
              />
            </TableRowCheck>
          )}
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
            {/*
	    <button onClick={() => handleAdd(itemIndex)} >□</button>
	    <button onClick={() => handleUp(itemIndex)} >↑</button>
	    <button onClick={() => handleDown(itemIndex)} >↓</button>
	    <button onClick={() => handleDelete(itemIndex)} >×</button>
	    */}
            <IconPlus
              onClick={() => handleAdd(itemIndex)}
              data-tooltip-id={"add"}
              data-tooltip-content="Insert"
            />{" "}
            <Tooltip id={"add"} style={tooltipStyle} />
            <IconUp
              onClick={() => handleUp(itemIndex)}
              data-tooltip-id="up"
              data-tooltip-content="Up"
            />{" "}
            <Tooltip id="up" style={tooltipStyle} />
            <IconDown
              onClick={() => handleDown(itemIndex)}
              data-tooltip-id="down"
              data-tooltip-content="Down"
            />{" "}
            <Tooltip id="down" style={tooltipStyle} />
            <IconClose
              onClick={() => handleDelete(itemIndex)}
              data-tooltip-id="delete"
              data-tooltip-content="Delete"
            />{" "}
            <Tooltip id="delete" style={tooltipStyle} />
          </TableRowButton>
        </TableRowItem>
      ))}
    </>
  );
}
