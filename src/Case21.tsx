import { Table, loadTableData, IColumnType } from './components';
import { useState, useEffect } from 'react';

const Case21 = (props) => {
  const id = 'ASTable21';
  const localStorageName = 'table_data21';
  //const [ value, setValue ] = useState(true);

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
      fullName: 'Francisco GUSA2',
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
      fullName: '### type html',
      role: '',
      tags: '',
    },
    {
      fullName: '',
      role: '',
      tags: '',
    },
    {
      fullName: '',
      role: '',
      tags: '',
    },
    {
      fullName: '### type embed',
      role: '',
      tags: '',
    },
    {
      fullName: '',
      role: '',
      tags: '',
    },
    {
      fullName: '',
      role: '',
      tags: '',
    },
  ];

  function onClick1() {
    console.log(props.name + ' ' + 'OK App 1');
    alert(props.name + ' ' + 'OK App 1');
  }

  function onClick2() {
    console.log('OK App 2');
    alert('OK App 2');
  }

  function onClick3() {
    console.log('OK App 3');
    alert('Embed OK App 3');
  }
  function checked(v) {
    console.log('checked', v);
    alert('checked:' + v);
  }

  function build_checkbox() {
    return (
      <>
        <label>check:</label>
        <input type='checkbox' onChange={(e) => checked(e.target.checked)} />
      </>
    );
  }

  function Checkbox(data) {
    const checked_ = (c) => {
      console.log('checked', c);
      data.cv = c;
    };
    //<input type="checkbox"  checked={data.cv} onChange={e => checked_(e.target.checked)} />
    return (
      <>
        <label>check:</label>
        <input type='checkbox' defaultChecked={data.cv} onChange={(e) => checked_(e.target.checked)} />
      </>
    );
  }

  function build_button() {
    return <button onClick={onClick3}> Button </button>;
  }

  function change_fruit(v) {
    //setFruit(v);
    //setKey(!key);
    console.log('select change:', v);
  }

  function SelectMenu(data) {
    const change_ = (c) => {
      console.log('change', c);
      data.cv = c;
    };

    return (
      <div>
        <select defaultValue={data.cv} onChange={(e) => change_(e.target.value)}>
          <option value='apple'>りんご</option>
          <option value='orange'>みかん</option>
          <option value='banana'>バナナ</option>
        </select>
      </div>
    );
  }

  const select_menu = () => {
    let value = 'apple';
    const change = (c) => {
      console.log('select change', c);
      value = c;
      console.log('getValue', data_c.tags.getValue());
    };
    const getValue = () => {
      return value;
    };
    const element = () => {
      return (
        <>
          <select onChange={(e) => change(e.target.value)}>
            <option value='apple'>りんご</option>
            <option value='orange'>みかん</option>
            <option value='banana'>バナナ</option>
          </select>
        </>
      );
    };
    return {
      type: 'embed',
      element: element(),
      getValue: getValue,
      name: 'selectmenu',
    };
  };

  //const [ value, setValue ] = useState(true);
  const checkbox = () => {
    //let value = false;
    const [value, setValue] = useState(false);

    const checked_ = (e) => {
      //function checked (c)  {
      console.log('checked', e.target.checked);
      //value = e.target.checked;
      setValue(e.target.checked);
      //console.log(value);
      //console.log("getValue", data_c.fullName.getValue())
    };
    const getValue = () => {
      return value;
    };
    /*
        <input type="checkbox" defaultChecked={value}  onChange={checked_} />
        <input type="checkbox" checked={value}  onChange={checked_} />
   */
    const element = () => {
      return (
        <>
          <label>check:</label>
          <input type='checkbox' defaultChecked={value} onChange={checked_} />
        </>
      );
    };
    return {
      type: 'embed',
      element: element(),
      getValue: getValue,
      name: 'checkbox',
    };
  };

  const data_a = {
    fullName: { type: 'html', value: 'checkbox', label: "html", cv: false },
    role: { type: 'html', value: 'button', label: 'NEW1', handler: onClick1 },
    tags: { type: 'html', value: 'radio', cv: 'huey', name:'droen' ,label:"radio sel", 
	        menu: ['huey', 'dewey', 'louie'] },
  };

  const data_b = {
    //fullName: { type: 'embed', element: build_checkbox(),  name: 'embed_checkbox' },
    fullName: { type: 'embed', element: Checkbox, name: 'embed_checkbox' },
    role: { type: 'embed', element: Checkbox, cv: true, name: 'embed_checkbox' },
    //role: "OK",
    tags: 'OK',
  };
  const data_c = {
    fullName: { type: 'embed', element: SelectMenu, cv: 'apple', name: 'embed_selectmenu' },
    role: { type: 'embed', element: SelectMenu, cv: 'banana', name: 'embed_selectmenu' },
    tags: { type: 'embed', element: SelectMenu, cv: 'orange', name: 'embed_selectmenu' },
  };
  /*
  const data_b = {
    fullName: { type: 'embed', element: build_checkbox(),  name: 'embed_checkbox' },
    //fullName: { type: 'embed', element: Checkbox(),  name: 'embed_checkbox' },
    role: { type: 'embed', element: build_button(), name: 'embed_test' },
    tags: { type: 'embed', element: SelectMenu(), name: 'embed_select_menu' },
  };
  const data_b = {
    fullName: { type: 'embed', element: build_checkbox(),  name: 'embed_checkbox' },
    //fullName: { type: 'embed', element: Checkbox(),  name: 'embed_checkbox' },
    role: { type: 'embed', element: build_button(), name: 'embed_test' },
    tags: { type: 'embed', element: SelectMenu(), name: 'embed_select_menu' },
  };
  const data_c = {
    fullName: checkbox(),
    role: { type: 'embed', element: build_button(), name: 'embed_test' },
    tags: select_menu(),
  };
  */

  data[3] = data_a;
  data[6] = data_b;
  data[7] = data_c;

  let data_ = loadTableData(localStorageName);
  if (data_ == null) {
    data_ = data;
  }

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
  return (
    <>
      <Checkbox />
      <Table
        id={id}
        data={data_}
        columns={columns}
        localStorageName={localStorageName}
        rowStyle={rowStyle}
        headerStyle={headerStyle}
        chenckColEnable={true}
        enableScrollY={false}
      />
    </>
  );
};
export default Case21;
