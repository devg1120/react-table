import { styled } from "@stitches/react";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
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

import { Tooltip } from "react-tooltip";

import "react-tooltip/dist/react-tooltip.css";

const icon_style = {
  fontSize: "11px",
  padding: "2px 4px 2px 4px",
  margin: "0px 0px 0px 0px",
  //transform: "scale(0.7, 0.7)",
  borderRight: "solid 1px gray",
  borderBottom: "solid 1px gray",
  verticalAlign: "bottom",
};

const IconDump = styled(AiOutlineFile, icon_style);
const IconUpdate = styled(AiOutlineTable, icon_style);
const IconReset = styled(AiOutlineRedo, icon_style);
const IconLoad = styled(AiOutlineVerticalAlignTop, icon_style);
const IconSave = styled(AiOutlineVerticalAlignBottom, icon_style);
const IconRemove = styled(AiOutlineDelete, icon_style);


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


const default_style_table = {
  borderCollapse: "collapse",
  //borderCollapse: "separate",
  //borderSpacing: "0",
  fontFamily: "Anek Telugu",
};

export function loadTableData(localStorageName): [] {
  const json = localStorage.getItem(localStorageName);
  if (json == null) {
    //alert("localStorage not found:  \""+ localStorageName +"\"");
    return null;
  }
  return JSON.parse(json);
}

export function Table<T>({
  id,
  data,
  columns,
  localStorageName,
  tableStyle = {},
  headerStyle = {},
  rowStyle = {},
  cellStyle = {},
  checkColEnable = false,
  enableScrollY = true,
  containerHeight = "300px",
}: Props<T>): JSX.Element {
  let container_height = containerHeight;
  if (!enableScrollY) {
    container_height = "100%";
  }
  let copyData = [];
  if (data != null) {
    copyData = JSON.parse(JSON.stringify(data));
  } else {
    let row_data = {};
    for (let i in columns) {
      row_data[columns[i].key] = "";
    }
    let data_ = [row_data];
    data = JSON.parse(JSON.stringify(data_));
    copyData = JSON.parse(JSON.stringify(data));
  }


  const [edit, setEdit] = useState("plaintext-only");
  const [key, setKey] = useState(false);
  const [dataA, setDataA] = useState(copyData);
  const [checkCol, setCheckCol] = useState(checkColEnable);

  function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

  const handleRowAdd = (index) => {
    let _data2 = {};
    for (let i in columns) {
      _data2[columns[i].key] = "";
    }
    dataA.splice(Number(index) + 1, 0, _data2);
    setDataA(dataA.concat());
  };

  const handleRowUp = (index) => {
    if (index == 0) {
      alert("skip");
      return;
    }
    arraymove(dataA, Number(index), Number(index) - 1);
    setDataA(JSON.parse(JSON.stringify(dataA)));
  };

  const handleRowDown = (index) => {
    //alert("Row Down: " + index);
    if (index >= dataA.length - 1) {
      alert("skip");
      return;
    }
    arraymove(dataA, Number(index), Number(index) + 1);
    setDataA(JSON.parse(JSON.stringify(dataA)));
  };

  const handleRowDelete = (index) => {
    dataA.splice(Number(index), 1);
    setDataA(JSON.parse(JSON.stringify(dataA)));
  };

  const handleChange = () => {
    update();
  };

  const handleCheck = (index, e) => {
    dataA[index]["_check"] = e.target.checked;
  };

  const dump = () => {
    console.dir(dataA);
  };

  const updateData = (row, colname, text) => {
    if (dataA[row][colname] != text) {
      const rowData = JSON.parse(JSON.stringify(dataA[row]));
      rowData[colname] = text;
      dataA[row] = rowData;
    }
  };

  const update = () => {
    const table_coln = columns.length;
    const table_rown = dataA.length;
    const table = document.querySelector("#" + id);
    const tds = table.querySelectorAll(".tableCell");
    for (let i = 0; i < tds.length; i++) {
      const rown = Math.floor(i / table_coln);
      const coln = i % table_coln;
      updateData(rown, columns[coln].key, tds[i].textContent);
    }
  };

  const reset = () => {
    const copyData = JSON.parse(JSON.stringify(data));
    setDataA(copyData);
    setKey(!key);
  };

  const save = () => {
    const json = JSON.stringify(dataA);
    console.log(json);
    localStorage.setItem(localStorageName, json);
  };

  const load = () => {
    const json = localStorage.getItem(localStorageName);
    if (json == null) {
      alert('localStorage not found:  "' + localStorageName + '"');
      return;
    }

    const loadData = JSON.parse(json);
    setDataA(loadData);
    setKey(!key);
  };

  const remove = () => {
    localStorage.removeItem(localStorageName);
  };

  const TableWrapper = styled("table", {
    ...default_style_table,
    ...tableStyle,
  });

  const [scrollY, setScrollY] = useState(false);
  const TableContainer = useMemo(() => {
    if (scrollY) {
      return styled("div", {
        overflowY: "auto",
        width: "fit-content",
        maxHeight: container_height,
        borderTop: "solid 1px gray",
        borderBottom: "solid 1px gray",
        borderRight: "solid 1px gray",
      });

      //return styled("div", {overflowY:"auto", width:"fit-content", maxHeight:container_height,});
    } else {
      //return styled("div", {overflowY:"auto", width:"fit-content", maxHeight:container_height,});
      return styled("div", {
        overflowY: "auto",
        width: "fit-content",
        maxHeight: container_height,
        borderTop: "solid 1px gray",
      });
    }
  }, [scrollY]);

  const TableContainerElement = useRef(null);

  useEffect(() => {
    if (TableContainerElement["current"]) {
      const ele = TableContainerElement["current"];
      setScrollY(ele.scrollHeight > ele.clientHeight);
    }
  }, [dataA]);

  const keydown = useCallback((event) => {
    if (event.shiftKey) {
      if (event.keyCode >= 37 && event.keyCode <= 40) {
        console.log("press", id, event.keyCode);
      }
    }

    if (event.keyCode === 27) {
      console.log("Esc Key is pressed!");
    }
  }, []);

  useEffect(() => {
    TableContainerElement["current"].addEventListener(
      "keydown",
      keydown,
      false,
    );
  }, []);

  const fixStyle = {
    position: "sticky",
    top: "0px",
    zIndex: 1000,
  };

  const headerStyleFix = { ...headerStyle, ...fixStyle };
  const tooltipStyle = {
    //backgroundColor: "#696969",
    backgroundColor: "#003366",
    color: "#fff",
    borderRadius: "0px",
    fontSize: "10px",
    zIndex: 9999,
    padding: "0px",
  };

  return (
    <>
{/*
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
*/}

      <div style={{ width: "fit-content" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "3px",
          }}
        >
          <div>
            &nbsp;
            <IconReset
              onClick={() => reset()}
              data-tooltip-id="reset"
              data-tooltip-content="Reset"
            />{" "}
            <Tooltip id="reset" style={tooltipStyle} />
            <IconUpdate
              onClick={() => update()}
              data-tooltip-id="update"
              data-tooltip-content="Update"
            />{" "}
            <Tooltip id="update" style={tooltipStyle} />
            <IconDump
              onClick={() => dump()}
              data-tooltip-id="dump"
              data-tooltip-content="Dump"
            />{" "}
            <Tooltip id="dump" style={tooltipStyle} />
          </div>

          <div>
            <label
              style={{
                backgroundColor: "#ffffff",
                fontSize: "10px",
                fontStyle: "italic",
                verticalAlign: "middle",
                margin: "0px 6px 0px 0px",
                padding: "1px 0px 1px 0px",
              }}
            >
              {"LocalStorage"}
            </label>
            <label
              style={{
                backgroundColor: "#ffffff",
                fontSize: "10px",
                verticalAlign: "middle",
                border: "solid gray 1px ",
                margin: "0px 2px 0px 2px",
                padding: "1px 10px 1px 10px",
              }}
            >
              {localStorageName}
            </label>
            <IconLoad
              onClick={() => load()}
              data-tooltip-id="load"
              data-tooltip-content="Load"
            />{" "}
            <Tooltip id="load" style={tooltipStyle} />
            <IconSave
              onClick={() => save()}
              data-tooltip-id="save"
              data-tooltip-content="Save"
            />{" "}
            <Tooltip id="save" style={tooltipStyle} />
            <IconRemove
              onClick={() => remove()}
              data-tooltip-id="remove"
              data-tooltip-content="Remove"
            />{" "}
            <Tooltip id="remove" style={tooltipStyle} />
            &nbsp;
          </div>
        </div>

        <TableContainer ref={TableContainerElement}>
          <TableWrapper id={id} key={key}>
            <thead>
              <TableHeader
                columns={columns}
                style={headerStyleFix}
                checkCol={checkCol}
              />
            </thead>
            <tbody>
              <TableRow
                data={dataA}
                columns={columns}
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
      </div>
    </>
  );
}
