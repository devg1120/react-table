import { Table, loadTableData, IColumnType } from './components';

const Case5 = (props) => {
   const id = 'ASTable5';
   const localStorageName = 'table_data5';

   const columns_sy: IColumnType<IData>[] = [
      { key: 'A', title: 'A', width: 100 },
      { key: 'B', title: 'B', width: 100 },
      { key: 'C', title: 'C', width: 100 },
      { key: 'D', title: 'D', width: 100 },
      { key: 'E', title: 'E', width: 100 },
      { key: 'G', title: 'G', width: 100 },
   ];
   const cellStyle_sy = {
      //backgroundColor: "red",
      fontFamily: 'sams-serif',
      //fontFamily: 'monospace',
      fontWeight: '800',
      fontSize: 14,
      padding: 6,
      textAlign: 'center',
   };
   let data_sy = [];
   for (let x = 1; x <= 100; x++) {
      let row_data = {};
      for (let i in columns_sy) {
         row_data[columns_sy[i].key] = String(x) + '-' + columns_sy[i].key;
      }
      data_sy.push(row_data);
   }

   //let skipCellList = build_skipCellList(data4, columns4);

   return (
      <Table
         id={id}
         data={data_sy}
         columns={columns_sy}
         cellStyle={cellStyle_sy}
         localStorageName={localStorageName}
      />
   );
};
export default Case5;
