import { styled } from "@stitches/react";

import { IColumnType } from "./Table";
import { TableRowCell } from "./TableRowCell";

//https://react-icons.github.io/react-icons/icons/ai/

import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineInsertRowBelow } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

import { Tooltip } from 'react-tooltip'

import 'react-tooltip/dist/react-tooltip.css'

const tooltipStyle = { 
   //backgroundColor: "rgb(0, 247, 255)",
   //color: "#222",
   //backgroundColor: "#1E90FF",
   
   backgroundColor: "#696969",
   color: "#fff",
   //borderRadius: "8px",
   fontSize: "10px",
   zIndex: 9999,
   //padding: "0px",

   }

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
/*
const IconPlus = styled(AiOutlinePlus, {
  //backgroundColor: "red",
  padding: "2px",
  margin: "0px 5px 0px 5px",
});
*/

const icon_style = {
  //backgroundColor: "gray",
  //color: "white",
  fontSize: '10px',
  padding: "2px 4px 2px 4px",
  margin: "0px 0px 0px 3px",
  //transform: "scale(0.7, 0.7)",
  borderRight: "solid 1px gray",
  borderBottom: "solid 1px gray",
};

const IconPlus = styled(AiOutlinePlus, icon_style);
const IconUp = styled(AiOutlineArrowUp, icon_style);
const IconDown = styled(AiOutlineArrowDown, icon_style);
const IconClose = styled(AiOutlineClose, icon_style);

export function TableRow<T>({ data, columns, edit, handleAdd, handleUp, handleDown, handleDelete, handleChange, handleCheck,
                              rowStyle = {}, cellStyle ={}, checkCol = false}: Props<T>): JSX.Element {
    //console.log("TableRow", data)
  const TableRowItem = styled("tr", {  ...default_style_row, ...rowStyle})
  const TableRowCheck = styled("td", {...default_style_button, ...cellStyle})
  const TableRowButton = styled("td", {...default_style_button, ...cellStyle})

function isChecked(index) {
    if ( "_check" in data[index] ) {
          return data[index]._check;
    } 
   return false;
}
  return (
    <>
      {data.map((item, itemIndex) => (
        <TableRowItem key={`table-body-${itemIndex}`}>
	{ checkCol &&
	  <TableRowCheck>
	    <input type="checkbox" defaultChecked={isChecked(itemIndex)}  onClick={(e) => handleCheck(itemIndex, e)} />
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
	  {/*
	    <button onClick={() => handleAdd(itemIndex)} >□</button>
	    <button onClick={() => handleUp(itemIndex)} >↑</button>
	    <button onClick={() => handleDown(itemIndex)} >↓</button>
	    <button onClick={() => handleDelete(itemIndex)} >×</button>
	    */}
{/*
	    <IconPlus    onClick={() => handleAdd(itemIndex)}/>
	    <IconUp      onClick={() => handleUp(itemIndex)}/>
	    <IconDown    onClick={() => handleDown(itemIndex)}/>
	    <IconClose   onClick={() => handleDelete(itemIndex)} />
*/}
	    <IconPlus    onClick={() => handleAdd(itemIndex)}
	             data-tooltip-id="add" data-tooltip-content="insert" /> <Tooltip id="add"   style={tooltipStyle} />
	    <IconUp      onClick={() => handleUp(itemIndex)}
	             data-tooltip-id="up" data-tooltip-content="up"/> <Tooltip id="up"   style={tooltipStyle} />
	    <IconDown    onClick={() => handleDown(itemIndex)}
	             data-tooltip-id="down" data-tooltip-content="down"/> <Tooltip id="down"   style={tooltipStyle} />
	    <IconClose   onClick={() => handleDelete(itemIndex)} 
	             data-tooltip-id="delete" data-tooltip-content="delete"/> <Tooltip id="delete"   style={tooltipStyle} />


           {/*
	    <AiOutlinePlus      onClick={() => handleAdd(itemIndex)}/>
	    <AiOutlineArrowUp   onClick={() => handleUp(itemIndex)}/>
	    <AiOutlineArrowDown onClick={() => handleDown(itemIndex)}/>
	    <AiOutlineClose     onClick={() => handleDelete(itemIndex)} />
	    */}
	  </TableRowButton>
        </TableRowItem>
      ))}
    </>
  );
}
