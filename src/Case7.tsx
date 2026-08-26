import { Table, loadTableData, IColumnType } from './components';

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

const Case7 = (props) => {
   const id = 'ASTable7';
   const localStorageName = 'table_data7';

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
   const data_test = data_build(columns_test, 30);
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
      console.log('OK App 1');
      alert(case_name + ' ' + 'OK App 1');
   }

   function onClick2() {
      console.log('OK App 2');
      alert('OK App 2');
   }

   const data_8 = {
      B: { type: 'html', value: 'checkbox' },
      D: { type: 'html', value: 'button', label: 'NEW1', handler: onClick1 },
      E: { type: 'html', value: 'button', label: 'NEW2', handler: onClick2 },
   };

   data_test[13] = data_8;

   return (
      <Table
         id={id}
         data={data_test}
         columns={columns_test}
         //cellStyle={cellStyle_sy}
         localStorageName={localStorageName}
         //checkColEnable={true}
         //enableScrollX={true}
         enableScrollY={false}
         //containerWidth={'800px'}
      />
   );
};
export default Case7;
