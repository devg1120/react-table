import { styled } from "@stitches/react";
import { useState } from 'react';
//import { useReducer } from 'react'

import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

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
  marginTop: "12px",
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
			cellStyle = {}
                        }: Props<T>): JSX.Element {

//let copyData = data.map( list => ({'key1': list.key1, 'key2': list.key2}))
//const copyData = JSON.parse(JSON.stringify(data)); 

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

  return (
    <>
    <button onClick={() =>dump()} >dump</button>
    <button onClick={() =>update()}>update</button>
    <button onClick={() =>reset()}>reset</button>
    &ensp;
    <button onClick={() =>save()} >save</button>
    <button onClick={() =>load()} >load</button>
    <button onClick={() =>remove()} >remove</button>
    &ensp;
    <label>{localStorageName}</label>
    <TableWrapper id={id} key={key}>
      <thead>
        <TableHeader columns={columns} style={headerStyle} />
      </thead>
      <tbody>
        <TableRow data={dataA} columns={columns} 
	           edit={edit}
	           handleAdd={handleRowAdd}
	           handleUp={handleRowUp}
	           handleDown={handleRowDown}
	           handleDelete={handleRowDelete}
		   handleChange={handleChange}
		   rowStyle={rowStyle}
		   cellStyle={cellStyle}
		   />
     </tbody>
    </TableWrapper>
    </>
  );
}
