import { useState, useEffect } from 'react';

import { styled } from '@stitches/react';
import get from 'lodash.get';

import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

import { IColumnType } from './Table';

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
}: Props<T>): JSX.Element {
  if (skipCellList.length > 0) {
    //console.log(skipCellList);
  }
  const [contentEditable, setrCcontentEditable] = useState(edit);
  const data = get(item, column.key);
  let value = '';
  let cell_style = {};
  let colspan = false;
  let rowspan = false;
  let colspan_num = 0;
  let rowspan_num = 0;

  let graph = false;

  if (typeof data === 'string') {
    value = data;
  } else if (typeof data === 'object') {
    if (data.type) {
      value = data.type
      graph = true;
    } else if (data.value) {
      value = data.value;
    } else {
      value = 'N/A';
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
  }

  let row_style = {};
  if (item.row_style) {
    row_style = item.row_style;
  }

  const cellLine_style = cellLine? {} : {border: ""};

  const TableCell = styled('td', { ...default_style, ...style, ...row_style, ...cell_style , ...cellLine_style});

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
     {graph ?

<ResponsiveContainer width={"96%"} height={160} >
<LineChart  data={data__}>
  <Line type="monotone" dataKey="サイト訪問者数" />
  <CartesianGrid />
  <XAxis dataKey="day" />
  <YAxis />
</LineChart>
</ResponsiveContainer>
      :
         value
      }
    </TableCell>
  );
}
