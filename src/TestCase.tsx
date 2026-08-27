import { Table, loadTableData, IColumnType } from './components';
import { useState, useEffect } from 'react';
import * as LocalEx from '../rechart/local';

function data_build(columns, n) {
   let data_ = [];
   for (let x = 1; x <= n; x++) {
      let row_data = {};
      for (let i in columns) {
         row_data[columns[i].key] = String(x) + '-' + columns[i].key;
      }
      data_.push(row_data);
   }
   return data_;
}

const TestCase = (props) => {
   const id = 'ASTable8';
   const localStorageName = 'table_data8';

   const case_name = props.name;
   const columns_test: IColumnType<IData>[] = [
      { key: 'A', title: 'A', width: 100 },
      { key: 'B', title: 'B', width: 100 },
      { key: 'C', title: 'C', width: 100 },
      { key: 'D', title: 'D', width: 100 },
      { key: 'E', title: 'E', width: 100 },
      { key: 'F', title: 'F', width: 100 },
      { key: 'G', title: 'G', width: 100 },
   ];
   const data_test = data_build(columns_test, 45);
   //console.log(data_test);
   function render(column, item) {
      return 'OK';
   }
   const data_1 = {
      A: 'a5',
      //B: { value: 'b5', colspan: '3', rowspan: '5', style: { backgroundColor: 'lightyellow' } },
      //B: { value: 'b5', type: "graph", colspan: '4', rowspan: '6', style: { backgroundColor: 'lightyellow' } },
      //B: { value: 'button', type: "html", colspan: '4', rowspan: '6', style: { backgroundColor: 'lightyellow' } },
      //B: { value: 'checkbox', type: "html", colspan: '4', rowspan: '6', style: { backgroundColor: 'lightyellow' } },
      //B: { value: 'b5xz', type: 'graph', colspan: '5', rowspan: '12', style: { backgroundColor: '#ffffff' } },
      B: {
         value: 'b5xz',
         type: 'graph',
         colspan: '5',
         rowspan: '12',
         style: {},
      },
   };

   data_test[1] = data_1;

   const data_2 = {
      //B: { value: 'b5xz', type: 'graph', colspan: '5', rowspan: '12', style: { backgroundColor: '#000000' } },
      B: {
         value: 'b5xz',
         type: 'graph',
         colspan: '5',
         rowspan: '12',
         style: { backgroundColor: '#000000' },
         darkMode: 'dark',
      },
   };

   data_test[16] = data_2;
   function onClick1() {
      console.log(name + ' ' + 'OK App 1');
      alert(case_name + ' ' + 'OK App 1');
   }

   function onClick2() {
      console.log('OK App 2');
      alert('OK App 2');
   }

   function onClick3() {
      console.log('OK App 3');
      alert('Embed OK App 3');
   }

   function build() {
      return <button onClick={onClick3}> Embed </button>;
   }

   const [key, setKey] = useState(false);
   const [fruit, setFruit] = useState('apple');
   function change_fruit(v) {
      setFruit(v);
      setKey(!key);
   }
   function SelectMenu() {
      return (
         <div>
            <select
               value={fruit}
               onChange={(e) => change_fruit(e.target.value)}
            >
               <option value='apple'>りんご</option>
               <option value='orange'>みかん</option>
               <option value='banana'>バナナ</option>
            </select>
         </div>
      );
   }

   const data_8 = {
      B: { type: 'html', value: 'checkbox' },
      D: { type: 'html', value: 'button', label: 'NEW1', handler: onClick1 },
      E: { type: 'html', value: 'button', label: 'NEW2', handler: onClick2 },
      F: { type: 'embed', element: build(), name: 'embed_test' },
      G: { type: 'embed', element: SelectMenu(), name: 'embed_select_menu' },
   };

   data_test[13] = data_8;

   const [chart, setChart] = useState('line');
   function change_chart(v) {
      setChart(v);
      setKey(!key);
   }
   function SelectChart() {
      return (
         <div>
            <select
               value={chart}
               onChange={(e) => change_chart(e.target.value)}
            >
               <option value={'line'}>Line</option>
               <option value={'bar'}>Bar</option>
               <option value={'compose'}>Compose</option>
            </select>
         </div>
      );
   }

   const [darkMode, setDarkMode] = useState('light');
   function change_darkMode(v) {
      setDarkMode(v);
      setKey(!key);
   }
   function SelectDarkMode() {
      return (
         <div>
            <select
               value={darkMode}
               onChange={(e) => change_darkMode(e.target.value)}
            >
               <option value={'light'}>light</option>
               <option value={'dark'}>dark</option>
            </select>
         </div>
      );
   }
   const data_10 = {
      A: {
         type: 'embed',
         element: SelectChart(),
         colspan: '2',
         style: {},
         name: 'embed_select_chart',
      },
      C: {
         type: 'embed',
         element: SelectDarkMode(),
         style: {},
         name: 'embed_select_darkmode',
      },
   };

   data_test[29] = data_10;

   //function renderGraph(darkMode) {
   function renderGraph() {
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
	     <LocalEx.SimpleRadarChart/>
	    
	    */}
            {chart == 'line' ? (
               <LocalEx.SimpleLineChart2 />
            ) : chart == 'bar' ? (
               <LocalEx.MixBarChart />
            ) : chart == 'compose' ? (
               <LocalEx.LineBarAreaComposedChart />
            ) : (
               <LocalEx.SimpleRadarChart />
            )}
         </div>
      );
   }

   const data_9 = {
      //B: { value: 'b5xz', type: 'graph', colspan: '5', rowspan: '12', style: { backgroundColor: '#000000' } },
      //B: { value: 'b5xz', type: 'graph', colspan: '5', rowspan: '12', style: {   } },
      //B: { type: 'embed', element: LocalEx.SimpleLineChart2 , name : "embed_sc2" },
      //B: { type: 'embed', element: build() , name : "embed_sc2" },
      B: {
         type: 'embed',
         element: renderGraph(),
         colspan: '6',
         rowspan: '14',
         name: 'embed_sc2',
      },
   };

   data_test[30] = data_9;

   return (
      <Table
         key={key}
         id='TEST_TABLE'
         data={data_test}
         columns={columns_test}
         //cellStyle={cellStyle_sy}
         localStorageName={'TEST'}
         //checkColEnable={true}
         //enableScrollX={true}
         enableScrollY={false}
         //containerWidth={'800px'}
         darkMode={'dark'}
      />
   );
};
export default TestCase;
