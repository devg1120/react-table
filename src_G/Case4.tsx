import { Table, loadTableData, IColumnType } from './components';

const Case4 = (props) => {
  const id = 'ASTable4';
  const localStorageName = 'table_data4';
  const columns4: IColumnType<IData>[] = [
    { key: 'A', title: 'A', width: 150 },
    { key: 'B', title: 'B', width: 150 },
    { key: 'C', title: 'C', width: 150 },
    { key: 'D', title: 'D', width: 200 },
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

  const r = '30';
  const color = 'lightgreen';
  const svgdata = `
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
         <circle cx="50" cy="50" r="${r}" stroke="red" stroke-width="2" fill="${color}"/>
     </svg>
     `;

  const svgdata_enc = encodeURIComponent(svgdata);

  const image2 = "url(\'data:image/svg+xml, " + svgdata_enc + "\')";

  const data4: IData[] = [
    {
      A: 'a1',
      B: 'b1',
      C: 'c1',
      D: 'd1',
    },
    {
      A: 'a2',
      B: {
        value: 'b2',
        style: {
          borderTop: 'solid 3px green',
          borderLeft: 'solid 3px green',
          borderRight: 'solid 3px green',
          borderBottom: 'double 4px green',
          'text-align': 'left',
        },
      },
      C: {
        value: 'c2',
        style: {
          borderTop: 'solid 3px green',
          borderLeft: 'solid 3px green',
          borderRight: 'solid 3px green',
          borderBottom: 'double 4px green',
          'text-align': 'right',
        },
      },
      D: {
        value: 'd2',
        style: {
          'background-image': image2,
          'background-repeat': 'no-repeat',
          'background-size': 'cover',
        },
      },

      row_style: {
        height: '160px',
      },
    },
    {
      A: 'a3',
      //'b3',
      B: {
        value: 'b3',
        style: {
          borderLeft: 'solid 3px green',
          borderRight: 'solid 3px green',
          borderBottom: 'solid 3px green',
          'vertical-align': 'top',
        },
      },
      //'c3',
      C: {
        value: 'c3',
        style: {
          borderLeft: 'solid 3px green',
          borderRight: 'solid 3px green',
          borderBottom: 'solid 3px green',
          'vertical-align': 'bottom',
        },
      },
      D: 'd3',
      row_style: {
        height: '60px',
      },
    },
    {
      A: 'a4',
      B: 'b4',
      C: 'c4',
      D: 'd4',
    },
    {
      A: 'a5',
      B: { value: 'b5', colspan: '2', rowspan: '3', style: { backgroundColor: 'lightyellow' } },
      C: 'c5',
      D: 'd5',
    },
    {
      A: 'a6',
      B: 'b6',
      C: 'c6',
      D: 'd6',
    },
    {
      A: 'a7',
      B: 'b7',
      C: 'c7',
      D: 'd7',
    },
    {
      A: 'a8',
      B: 'b8',
      C: 'c8',
      D: 'd8',
    },
    {
      A: 'a9',
      //B: 'b9',
      B: { value: 'b9', colspan: '2', style: { backgroundColor: 'lightblue' } },
      C: 'c9',
      D: 'd9',
    },
    {
      A: 'a10',
      B: 'b10',
      C: 'c10',
      D: 'd10',
    },
    {
      A: 'a11',
      //B: 'b11',
      B: { value: 'b11', rowspan: '3', style: { backgroundColor: 'lightgreen' } },
      C: 'c11',
      D: 'd11',
    },
    {
      A: 'a12',
      B: 'b12',
      C: 'c12',
      D: 'd12',
    },
    {
      A: 'a13',
      B: 'b13',
      C: 'c13',
      D: 'd13',
    },
    {
      A: 'a14',
      B: 'b14',
      C: 'c14',
      D: 'd14',
    },
  ];

  //let skipCellList = build_skipCellList(data4, columns4);

  return (
    <Table
      id={id}
      data={data4}
      columns={columns4}
      cellStyle={cellStyle_sy}
      enableScrollY={false}
      localStorageName={localStorageName}
      //skipCellList={skipCellList}
    />
  );
};
export default Case4;
