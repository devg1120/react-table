import { Table, loadTableData, IColumnType } from './components';

const Case6 = (props) => {
  const id = 'ASTable6';
  const localStorageName = 'table_data6';

  const columns_sy2: IColumnType<IData>[] = [
    { key: 'A', title: 'A', width: 150 },
    { key: 'B', title: 'B', width: 150 },
    { key: 'C', title: 'C', width: 150 },
    { key: 'D', title: 'D', width: 150 },
    { key: 'E', title: 'E', width: 150 },
    { key: 'F', title: 'F', width: 150 },
    { key: 'G', title: 'G', width: 150 },
    { key: 'H', title: 'H', width: 150 },
    { key: 'I', title: 'I', width: 150 },
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

  let data_sy2 = [];
  for (let x = 1; x <= 100; x++) {
    let row_data = {};
    for (let i in columns_sy2) {
      row_data[columns_sy2[i].key] = String(x) + '-' + columns_sy2[i].key;
    }
    data_sy2.push(row_data);
  }

  //let skipCellList = build_skipCellList(data4, columns4);

  return (
    <Table
      id={id}
      data={data_sy2}
      columns={columns_sy2}
      cellStyle={cellStyle_sy}
      localStorageName={localStorageName}
      checkColEnable={true}
      enableScrollX={true}
      containerWidth={'800px'}
    />
  );
};
export default Case6;
