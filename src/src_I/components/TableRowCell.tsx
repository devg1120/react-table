import { useState, useEffect } from 'react';

import { styled } from '@stitches/react';
//import get from 'lodash.get';
import { IColumnType } from './Table';

import {
   ResponsiveContainer,
   LineChart,
   Line,
   CartesianGrid,
   XAxis,
   YAxis,
} from 'recharts';

// https://github.com/recharts/recharts/tree/main/www/src/docs/exampleComponents
//import Example1 from "./rechart/SimpleLineChart";
//import SimpleLineChart   from "../../rechart/exampleComponents/LineChart/SimpleLineChart";
//import  {SimpleLineChart}    from "./rechart/exampleComponents/entry";
//import  * as Ex   from "./rechart/exampleComponents/entry2";
//import  * as Example   from "./rechart";

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
   /*
 const that = this;
 let f2;
 if (Object.keys(func_dic).length > 0 ){
     console.log(func_dic)
  
  
  //const f = func_dic["onClick"];
  f2 = func_dic["onClick"];
  //f();
  //console.log("f2", f2)
  //f()
  f2()
}
*/

   if (skipCellList.length > 0) {
      //console.log(skipCellList);
   }
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

   const TableCell = styled('td', {
      ...default_style,
      ...style,
      ...row_style,
      ...cell_style,
      ...cellLine_style,
   });
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
   /*
function renderGraph() {
    return (
             <LineChart  width={"600px"} height={"165px"} data={data__}>
                  <Line type="monotone" dataKey="サイト訪問者数" />
                  <CartesianGrid />
                  <XAxis dataKey="day" />
                  <YAxis />
              </LineChart>
	);
}
             <LineChart  width={"100%"} height={126} data={data__}>

             <LineChart  style={{position: "absolute",  top: 5, bottom: 0, left: -12, right: 0 }}
	                 width={"100%"} height={"100%"} data={data__} >

      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
*/

   function renderGraph2() {
      return (
         <div
            style={{
               position: 'absolute',
               top: 10,
               bottom: 0,
               left: 10,
               right: 15,
            }}
         >
            <Example.SimpleLineChart />
         </div>
      );
   }

   /*
        <div  className="chart"  data-mode='dark / light' style={{ position: 'absolute', top: 10, bottom: 0, left: 10, right: 15 }} >
        <div  className="chart"    data-mode={darkMode}  style={{ position: 'absolute', top: 10, bottom: 10, left: 10, right: 10 }} >
        <div  className="chart"    data-mode={darkMode}  style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} >

  */
   function renderGraph(darkMode) {
      return (
         <div
            className='chart'
            data-mode={darkMode}
            style={{
               position: 'absolute',
               top: 10,
               bottom: 5,
               left: 7,
               right: 15,
            }}
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
   function renderGraph_() {
      return (
         <LineChart
            style={{
               position: 'absolute',
               top: 0,
               bottom: 0,
               left: 0,
               right: 0,
            }}
            width={'100%'}
            height={'100%'}
            data={data__}
            margin={{ top: 15, right: 15, left: 0, bottom: 5 }}
         >
            <Line type='monotone' dataKey='サイト訪問者数' />
            <CartesianGrid />
            <XAxis dataKey='day' />
            <YAxis />
         </LineChart>
      );
   }

   //function onClick(that)  {
   const onClick = () => {
      func();
      func_dic[data.handler]();
   };

   function renderHtml() {
      let html = value;
      //if (html === 'button') return <button onClick={() => func_dic[data.handler]()}>{data.label}</button>;  //DIC USE
      if (html === 'button')
         return <button onClick={() => data.handler()}>{data.label}</button>;

      if (html === 'checkbox')
         return <input type='checkbox' id='scales' name='scales' />;
      return <label>{`not support: ${html}`}</label>;
   }

   function renderEmbed() {
      //return embed_dic[data.name];  //DIC USE
      return data.element;
   }

   /*
let html_ele 
if ( type === 'html' ) {
    html_ele = renderByhtml(value)
}
*/
   /*
                <LineChart  width={"600px"} height={"165px"} data={data__}>
                  <Line type="monotone" dataKey="サイト訪問者数" />
                  <CartesianGrid />
                  <XAxis dataKey="day" />
                  <YAxis />
                </LineChart>

*/
   return (
      <TableCell
         id={id}
         className='tableCell'
         contentEditable={contentEditable}
         suppressContentEditableWarning={true}
         onInput={handleChange}
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
