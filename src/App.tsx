import "@fontsource/anek-telugu";
import { styled } from "@stitches/react";

import { Table, loadTableData, IColumnType } from "./components";

interface IData {
  fullName: string;
  role: string;
  tags: string[];
}

const Span = styled("span", {
  background: "#596b7e",
  color: "white",
  paddingLeft: 10,
  paddingRight: 10,
  borderRadius: 99999,
});

const columns: IColumnType<IData>[] = [
  {
    key: "fullName",
    title: "Full Name",
    width: 200,
  },
  {
    key: "role",
    title: "Role",
    width: 200,
  },
  {
    key: "tags",
    title: "Tags",
    width: 150,
  },
];

const data: IData[] = [
  {
    fullName: "Francisco Mendes",
    role: "Full Stack",
    tags: "dev",
  },
  {
    fullName: "Ricardo Malva",
    role: "Social Media Manager",
    tags: "photographer",
  },
  {
    fullName: "gusa syou",
    role: "Social Media Manager1",
    tags: "designer1",
  },
  {
    fullName: "yama ryo",
    role: "Social Media Manager2",
    tags: "designer2" ,
  },
  {
    fullName: "san del",
    role: "Social Media Manager3",
    tags: "designer3" ,
  },
];

const localStorageName = "table_data";
const localStorageName2 = "table_data2";
const localStorageName3 = "table_data3";

let data2 = loadTableData(localStorageName2);
if (data2 == null ) {
     data2 = data
 }
let data3 = loadTableData(localStorageName3); // null
/*
if (data3 == null ) {
    let row_data = {}
    for (let i in columns) {
     //console.dir(columns[i].key);
     row_data[columns[i].key] = "A";
    }
    data3 = [ row_data ]
}
*/

const headerStyle = {
  backgroundColor: "yellow",
}

const rowStyle = {
  backgroundColor: "green",
  "&:nth-child(odd)": {
    backgroundColor: "orange",
  },
}

const cellStyle = {
  //backgroundColor: "red",
}


export const App = () => {
  return (
   <>
     <h2> TABLE 1  </h2>
     <Table id="ASTable" data={data} columns={columns} localStorageName={localStorageName} cellStyle={cellStyle}/>
     <h2> TABLE 2  </h2>
     <Table id="ASTable2" data={data2} columns={columns} localStorageName={localStorageName2} rowStyle={rowStyle} headerStyle={headerStyle}/>
     <h2> TABLE 3  not storage</h2>
     <Table id="ASTable3" data={data3} columns={columns} localStorageName={localStorageName3}/>
   </>
   )
};
