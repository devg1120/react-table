import { styled } from "@stitches/react";
import { useState } from 'react';

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


const TableWrapper = styled("table", {
  borderCollapse: "collapse",
  border: "solid gray 1px",
  fontFamily: "Anek Telugu",
});

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

export function Table<T>({ id, data, columns }: Props<T>): JSX.Element {

//let copyData = data.map( list => ({'key1': list.key1, 'key2': list.key2}))
const copyData = JSON.parse(JSON.stringify(data)); 


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
    setDataA(dataA.concat())
};
const handleRowDown = (index) => {
    //alert("Row Down: " + index);
    if ( index >= dataA.length-1 ) {alert("skip");return;}
    arraymove(dataA, Number(index) , Number(index) + 1)
    setDataA(dataA.concat())
};
const handleRowDelete = (index) => {
    //alert("Row Delete: " + index);
    dataA.splice(Number(index) , 1 );
    //console.dir(dataA);
    setDataA(dataA.concat())
};

const dump = () => {
    console.dir(dataA);
    
    const table = document.querySelector('#' + id);
    console.log(table)
    const tds = table.querySelectorAll('.tableCell');
    console.log(tds.length);
    for (let i = 0; i < tds.length; i++) {
     console.log(i, tds[i].textContent);
    }
    
};

const updateCell = (row, col, text) => {


}
const update = () => {
    const table_coln = columns.length
    const table_rown = dataA.length
    console.log(table_coln, table_rown)

    console.dir(dataA);
    const table = document.querySelector('#' + id);
    console.log(table)
    const tds = table.querySelectorAll('.tableCell');
    console.log(tds.length);
    for (let i = 0; i < tds.length; i++) {
     //console.log(i, tds[i].textContent);
     const rown = Math.floor(i / table_coln);
     const coln = i % table_coln;
     //console.log(i, rown, coln, tds[i].textContent);
     console.log(i, rown, columns[coln].key, "=>", tds[i].textContent);


     //updateCell(row,col,  tds[i].textContent);
    }

};

const reset = () => {
    //setDataA(dataA.concat())
    const copyData = JSON.parse(JSON.stringify(data)); 
    setDataA(copyData)
};

const save = () => {
    const tds = document.querySelectorAll('td[contenteditable="true"]');
    console.log(tds.length);
    //for (let i in tds) {
    //         console.log(tds[i].textContent)
    //}
};

const load = () => {
    console.dir(dataA);
    //setDataA(dataA.concat())
    setDataA(data)
};

  return (
    <>
    <button onClick={() =>dump()} >dump</button>
    <button onClick={() =>update()}>update</button>
    <button onClick={() =>reset()}>reset</button>
    <button onClick={() =>save()} >save</button>
    <button onClick={() =>load()} >load</button>
    <TableWrapper id={id}>
      <thead>
        <TableHeader columns={columns} />
      </thead>
      <tbody>
        <TableRow data={dataA} columns={columns} 
	           handleAdd={handleRowAdd}
	           handleUp={handleRowUp}
	           handleDown={handleRowDown}
	           handleDelete={handleRowDelete}
		   />
      </tbody>
    </TableWrapper>
    </>
  );
}
