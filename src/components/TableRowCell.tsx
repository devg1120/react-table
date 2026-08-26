import { useState, useEffect } from 'react';

import { styled } from '@stitches/react';
//import get from 'lodash.get';
import { IColumnType } from './Table';

import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

import SimpleLineChart from '../../rechart/exampleComponents/LineChart/SimpleLineChart';
import * as Example from '../../rechart';
import * as LocalEx from '../../rechart/local';

import './chart.css';

const data__ = [
  { day: '月', サイト訪問者数: 2200 },
  { day: '火', サイト訪問者数: 1280 },
  { day: '水', サイト訪問者数: 3300 },
  { day: '木', サイト訪問者数: 4000 },
  { day: '金', サイト訪問者数: 2900 },
  { day: '土', サイト訪問者数: 3800 },
  { day: '日', サイト訪問者数: 3500 },
];

interface Props<T> {
  item: T;
  column: IColumnType<T>;
}

const default_style = {
  position: 'relative',

  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 5,
  paddingRight: 5,

  //fontFamily: 'sams-serif',
  //fontFamily: 'monospace',
  fontFamily: 'Inter',

  fontWeight: '400',
  fontSize: 15,

  verticalAlign: 'middle',
  //verticalAlign: 'bottom',
  //verticalAlign: 'top',

  //textAlign: 'center',
  textAlign: 'left',
  //textAlign: 'right',

  color: 'black',
  border: 'solid gray 1px',
  //borderRight: 0,   //SP
  //borderBottom: 0,  //SP

  // Focus styles
  '&:focus': {
    outline: 'solid 3px #0080ff',
    outlineOffset: '-1px',
    borderBottomRightRadius: '-6px',
  },
};

export function TableRowCell<T>({
  rown,
  coln,
  item,
  column,
  edit,
  handleChange,
  handleFocus,
  style = {},
  skipCellList = [],
  cellLine = true,
  func = () => alert('A'),
  func_dic = {},
  embed_dic = {},
}: Props<T>): JSX.Element {
  const [contentEditable, setrCcontentEditable] = useState(edit);
  //const data = get(item, column.key);
  const data = item[column.key];
  let value = '';
  let cell_style = {};
  let colspan = false;
  let rowspan = false;
  let colspan_num = 0;
  let rowspan_num = 0;
  let darkMode = 'light';
  let element = null;
  //let graph = false;
  let render_type = 'string';

  if (typeof data === 'string') {
    value = data;
  } else if (typeof data === 'object') {
    if (data.value) {
      value = data.value;
    }
    if (data.type) {
      render_type = data.type;
    }

    if (data.style) {
      cell_style = data.style;
    }

    if (data.colspan) {
      colspan = true;
      colspan_num = Number(data.colspan);
    }
    if (data.rowspan) {
      rowspan = true;
      rowspan_num = Number(data.rowspan);
    }
    if (data.darkMode) {
      darkMode = data.darkMode;
    }

    if (data.element) {
      element = data.element;
    }
  }

  let row_style = {};
  if (item.row_style) {
    row_style = item.row_style;
  }

  const cellLine_style = cellLine ? {} : { border: '' };

  const TableCell = styled('td', { ...default_style, ...style, ...row_style, ...cell_style, ...cellLine_style });
  //const TableCell = styled('td', { position: "relative"});

  const id = `Cell_${rown}_${coln}`;

  /*
  useEffect(() => {
	  console.log("cell value:", value);
  }, [value]);
  */

  function onFocus() {
    //console.log("focus:", id)
    handleFocus(id);
  }

  function isSkip(rowIndex, colIndex) {
    for (let i = 0; i < skipCellList.length; i++) {
      let cell = skipCellList[i];
      if (cell[0] == rowIndex && cell[1] == colIndex) {
        return true;
      }
    }
    return false;
  }

  if (isSkip(rown, coln)) {
    // console.log("Skip", rown,coln);
    return <></>;
  }

  function renderGraph(darkMode) {
    return (
      <div
        className='chart'
        data-mode={darkMode}
        style={{ position: 'absolute', top: 10, bottom: 5, left: 7, right: 15 }}
      >
        {/*
             <LocalEx.SimpleLineChart2/>
	     <LocalEx.MixBarChart/>
	     <LocalEx.LineBarAreaComposedChart/>
	     <LocalEx.BiaxialLineChart/>
	     <LocalEx.StackedAreaChart/>
	     <LocalEx.BrushBarChart/>
	     <LocalEx.BarChartWithMultiXAxis/>
	     <LocalEx.PieChart/>
	     <LocalEx.SimpleRadarChart/>
	    
	    */}
        <LocalEx.SimpleRadarChart />
      </div>
    );
  }

  /*
  const onClick = () => {
    func();
    func_dic[data.handler]();
  };
  */
  //const [ cv, setCv ] = useState(false);

  function checkbox_checked(c) {
    //alert(c)
    //setCv(c)
    data.cv = c;
  }
  function radio_select(v) {
    //alert(v)
    console.log(v)
    data.cv = v;
  }
  function select_change(v) {
    //alert(v)
    console.log(v)
    data.cv = v;
  }

  function cap(str) {
	if (typeof str !== 'string' || !str) return str;
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  function renderHtml() {
    let html = value;

    //if (html === 'button') return <button onClick={() => func_dic[data.handler]()}>{data.label}</button>;  //DIC USE

    if (html === 'button') return <button onClick={() => data.handler()}>{data.label}</button>;

    if (html === 'checkbox')
      return (
       <>
        {data.label && <label>{data.label}</label>}
        <input
          type='checkbox'
          id='scales'
          name='scales'
          defaultChecked={data.cv}
          onChange={(e) => checkbox_checked(e.target.checked)}
        />
       </>
      );

    if (html === 'radio') {
       
       return (
       <>
         <fieldset key="1">
	 <legend>{data.label}</legend>
           {data.menu.map((label, index) =>
               <div key={index}>
		  { label == data.cv 
                    ? <input type="radio" id={label}  name={data.name} value={label} onChange={(e) => radio_select(e.target.value)} defaultChecked/>
                    : <input type="radio" id={label}  name={data.name} value={label} onChange={(e) => radio_select(e.target.value)} />
		  }
               <label>{cap(label)}</label>
               </div>
           )}
         </fieldset>
       </>
       );
    }
/*
    if (html === 'radio_')
      return (
       <>
         <fieldset>
           <legend>Select</legend>
         
           <div>
             <input type="radio" id="huey" name="drone" value="huey" onChange={(e) => radio_select(e.target.value)} />
             <label >Huey</label>
           </div>
         
           <div>
             <input type="radio" id="dewey" name="drone" value="dewey" onChange={(e) => radio_select(e.target.value)} defaultChecked/>
             <label >Dewey</label>
           </div>
         
           <div>
             <input type="radio" id="louie" name="drone" value="louie" onChange={(e) => radio_select(e.target.value)}/>
             <label >Louie</label>
           </div>
         </fieldset>
       </>
      );
*/
    if (html === 'selectmenu')
      return (
       <>
      <div>
        <select defaultValue={data.cv} onChange={(e) => select_change(e.target.value)}>
           {data.menu.map((entry, index) =>
              <option key={index} value={entry.value}>{entry.name}</option>
           )}
        </select>
      </div>
       </>
      );
/*
    if (html === 'selectmenu')
      return (
       <>
      <div>
        <select defaultValue={data.cv} onChange={(e) => select_change(e.target.value)}>
          <option value='apple'>りんご</option>
          <option value='orange'>みかん</option>
          <option value='banana'>バナナ</option>
        </select>
      </div>
       </>
      );
*/

    return <label>{`not support: ${html}`}</label>;
  }

  function renderEmbed() {
    //return embed_dic[data.name];  //DIC USE

    if (typeof data.element === 'function') {
      return data.element(data);

    } else if (typeof data.element === 'object' && data.element['$$typeof']) {
      return data.element;

    } else {
      console.log('not suport embded type!');
      return null;
    }
  }

  return (
    <TableCell
      id={id}
      className='tableCell'
      contentEditable={contentEditable}
      suppressContentEditableWarning={true}
      onInput={() => handleChange(id)}
      onFocus={onFocus}
      //{ colspan ? `colspan="${colspan_num}"`  :""}
      //{ rowspan ? `rowspan="${rowspan_num}"`  :""}
      colSpan={colspan ? colspan_num : ''}
      rowSpan={rowspan ? rowspan_num : ''}
    >
      {/*
      {column.render ? column.render(column, item) : value}
      */}
      {render_type === 'graph'
        ? renderGraph(darkMode)
        : render_type === 'html'
          ? renderHtml()
          : render_type === 'embed'
            ? renderEmbed()
            : value}
    </TableCell>
  );
}
