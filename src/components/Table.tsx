import { styled } from "@stitches/react";
import { useState, useEffect, useRef, useMemo } from 'react';
//import { useReducer } from 'react'

import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

import { AiOutlineRedo } from "react-icons/ai";
import { AiOutlineDownload } from "react-icons/ai";
import { AiOutlineUpload } from "react-icons/ai";

import { AiOutlineToTop } from "react-icons/ai";
import { AiOutlineVerticalAlignBottom } from "react-icons/ai";
import { AiOutlineVerticalAlignTop } from "react-icons/ai";

import { AiOutlineTable } from "react-icons/ai";
import { AiOutlineFile } from "react-icons/ai";

import { AiOutlineDelete } from "react-icons/ai";

import { AiOutlineClose } from "react-icons/ai";

import { Tooltip } from 'react-tooltip'

import 'react-tooltip/dist/react-tooltip.css'




const icon_style = {
  //backgroundColor: "gray",
  //color: "white",
  fontSize: '11px',
  padding: "2px 4px 2px 4px",
  margin: "0px 0px 3px 2px",
  //transform: "scale(0.7, 0.7)",
  borderRight: "solid 1px gray",
  borderBottom: "solid 1px gray",
  verticalAlign: "bottom",
};

const IconDump  = styled(AiOutlineFile, icon_style);
const IconUpdate  = styled(AiOutlineTable, icon_style);
const IconReset  = styled(AiOutlineRedo, icon_style);
//const IconLoad   = styled(AiOutlineUpload, icon_style);
const IconLoad   = styled(AiOutlineVerticalAlignTop, icon_style);
const IconSave   = styled(AiOutlineVerticalAlignBottom, icon_style);
const IconRemove = styled(AiOutlineDelete, icon_style);

//const IconClose = styled(AiOutlineClose, icon_style);

export interface IColumnType<T> {
  key: string;
  title: string;
  width?: number;
  render?: (column: IColumnType<T>, item: T) => void;
}

interface Props<T> {
  data: T[];
  columns: IColumnType<T>[];
}

/*
const TableWrapper = styled("table", {
  marginTop: "12px",
  borderCollapse: "collapse",
  border: "solid gray 1px",
  fontFamily: "Anek Telugu",
});
*/

const default_style_table = {
  //marginTop: "12px",
  borderCollapse: "collapse",
  border: "solid gray 1px",
  fontFamily: "Anek Telugu",
};
/*
const handleRowAdd = (index) => {
    alert("Row Add: " + index);
};
const handleRowUp = (index) => {
    alert("Row Up: " + index);
};
const handleRowDown = (index) => {
    alert("Row Down: " + index);
};
const handleRowDelete = (index) => {
    alert("Row Delete: " + index);
};
*/
export function loadTableData( localStorageName ): [] {
    const json = localStorage.getItem(localStorageName);
    if (json == null) {
           //alert("localStorage not found:  \""+ localStorageName +"\"");
           return null
    }
    return JSON.parse(json); 
}

export function Table<T>({ id, data, columns , localStorageName, 
			tableStyle = {},
			headerStyle = {},
			rowStyle = {},
			cellStyle = {},
			checkColEnable = false,
			enableScrollY = true,
			containerHeight = "300px",
                        }: Props<T>): JSX.Element {

//let copyData = data.map( list => ({'key1': list.key1, 'key2': list.key2}))
//const copyData = JSON.parse(JSON.stringify(data)); 
//let scroll_y = scroll_Y
let container_height = containerHeight
if (!enableScrollY) {
   container_height = "100%"
}
let copyData = []
if ( data != null ) {
 copyData = JSON.parse(JSON.stringify(data)); 
} else {
    let row_data = {}
    for (let i in columns) {
     //console.dir(columns[i].key);
     row_data[columns[i].key] = "";
    }
    let data_ = [ row_data ]
    data = JSON.parse(JSON.stringify(data_)); 
    copyData = JSON.parse(JSON.stringify(data)); 
}

//let resetData = JSON.parse(JSON.stringify(data)); 
//const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

const [edit, setEdit] = useState("plaintext-only");
//const [edit, setEdit] = useState("false");

const [key, setKey] = useState(false);

//const [dataA, setDataA] = useState(data);
const [dataA, setDataA] = useState(copyData);
const [checkCol, setCheckCol] = useState(checkColEnable);

function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}


const handleRowAdd = (index) => {
    //alert("Row Add: " + index);
    //const _data = { fullName:"-", role:"-", tags:[] }

    let _data2 = {}
    for (let i in columns) {
     //console.dir(columns[i].key);
     _data2[columns[i].key] = "";
    }
    dataA.splice(Number(index) + 1, 0, _data2);
    //console.dir(dataA);
    setDataA(dataA.concat())
};
const handleRowUp = (index) => {
    //alert("Row Up: " + index);
    if ( index == 0 ) { alert("skip"); return;}
    arraymove(dataA, Number(index) , Number(index) -1)
    //setDataA(dataA.concat())
   setDataA(JSON.parse(JSON.stringify( dataA))); 
};
const handleRowDown = (index) => {
    //alert("Row Down: " + index);
    if ( index >= dataA.length-1 ) {alert("skip");return;}
    arraymove(dataA, Number(index) , Number(index) + 1)
    //setDataA(dataA.concat())
   setDataA(JSON.parse(JSON.stringify( dataA))); 
};
const handleRowDelete = (index) => {
    //alert("Row Delete: " + index);
    dataA.splice(Number(index) , 1 );
    //console.dir(dataA);
    //setDataA(dataA.concat())
   setDataA(JSON.parse(JSON.stringify( dataA))); 
};

const handleChange = () => {
    //console.log("handleChange")
    update()
};

const handleCheck = (index, e) => {
    console.log("handleCheck:", index, e.target.checked)
    //console.log("handleCheck:", e.target.checked)
    dataA[index]["_check"] = e.target.checked;
};

const dump = () => {
    //console.dir(data);
    console.dir(dataA);
    
    //const table = document.querySelector('#' + id);
    //console.log(table)
    //const tds = table.querySelectorAll('.tableCell');
    //console.log(tds.length);
    //for (let i = 0; i < tds.length; i++) {
    // console.log(i, tds[i].textContent);
    //}
    
};

const updateData = (row, colname, text) => {
      if (dataA[row][colname] != text ) {
	   console.log("updateData:", row, colname, text);
           //dataA[row][colname] = text;

           const rowData = JSON.parse(JSON.stringify( dataA[row])); 
           rowData[colname] = text;
           dataA[row] = rowData;
      }
}

const update = () => {
    const table_coln = columns.length
    const table_rown = dataA.length
    //console.log(table_coln, table_rown)

    //console.dir(dataA);
    const table = document.querySelector('#' + id);
    //console.log(table)
    const tds = table.querySelectorAll('.tableCell');
    //console.log(tds.length);
    for (let i = 0; i < tds.length; i++) {
     //console.log(i, tds[i].textContent);
     const rown = Math.floor(i / table_coln);
     const coln = i % table_coln;
     //console.log(i, rown, coln, tds[i].textContent);
     //console.log(i, rown, columns[coln].key, "=>", tds[i].textContent);
     updateData(rown, columns[coln].key, tds[i].textContent);


     //updateCell(row,col,  tds[i].textContent);
    }

};

const reset = () => {
     console.log("reset")
    //setDataA(dataA.concat())
    
    //const copyData = JSON.parse(JSON.stringify(data)); 
    //setDataA(copyData)

    //arraymove(copyData, 0 , 1)
    //setDataA(copyData)
    //arraymove(copyData, 1 , 0)
    //setDataA(copyData)
    //setDataA(JSON.parse(JSON.stringify( dataA))); 
    //forceUpdate()
    //setResets("false");

    //handleRowDown(0)
    //handleRowDown(1)
    //const copyData = JSON.parse(JSON.stringify(resetData)); 
    const copyData = JSON.parse(JSON.stringify(data)); 
    setDataA(copyData)
    setKey(!key)
};

const save = () => {
    //const tds = document.querySelectorAll('td[contenteditable="true"]');
    //console.log(tds.length);
    //for (let i in tds) {
    //         console.log(tds[i].textContent)
    //}
    const json = JSON.stringify(dataA); 
    console.log(json)
    localStorage.setItem(localStorageName, json);

};

const load = () => {
    //console.dir(dataA);
    //setDataA(dataA.concat())
    //setDataA(data)
    const json = localStorage.getItem(localStorageName);
    if (json == null) {
           alert("localStorage not found:  \""+ localStorageName +"\"");
           return
    }

    const loadData = JSON.parse(json); 
    setDataA(loadData)
    setKey(!key)
    //resetData = JSON.parse(JSON.stringify(loadData)); 
};

const remove = () => {
  localStorage.removeItem(localStorageName);
};

const TableWrapper = styled("table", {...default_style_table, ...tableStyle});
//const TableContainer = styled("div", {overflowY:"auto", maxHeight:container_height,});

const [scrollY, setScrollY] = useState(false);
const TableContainer = useMemo(() => {
      console.log("memo scrollY", scrollY)
      if (scrollY) {
          return styled("div", {overflowY:"auto", width:"fit-content", maxHeight:container_height, 
	              borderTop: "solid 1px gray", 
		      borderBottom: "solid 1px gray",
		      borderRight: "solid 1px gray",
		      });

      } else {
          return styled("div", {overflowY:"auto", width:"fit-content", maxHeight:container_height,});
      }
}, [scrollY])

const TableContainerElement = useRef(null);


//const [scrollY, setScrollY] = useState(false);
useEffect(() => {
    if (TableContainerElement["current"]) {
        const ele = TableContainerElement["current"] 
        console.log(id, "scroll-y",ele.scrollHeight > ele.clientHeight)
        setScrollY(ele.scrollHeight > ele.clientHeight)
    }
}, [dataA]);


/*
const scrollY = useMemo(() => {
    if (TableContainerElement["current"]) {
        const ele = TableContainerElement["current"] 
        console.log(id, "scroll-y",ele.scrollHeight > ele.clientHeight)
        return (ele.scrollHeight > ele.clientHeight)
    }
}, [dataA])
*/
/*
  # scrol auto status check
  element.scrollHeight > element.clientHeight 
     true : scroll
     false: none
*/

const fixStyle = {
    position: "sticky",
    top: -1,
    //border: "solid gray 1px",
    //background: "yellow",
    zIndex: 1000,
    //borderTop: "2px solid gray",
    //borderBottom: "2px solid #ccc",
}

const headerStyleFix = {...headerStyle, ...fixStyle}
const tooltipStyle = { 
   //backgroundColor: "rgb(0, 247, 255)",
   //color: "#222",
   backgroundColor: "#696969",
   color: "#fff",
   borderRadius: "0px",
   fontSize: "12px",
   zIndex: 9999,
   padding: "3px",

   }

/*
    <TableContainer ref={TableContainerElement} >
    <TableWrapper id={id} key={key}>

*/
  return (
    <>
    <button onClick={() =>dump()} >dump</button>
    <button onClick={() =>update()}>update</button>
    <button onClick={() =>reset()}>reset</button>
    &ensp;
    <button onClick={() =>save()} >save</button>
    <button onClick={() =>load()} >load</button>
    <button onClick={() =>remove()} data-tooltip-id="my-tooltip1" data-tooltip-content="Hello to you too!" >
    remove
    <Tooltip id="my-tooltip1" />
    </button>
    &ensp;
    {/*
    <IconReset    onClick={() =>reset()} />
    <IconLoad     onClick={() =>load()} />
    <IconSave     onClick={() =>save()} />
    <IconRemove   onClick={() =>remove()} />
    */}


    <IconReset    onClick={() =>reset()} 
         data-tooltip-id="reset" data-tooltip-content="Reset"/> <Tooltip id="reset"   style={tooltipStyle} />
    <IconUpdate    onClick={() =>update()} 
         data-tooltip-id="update" data-tooltip-content="Update"/> <Tooltip id="update"   style={tooltipStyle} />
    <IconDump    onClick={() =>dump()} 
         data-tooltip-id="dump" data-tooltip-content="Dump"/> <Tooltip id="dump"   style={tooltipStyle} />

    
    <IconLoad     onClick={() =>load()} 
         data-tooltip-id="load" data-tooltip-content="Load"/> <Tooltip id="load" style={tooltipStyle} /> 
    <IconSave     onClick={() =>save()} 
         data-tooltip-id="save" data-tooltip-content="Save"/> <Tooltip id="save" style={tooltipStyle} /> 
    <IconRemove   onClick={() =>remove()} 
         data-tooltip-id="remove" data-tooltip-content="Remove"/> <Tooltip id="remove" style={tooltipStyle} /> 
    &ensp;
    <label style={{backgroundColor: "lightgreen", fontSize: "11px", verticalAlign: "middle", padding: "1px 10px 0px 10px"}}>{localStorageName}</label>

    <TableContainer ref={TableContainerElement} >
    <TableWrapper id={id} key={key}>
      <thead>
        <TableHeader columns={columns} style={headerStyleFix} checkCol={checkCol}/>
      </thead>
      <tbody>
        <TableRow data={dataA} columns={columns} 
	           edit={edit}
	           handleAdd={handleRowAdd}
	           handleUp={handleRowUp}
	           handleDown={handleRowDown}
	           handleDelete={handleRowDelete}
		   handleChange={handleChange}
		   handleCheck={handleCheck}
		   rowStyle={rowStyle}
		   cellStyle={cellStyle}
		   checkCol={checkCol}
		   />
     </tbody>
    </TableWrapper>
    </TableContainer>
    </>
  );
}
