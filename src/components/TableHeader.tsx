import { styled } from '@stitches/react';

import { IColumnType } from './Table';

interface Props<T> {
  columns: IColumnType<T>[];
}

const default_style = {
  height: '30px',
  padding: 0,

  fontSize: 14,
  fontWeight: 500,
  //fontFamily: 'sams-serif',
  //fontFamily: 'monospace',
  fontFamily: 'Inter',

  verticalAlign: 'middle',

  //textAlign: "left",
  textAlign: 'center',

  borderLeft: 'solid gray 1px',
  borderRight: 'solid gray 1px',
  //backgroundColor: "#e0e0e0",
  backgroundColor: '#cce5ff',
  //boxShadow: "inset 0 -0.7px 0 gray",  //OK
};

const default_style_button = {
  backgroundImage:
    'linear-gradient(  to left top, transparent calc(50% - 0.5px), gray 50%, gray calc(50% + 0.5px), transparent calc(50% + 1px));',
  backgroundRepeat: ' no-repeat;',
  //backgroundColor: "#e0e0e0",
  backgroundColor: '#cce5ff',
};

const check_fixed__style = {
  //position: 'sticky',
  left: -1,
  zIndex: 9999,
  borderLeft: 'solid 1px gray',
  borderRight: 'solid 1px gray',
};

const button_fixed__style = {
  //position: 'sticky',
  right: 0,
  zIndex: 9999,
  borderLeft: 'solid 1px gray',
  borderRight: 'solid 1px gray',
};

export function TableHeader<T>({ columns, rowEdit = true, style = {}, checkCol = false }: Props<T>): JSX.Element {
  const TableHeaderCell = styled('th', { ...default_style, ...style });
  const TableHeaderCheck = styled('th', { ...default_style_button, ...style, ...check_fixed__style });
  const TableHeaderButton = styled('th', { ...default_style_button, ...style, ...button_fixed__style });
  //const TableHeaderCell = styled('th', { ...default_style,  });
  //const TableHeaderCheck = styled('th', { ...default_style_button,  ...check_fixed__style });
  //const TableHeaderButton = styled('th', { ...default_style_button,  ...button_fixed__style });

  //const TableHeaderCell = styled('th', { ...default_style,  });
  //const TableHeaderCheck = styled('th', { ...default_style_button, ...style,  });
  //const TableHeaderButton = styled('th', { ...default_style_button, ...style,  });
  /*
  const ResizeY = styled('div', 
	      { 
	         position: "absolute", 
	         top: 0,
	         left: 0, 
	         width: "7px",
	         height: "102%", 
	         background: "transparent", 
	         cursor: "col-resize",

             });
	    */
  return (
    <tr>
      {checkCol && <TableHeaderCheck id='thc'></TableHeaderCheck>}
      {columns.map((column, columnIndex) => (
        <TableHeaderCell key={`table-head-cell-${columnIndex}`} style={{ width: column.width }}>
          {column.title}
        </TableHeaderCell>
      ))}
      {rowEdit ? <TableHeaderButton></TableHeaderButton> : <TableHeaderButton></TableHeaderButton>}
    </tr>
  );
}
