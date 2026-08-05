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

export function Table<T>({ data, columns }: Props<T>): JSX.Element {

const [dataA, setDataA] = useState(data);

function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}


const handleRowAdd = (index) => {
    //alert("Row Add: " + index);
    const _data = { fullName:"-", role:"-", tags:[] }
    dataA.splice(Number(index) + 1, 0, _data);
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

  return (
    <TableWrapper>
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
  );
}
