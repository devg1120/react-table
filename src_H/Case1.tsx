import { Table, loadTableData, IColumnType } from './components';

const Case1 = (props) => {
  const id = 'ASTable1';
  const localStorageName = 'table_data1';

  const columns: IColumnType<IData>[] = [
    {
      key: 'fullName',
      title: 'Full Name',
      width: 200,
    },
    {
      key: 'role',
      title: 'Role',
      width: 200,
    },
    {
      key: 'tags',
      title: 'Tags',
      width: 150,
    },
  ];

  const data: IData[] = [
    {
      fullName: 'Francisco Mendes',
      role: 'Full Stack',
      tags: 'dev',
      row_style: {
        backgroundColor: 'pink',
      },
    },
    {
      //fullName: 'Ricardo Malva',
      fullName: {
        value: 'Ricardo Malva',
        style: {
          height: '60px',
          'text-align': 'right',
          'background-color': 'lightgreen',
        },
      },
      role: 'Social Media Manager',
      tags: 'photographer',
      row_style: {
        backgroundColor: 'yellow',
      },
    },
    {
      fullName: 'gusa syou',
      role: 'Social Media Manager1',
      tags: 'designer1',
      _check: true,
    },
    {
      fullName: 'yama ryo',
      role: 'Social Media Manager2',
      //tags: 'designer2',
      tags: {
        value: 'designer2',
        style: {
          'border-bottom': 'solid 4px red',
        },
      },
    },
    {
      fullName: 'san del',
      role: 'Social Media Manager3',
      tags: 'designer3',
    },
  ];

  const tableStyle = {
    border: 'solid red 3px',
  };

  const headerStyle = {
    backgroundColor: 'yellow',
    height: '70px',
  };

  const rowStyle = {
    backgroundColor: 'white',
    //"&:nth-child(odd)": {
    '&:nth-child(even)': {
      backgroundColor: '#e0e0e0',
    },
  };

  const cellStyle = {
    fontFamily: 'monospace',
    fontSize: 14,
    padding: 6,
    textAlign: 'center',
  };
/*
  let data_ = loadTableData(localStorageName);
  if (data_ == null) {
    data_ = data;
  }
*/

  /*
  const tableStyle = {
    border: 'solid red 3px',
  };

  const headerStyle = {
    backgroundColor: 'yellow',
    height: '70px',
  };

  const rowStyle = {
    backgroundColor: 'white',
    //"&:nth-child(odd)": {
    '&:nth-child(even)': {
      backgroundColor: '#e0e0e0',
    },
  };

  const cellStyle = {
    fontFamily: 'monospace',
    fontSize: 14,
    padding: 6,
    textAlign: 'center',
  };
  */
  return (
    <Table
      id={id}
      data={data}
      columns={columns}
      localStorageName={localStorageName}
      tableStyle={tableStyle}
      cellStyle={cellStyle}
      checkColEnable={true}
      enableScrollY={false}
    />
  );
};
export default Case1;
