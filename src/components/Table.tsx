import { styled } from '@stitches/react';
import { useState, useEffect, useRef, useMemo, useCallback, isValidElement } from 'react';
//import { useReducer } from 'react'

import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

import { AiOutlineRedo } from 'react-icons/ai';
import { AiOutlineDownload } from 'react-icons/ai';
import { AiOutlineUpload } from 'react-icons/ai';

import { AiOutlineToTop } from 'react-icons/ai';
import { AiOutlineVerticalAlignBottom } from 'react-icons/ai';
import { AiOutlineVerticalAlignTop } from 'react-icons/ai';
import { AiOutlineDrag } from 'react-icons/ai';

import { AiOutlineTable } from 'react-icons/ai';
import { AiOutlineFile } from 'react-icons/ai';
import { AiOutlinePrinter } from 'react-icons/ai';
import { AiOutlineSelect } from 'react-icons/ai';
import { AiOutlineBuild } from 'react-icons/ai';

import { AiOutlineDelete } from 'react-icons/ai';

import { AiOutlineClose } from 'react-icons/ai';

import { AiOutlineColumnWidth } from 'react-icons/ai';

import { Tooltip } from 'react-tooltip';

import 'react-tooltip/dist/react-tooltip.css';

const icon_style = {
  fontSize: '11px',
  padding: '2px 4px 2px 4px',
  margin: '0px 2px 0px 0px',
  //transform: "scale(0.7, 0.7)",
  borderRight: 'solid 1px gray',
  borderBottom: 'solid 1px gray',
  verticalAlign: 'bottom',
};

const icon_style_press = {
  fontSize: '11px',
  padding: '2px 4px 2px 4px',
  margin: '0px 2px 0px 0px',
  //transform: "scale(0.7, 0.7)",
  borderLeft: 'solid 1px gray',
  borderTop: 'solid 1px gray',
  verticalAlign: 'bottom',
  backgroundColor: '#f5f5f5',
};

const IconReset = styled(AiOutlineRedo, icon_style);
const IconUpdate = styled(AiOutlineFile, icon_style);
const IconDump = styled(AiOutlinePrinter, icon_style);

//const IconCellArrowNaviOff = styled(AiOutlineDrag, icon_style);
//const IconCellArrowNaviOn = styled(AiOutlineDrag, icon_style_press);
const IconCellArrowNaviOff = styled(AiOutlineSelect, icon_style);
const IconCellArrowNaviOn = styled(AiOutlineSelect, icon_style_press);

const IconColumnWidthResizeOff = styled(AiOutlineColumnWidth, icon_style);
const IconColumnWidthResizeOn = styled(AiOutlineColumnWidth, icon_style_press);

const IconCellLineOff = styled(AiOutlineTable, icon_style);
const IconCellLineOn = styled(AiOutlineTable, icon_style_press);

const IconRowEditOff = styled(AiOutlineBuild, icon_style);
const IconRowEditOn = styled(AiOutlineBuild, icon_style_press);

const IconLoad = styled(AiOutlineVerticalAlignTop, icon_style);
const IconSave = styled(AiOutlineVerticalAlignBottom, icon_style);
const IconRemove = styled(AiOutlineDelete, icon_style);

let focusCell = null;

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
  borderCollapse: 'collapse',
  //borderCollapse: "separate",  //SP
  //borderSpacing: 0,            //SP
  fontFamily: 'Anek Telugu',
};

export function loadTableData(localStorageName): [] {
  const json = localStorage.getItem(localStorageName);
  if (json == null) {
    //alert("localStorage not found:  \""+ localStorageName +"\"");
    return null;
  }
  return JSON.parse(json);
}

export function build_skipCellList(data, columns) {
  let skipCellList_ = [];

  for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < columns.length; c++) {
      if (columns[c].key) {
        let cell = data[r][columns[c].key];
        if (typeof cell == 'object') {
          if (cell['colspan'] && cell['rowspan']) {
            const rn = r + 1;
            const cn = c + 1;
            const rs = Number(cell['rowspan']);
            const cs = Number(cell['colspan']);
            //console.log(rn,cn,rs,cs,cell)
            for (let r_ = rn; r_ < rn + rs; r_++) {
              for (let c_ = cn; c_ < cn + cs; c_++) {
                if (!(r_ == rn && c_ == cn)) {
                  //console.log(r_, c_)
                  skipCellList_.push([r_, c_]);
                }
              }
            }
          } else if (cell['colspan']) {
            const rn = r + 1;
            const cn = c + 1;
            const rs = Number(cell['rowspan']);
            const cs = Number(cell['colspan']);
            //console.log(rn,cn,rs,cs,cell)
            let r_ = rn;
            for (let c_ = cn; c_ < cn + cs; c_++) {
              if (!(r_ == rn && c_ == cn)) {
                //console.log(r_, c_)
                skipCellList_.push([r_, c_]);
              }
            }
          } else if (cell['rowspan']) {
            const rn = r + 1;
            const cn = c + 1;
            const rs = Number(cell['rowspan']);
            const cs = Number(cell['colspan']);
            //console.log(rn,cn,rs,cs,cell)
            for (let r_ = rn; r_ < rn + rs; r_++) {
              let c_ = cn;
              if (!(r_ == rn && c_ == cn)) {
                //console.log(r_, c_)
                skipCellList_.push([r_, c_]);
              }
            }
          }
        }
      }
    }
  }
  return skipCellList_;
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
  enableScrollX = false,
  containerHeight = '300px',
  containerWidth = '500px',
  //skipCellList = [],
}: Props<T>): JSX.Element {
  //let skipCellList = [];
  //console.log("id",id )
  let container_height = containerHeight;
  if (!enableScrollY) {
    container_height = '100%';
  }

  let container_width = containerWidth;
  if (!enableScrollX) {
    container_width = 'fit-content';
  }

  let table_width = '';
  if (enableScrollX) {
    /*
    let width = 0;
    for (let i in columns) {
         if (columns[i].width) {
           width = width + Number(columns[i].width);
	 }
    }
    width += 125;
    table_width = `${width}px`;
   */
    table_width = 'max-content';
  }

  const func_dic_ = {};
  const embed_dic_ = {};

  if (data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i]) {
        for (const key in data[i]) {
          if (typeof data[i][key] == 'object') {
            for (const key2 in data[i][key]) {
               //console.log(data[i][key][key2] ) 
               //console.log(typeof data[i][key][key2] ) 

              if (typeof data[i][key][key2] == 'function') {
                const func = data[i][key][key2];
                const name = data[i][key][key2].name;
                //console.log(name, func);
                //console.log(key,key2,  data[i][key][key2].name);
                func_dic_[name] = func;
                data[i][key][key2] = name;
              }
              if (typeof data[i][key][key2] == 'object') {
                  if (data[i][key][key2]["$$typeof"] ) {
                          //console.log(data[i][key][key2] ) 
			  //console.log("************");
			  //console.log(isValidElement(data[i][key][key2]));
		     if (isValidElement(data[i][key][key2])) {
		        const ele = data[i][key][key2]
                        const name = data[i][key].name;
                        data[i][key][key2] = name;
			console.log("embed", name);
                        embed_dic_[name] = ele;

		     }
	           }
              }
              
            }
          }
        }
      }
    }
  }

  const [func_dic] = useState(func_dic_);
  const [embed_dic] = useState(embed_dic_);

  /*
 if (Object.keys(func_dic).length > 0 ){
     console.log(func_dic)
  }
*/
  let copyData = [];
  if (data != null) {
    copyData = JSON.parse(JSON.stringify(data));
  } else {
    let row_data = {};
    for (let i in columns) {
      row_data[columns[i].key] = '';
    }
    let data_ = [row_data];
    data = JSON.parse(JSON.stringify(data_));
    copyData = JSON.parse(JSON.stringify(data));
  }

  const [edit, setEdit] = useState('plaintext-only');
  const [key, setKey] = useState(false);
  const [key2, setKey2] = useState(false);
  const [dataA, setDataA] = useState(copyData);
  const [checkCol, setCheckCol] = useState(checkColEnable);
  const [cellArrowNavi, setCellArrowNavi] = useState(false);
  const [columnWidthResize, setColumnWidthResize] = useState(false);
  const [cellLine, setCellLine] = useState(true);
  const [rowEdit, setRowEdit] = useState(false);
  //const [focusCell, setFocusCell] = useState(null);
  const [rowNum, setRowNum] = useState(dataA.length);

  const skipCellList = build_skipCellList(dataA, columns);

  function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

  const handleRowAdd = (index) => {
    let _data2 = {};
    for (let i in columns) {
      _data2[columns[i].key] = '';
    }
    dataA.splice(Number(index) + 1, 0, _data2);
    setDataA(dataA.concat());
    console.log(dataA);
    setRowNum(dataA.length);
    //
    /*
    let dataB = JSON.parse(JSON.stringify(dataA));
    dataB.splice(Number(index) + 1, 0, _data2);
    setDataA(dataB.concat());
    */
  };

  const handleRowUp = (index) => {
    if (index == 0) {
      alert('skip');
      return;
    }
    arraymove(dataA, Number(index), Number(index) - 1);
    setDataA(JSON.parse(JSON.stringify(dataA)));
  };

  const handleRowDown = (index) => {
    //alert("Row Down: " + index);
    if (index >= dataA.length - 1) {
      alert('skip');
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
    dataA[index]['_check'] = e.target.checked;
  };

  //let focusCell = null;

  const handleFocus = (id) => {
    //console.log("focus:", id)
    focusCell = id;
    //setFocusCell(id);
    //console.log("focus:", focusCell)
  };

  const dump = () => {
    console.dir(dataA);
  };

  const cellArrowNaviToggle = () => {
    setCellArrowNavi(!cellArrowNavi);
  };

  const columnWidthResizeToggle = () => {
    setColumnWidthResize(!columnWidthResize);
  };

  const cellLineToggle = () => {
    setCellLine(!cellLine);
  };

  const rowEditToggle = () => {
    setRowEdit(!rowEdit);
  };

  const handleMouseEnter = () => {
    if (focusCell != null) {
      const ele = TableContainerElement['current'].querySelector('#' + focusCell);
      //console.log(ele);
      if (ele) {
        TableElement['current'].focus();
        ele.click();
        ele.focus();
      }
    }
  };
  const updateData = (row, colname, text) => {
    if (dataA[row][colname] != text) {
      const rowData = JSON.parse(JSON.stringify(dataA[row]));
      rowData[colname] = text;
      dataA[row] = rowData;
      //console.log('updateData', row, colname, text);
    }
  };

  const update = () => {
    console.log('update');
    const table_coln = columns.length;
    const table_rown = dataA.length;
    console.log('id', id);
    const table = document.querySelector('#' + id);
    const tds = table.querySelectorAll('.tableCell');
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

  const TableWrapper = styled('table', {
    ...default_style_table,
    ...tableStyle,
    ...{
      width: table_width,
      //display: "inline-block",
    },
  });

  const [scrollY, setScrollY] = useState(false);
  const TableContainer = useMemo(() => {
    if (scrollY) {
      return styled('div', {
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'auto',
        maxWidth: container_width,
        maxHeight: container_height,
        borderTop: 'solid 1px gray',
        borderBottom: 'solid 1px gray',
        borderRight: 'solid 1px gray',
      });

      //return styled("div", {overflowY:"auto", width:"fit-content", maxHeight:container_height,});
    } else {
      //return styled("div", {overflowY:"auto", width:"fit-content", maxHeight:container_height,});
      return styled('div', {
        position: 'relative',
        overflowY: 'none',
        overflowX: 'none',
        maxWidth: container_width,
        maxHeight: container_height,
        borderTop: 'solid 1px gray',
      });
    }
  }, [scrollY]);

  const TableContainerElement = useRef(null);
  const TableElement = useRef(null);

  //let tableHeight = 100;
  const [tableHeight, set_tableHeight] = useState(100);
  const [checkHeaderWidth, set_checkHeaderWidth] = useState(31);
  useEffect(() => {
    if (TableElement['current']) {
      //console.log(TableElement['current'].scrollHeight);
      set_tableHeight(TableElement['current'].scrollHeight);
      const thc_ele = TableElement['current'].querySelector('#thc');
      //console.log(thc_ele);
      if (thc_ele != null) {
        const width = thc_ele.getBoundingClientRect().width;
        set_checkHeaderWidth(width);
      }
      //setKey(!key)
    }
    //}, []);
  }, [dataA]);

  useEffect(() => {
    if (TableContainerElement['current']) {
      const ele = TableContainerElement['current'];
      setScrollY(ele.scrollHeight > ele.clientHeight);
    }
  }, [dataA]);

  //function focusChange( key_name ) {
  const focusChange = (key_name) => {
    // console.dir(dataA);
    //const focusChange = (key_name) => {
    if (focusCell == null) {
      console.log('focusCell  null', focusCell);
      return;
    }

    //console.log(focusCell, key_name);
    const param = focusCell.split('_');
    let r = Number(param[1]);
    let c = Number(param[2]);
    //let rl = useMemo( () => {return dataA.length;} )
    let rl = dataA.length;
    //let rl = rowNum;
    let cl = columns.length;
    //console.log(r, c, rl, cl);
    //console.log(r,  rl);
    //console.log(dataA);
    switch (key_name) {
      case 'left':
        //console.log("LEFT");
        if (c == 1) return;
        c = --c;
        break;
      case 'up':
        //console.log("UP");
        if (r == 1) return;
        r = --r;
        break;
      case 'right':
        //console.log("RIGHT");
        if (c == cl) return;
        c = ++c;
        break;
      case 'down':
        //console.log("DOWN");
        if (r == rl) return;
        r = ++r;
        break;
      default:
        return;
    }
    const new_id = `Cell_${r}_${c}`;
    //console.log("new_id", new_id)
    const ele = TableContainerElement['current'].querySelector('#' + new_id);
    if (ele) {
      ele.focus();
    } else {
      focusCell = new_id;
      focusChange(key_name);
    }
    return;
  };

  const handleKeyDown = (event) => {
    //function  keydown (event)  {
    //console.log("cellArrowNavi", cellArrowNavi);
    if (!cellArrowNavi) return;
    //console.log("dataA",dataA.length);
    if (event.shiftKey) {
      if (event.keyCode >= 37 && event.keyCode <= 40) {
        //console.log("sheftKey +press", event.keyCode);
      }
    } else {
      if (event.keyCode >= 37 && event.keyCode <= 40) {
        //console.log("press", event.keyCode);
        let key_name = '';
        if (event.keyCode == 37) {
          key_name = 'left';
        } else if (event.keyCode == 38) {
          key_name = 'up';
        } else if (event.keyCode == 39) {
          key_name = 'right';
        } else if (event.keyCode == 40) {
          key_name = 'down';
        } else {
          return;
        }
        focusChange(key_name);
      }
    }

    if (event.keyCode === 27) {
      console.log('Esc Key is pressed!');
    }
  };

  /*
  useEffect(() => {
      //if (cellArrowNavi) {
        TableContainerElement["current"].addEventListener(
          //TableElement["current"].addEventListener(
          "keydown",
          keydown,
          //false,
          { passive: false },
        );
       //}
  }, [scrollY]);
*/

  const fixStyle = {
    //PENDING
    position: 'sticky',
    top: '0px',
    zIndex: 1000,

    // https://demo1.uonuma-js.com/box-shadow-inset-one-direction/
    //
    //boxShadow: "0 20px 20px -20px #000000 inset;", //上
    //boxShadow: "0 -20px 20px -20px #000000 inset;",  //下
    //boxShadow: "0 -3px 3px -3px #000000 inset;",  //下
    boxShadow: '0 -1px inset gray;', //下
  };

  const headerStyleFix = { ...headerStyle, ...fixStyle }; // PENDING
  //const headerStyleFix = { ...headerStyle,  };
  const tooltipStyle = {
    //backgroundColor: "#696969",
    backgroundColor: '#003366',
    color: '#fff',
    borderRadius: '0px',
    fontSize: '10px',
    zIndex: 9999,
    padding: '0px',
  };

  const ResizeX = styled('div', {
    position: 'absolute',
    //position: 'fixed',
    top: 0,
    left: 0,
    //width: '7px',
    width: '3px',
    //height: '100%',
    //background: "transparent",
    background: '#1E90FF',
    cursor: 'col-resize',
    zIndex: '100000',
  });

  const [x_cursorStart, set_x_cursorStart] = useState(0);
  const [x_dragStart, set_x_dragStart] = useState(false);
  const [resizeCol_index, set_resizeCol_index] = useState(-1);

  const f1 = (e) => mouseMove_x(e, id);
  const f2 = (e) => mouseUp_x(e, id);
  const f3 = (e) => document_mouseUp_x(e, id);

  function mouseDown_x(event, index) {
    //console.log('mouseDown_x', id, index);
    event.stopPropagation();
    event.preventDefault();

    set_x_cursorStart(event.clientX);
    set_resizeCol_index(index);
    set_x_dragStart(true);
    document.addEventListener('mouseup', f3, { once: true });
  }
  function mouseMove_x(event, id_) {
    //if (id != id_) return;
    if (id != id_) {
      console.log('NG');
      return;
    }
    if (!x_dragStart) return;
    event.stopPropagation();
    event.preventDefault();
    let cursorPosition = event.clientX;

    let mouseMoved = cursorPosition - x_cursorStart;
    set_x_cursorStart(cursorPosition);
    //console.log('mouseMove_x', id_, resizeCol_index, mouseMoved);

    if (resizeCol_index >= 0) {
      columns[resizeCol_index].width += mouseMoved;
      setKey2(!key2);
    }
  }
  function mouseUp_x(event, id_) {
    if (id != id_) {
      console.log('NG');
      return;
    }
    if (!x_dragStart) return;
    event.stopPropagation();
    event.preventDefault();
    //console.log('mouseUp_x', id_, resizeCol_index);
    let cursorPosition = event.clientX;

    let mouseMoved = cursorPosition - x_cursorStart;
    set_x_cursorStart(cursorPosition);

    if (resizeCol_index >= 0) {
      columns[resizeCol_index].width += mouseMoved;
      setKey2(!key2);
    }
    set_x_dragStart(false);
  }

  function document_mouseUp_x(event, id_) {
    console.log('document_mouseUp_x', id_, resizeCol_index);
    if (id != id_) {
      console.log('NG');
      return;
    }
    if (!x_dragStart) return;
    event.stopPropagation();
    event.preventDefault();
    set_x_dragStart(false);
    return;

    //console.log('mouseUp_x', id_, resizeCol_index);
    let cursorPosition = event.clientX;

    let mouseMoved = cursorPosition - x_cursorStart;
    set_x_cursorStart(cursorPosition);

    if (resizeCol_index >= 0) {
      columns[resizeCol_index].width += mouseMoved;
      setKey2(!key2);
    }
    set_x_dragStart(false);
  }

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

      <div style={{ width: 'fit-content' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: '3px',
          }}
        >
          <div>
            &nbsp;
            <IconReset onClick={() => reset()} data-tooltip-id='reset' data-tooltip-content='Reset' />
            <Tooltip id='reset' style={tooltipStyle} />
            <IconUpdate onClick={() => update()} data-tooltip-id='update' data-tooltip-content='Update' />
            <Tooltip id='update' style={tooltipStyle} />
            <IconDump onClick={() => dump()} data-tooltip-id='dump' data-tooltip-content='Dump' />
            <Tooltip id='dump' style={tooltipStyle} />
            &nbsp; &nbsp;
            {cellArrowNavi ? (
              <IconCellArrowNaviOn
                onClick={() => cellArrowNaviToggle()}
                data-tooltip-id='arrow'
                data-tooltip-content='Arrow Cell Navi'
              />
            ) : (
              <IconCellArrowNaviOff
                onClick={() => cellArrowNaviToggle()}
                data-tooltip-id='arrow'
                data-tooltip-content='Arrow Cell Navi'
              />
            )}
            <Tooltip id='arrow' style={tooltipStyle} />
            {columnWidthResize ? (
              <IconColumnWidthResizeOn
                onClick={() => columnWidthResizeToggle()}
                data-tooltip-id='colResize'
                data-tooltip-content='Col Width Resize'
              />
            ) : (
              <IconColumnWidthResizeOff
                onClick={() => columnWidthResizeToggle()}
                data-tooltip-id='colResize'
                data-tooltip-content='Col Width Resize'
              />
            )}
            <Tooltip id='colResize' style={tooltipStyle} />
            {cellLine ? (
              <IconCellLineOn
                onClick={() => cellLineToggle()}
                data-tooltip-id='cellLine'
                data-tooltip-content='Cell Line'
              />
            ) : (
              <IconCellLineOff
                onClick={() => cellLineToggle()}
                data-tooltip-id='cellLine'
                data-tooltip-content='Cell Line'
              />
            )}
            <Tooltip id='cellLine' style={tooltipStyle} />
            {rowEdit ? (
              <IconRowEditOn
                onClick={() => rowEditToggle()}
                data-tooltip-id='rowEdit'
                data-tooltip-content='Row Edit'
              />
            ) : (
              <IconRowEditOff
                onClick={() => rowEditToggle()}
                data-tooltip-id='rowEdit'
                data-tooltip-content='Row Edit'
              />
            )}
            <Tooltip id='rowEdit' style={tooltipStyle} />
          </div>
          <div>
            <label
              style={{
                backgroundColor: '#ffffff',
                fontSize: '10px',
                fontStyle: 'italic',
                verticalAlign: 'middle',
                margin: '0px 6px 0px 0px',
                padding: '1px 0px 1px 0px',
              }}
            >
              {'LocalStorage'}
            </label>
            <label
              style={{
                backgroundColor: '#ffffff',
                fontSize: '10px',
                verticalAlign: 'middle',
                border: 'solid gray 1px ',
                margin: '0px 2px 0px 2px',
                padding: '1px 10px 1px 10px',
              }}
            >
              {localStorageName}
            </label>
            <IconLoad onClick={() => load()} data-tooltip-id='load' data-tooltip-content='Load' />
            <Tooltip id='load' style={tooltipStyle} />
            <IconSave onClick={() => save()} data-tooltip-id='save' data-tooltip-content='Save' />
            <Tooltip id='save' style={tooltipStyle} />
            <IconRemove onClick={() => remove()} data-tooltip-id='remove' data-tooltip-content='Remove' />
            <Tooltip id='remove' style={tooltipStyle} />
            &nbsp;
          </div>
        </div>

        <TableContainer
          ref={TableContainerElement}
          onKeyDown={handleKeyDown}
          onMouseEnter={handleMouseEnter}
          onMouseUp={f2}
        >
          <TableWrapper
            ref={TableElement}
            id={id}
            key={key}
            onMouseMove={f1}
            //onMouseUp={f2}
          >
            <thead>
              <TableHeader
                key={key2}
                columns={columns}
                rowEdit={rowEdit}
                style={scrollY ? headerStyleFix : ''}
                checkCol={checkCol}
              />
            </thead>
            <tbody
            //ref={TableElement}
            >
              <TableRow
                data={dataA}
                columns={columns}
                edit={edit}
                rowEdit={rowEdit}
                handleAdd={handleRowAdd}
                handleUp={handleRowUp}
                handleDown={handleRowDown}
                handleDelete={handleRowDelete}
                handleChange={handleChange}
                handleCheck={handleCheck}
                handleFocus={handleFocus}
                rowStyle={rowStyle}
                cellStyle={cellStyle}
                checkCol={checkCol}
                skipCellList={skipCellList}
                cellLine={cellLine}
                func_dic={func_dic}
                embed_dic={embed_dic}
              />
            </tbody>
          </TableWrapper>
          {columnWidthResize &&
            columns.map((column, columnIndex) => {
              //console.log("columnIndex", columnIndex);
              let left = 0;
              for (let i = 0; i <= columnIndex; i++) {
                //left = left + Number(columns[i].width) + 0.5;
                left = left + Number(columns[i].width) + 1;
              }
              if (checkColEnable) {
                left = left + checkHeaderWidth;
              } else {
                left = left - 1;
              }
              return (
                <ResizeX
                  key={columnIndex}
                  onMouseDown={(e) => mouseDown_x(e, columnIndex)}
                  style={{ left: `${left}px`, height: `${tableHeight}px` }}
                />
              );
            })}
        </TableContainer>
      </div>
    </>
  );
}
