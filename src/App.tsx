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
    _check: true,
  },
  {
    fullName: "yama ryo",
    role: "Social Media Manager2",
    tags: "designer2",
  },
  {
    fullName: "san del",
    role: "Social Media Manager3",
    tags: "designer3",
  },
];

const localStorageName = "table_data";
const localStorageName2 = "table_data2";
const localStorageName3 = "table_data3";

let data2 = loadTableData(localStorageName2);
if (data2 == null) {
  data2 = data;
}
let data3 = loadTableData(localStorageName3); // null


const tableStyle = {
  border: "solid red 3px",
};

const headerStyle = {
  backgroundColor: "yellow",
  height: "70px",
};

const rowStyle = {
  backgroundColor: "white",
  //"&:nth-child(odd)": {
  "&:nth-child(even)": {
    backgroundColor: "#e0e0e0",
  },
};

const cellStyle = {
  fontFamily: "monospace",
  fontSize: 14,
  padding: 6,
  textAlign: "center",
};

//--------------------------------------------------
const localStorageName4 = "table_data4";
const columns_sy: IColumnType<IData>[] = [
  { key: "A", title: "A", width: 100 },
  { key: "B", title: "B", width: 100 },
  { key: "C", title: "C", width: 100 },
  { key: "D", title: "D", width: 100 },
  { key: "E", title: "E", width: 100 },
  { key: "G", title: "G", width: 100 },
];

const cellStyle_sy = {
  //backgroundColor: "red",
  fontFamily: "sams-serif",
  //fontFamily: 'monospace',
  fontWeight: "800",
  fontSize: 14,
  padding: 6,
  textAlign: "center",
};

let data_sy = [];
for (let x = 1; x <= 100; x++) {
  let row_data = {};
  for (let i in columns_sy) {
    row_data[columns_sy[i].key] = String(x) + "-" + columns_sy[i].key;
  }
  data_sy.push(row_data);
}

//--------------------------------------------------
const localStorageName5 = "table_data5";
const columns_sy2: IColumnType<IData>[] = [
  { key: "A", title: "A", width: 150 },
  { key: "B", title: "B", width: 150 },
  { key: "C", title: "C", width: 150 },
  { key: "D", title: "D", width: 150 },
  { key: "E", title: "E", width: 150 },
  { key: "G", title: "G", width: 150 },
  { key: "H", title: "H", width: 150 },
  { key: "I", title: "I", width: 150 },
];

const cellStyle_sy2 = {
  fontFamily: "sams-serif",
  //fontFamily: 'monospace',
  fontWeight: "800",
  fontSize: 14,
  padding: 6,
  textAlign: "center",
};

let data_sy2 = [];
for (let x = 1; x <= 100; x++) {
  let row_data = {};
  for (let i in columns_sy2) {
    row_data[columns_sy2[i].key] = String(x) + "-" + columns_sy2[i].key;
  }
  data_sy2.push(row_data);
}

//----------------------------------------------------------

const Session = styled("div", {
  marginLeft: "40px",
  marginBottom: "50px",
});

export const App = () => {
  return (
    <>
      <h2> TABLE 1 </h2>
      <Session>
        <Table
          id="ASTable1"
          data={data}
          columns={columns}
          localStorageName={localStorageName}
          tableStyle={tableStyle}
          cellStyle={cellStyle}
          checkColEnable={true}
        />
      </Session>

      <h2> TABLE 2 </h2>
      <Session>
        <Table
          id="ASTable2"
          data={data2}
          columns={columns}
          localStorageName={localStorageName2}
          rowStyle={rowStyle}
          headerStyle={headerStyle}
        />
      </Session>

      <h2> TABLE 3 not storage</h2>
      <Session>
        <Table
          id="ASTable3"
          data={data3}
          columns={columns}
          localStorageName={localStorageName3}
        />
      </Session>

      <h2> TABLE 4 scroll-y</h2>
      <Session>
        <Table
          id="ASTable4"
          data={data_sy}
          columns={columns_sy}
          cellStyle={cellStyle_sy}
          localStorageName={localStorageName4}
        />
        <br />
        <Table
          id="ASTable5"
          data={data_sy2}
          columns={columns_sy2}
          cellStyle={cellStyle_sy}
          localStorageName={localStorageName5}
          checkColEnable={true}
        />
      </Session>
    </>
  );
};
