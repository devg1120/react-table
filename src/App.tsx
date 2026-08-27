import '@fontsource/anek-telugu';
import { styled } from '@stitches/react';
import { useState, useEffect } from 'react';

import { Table, loadTableData, IColumnType } from './components';
import * as LocalEx from '../rechart/local';

import TestCase from './TestCase';
import Case1  from './Case1';
import Case2  from './Case2';
import Case21 from './Case21';
import Case3  from './Case3';
import Case4  from './Case4';
import Case5  from './Case5';
import Case6  from './Case6';
import Case7  from './Case7';
import Case8  from './Case8';

/*
interface IData {
  fullName: string;
  role: string;
  tags: string[];
}
*/
//----------------------------------------------------------

const Session = styled('div', {
   marginLeft: '40px',
   marginBottom: '50px',
});

const test_session = false;
//const test_session = true;

//const general_session = false;
const general_session = true;

//----------------------------------------------------------

export const App = () => {
   return (
      <>
         {test_session && (
            <>
               <h2> TEST CASE </h2>
               <Session>
                  <TestCase name='TEST' />
               </Session>
            </>
         )}

         {general_session && (
	 <>
         <h2> TABLE 1 </h2>
         <Session>
            <Case1 name='CASE 1' />
         </Session>

         <h2> TABLE 2 </h2>
         <Session>
            <Case2 name='CASE 2' />
         </Session>

         <h2> TABLE 21 </h2>
         <Session>
            <Case21 name='CASE 21' />
         </Session>

         <h2> TABLE 3 not storage</h2>
         <Session>
            <Case3 name='CASE 3' />
         </Session>

         <h2> TABLE 4 call data styles</h2>
         <Session>
            <Case4 name='CASE 4' />
         </Session>

         <h2> TABLE 5 scroll-y</h2>
         <Session>
            <Case5 name='CASE 5' />
         </Session>

         <h2> TABLE 6 scroll-yx</h2>
         <Session>
            <Case6 name='CASE 6' />
         </Session>

         <h2> TABLE 7 reChart1</h2>
         <Session>
            <Case7 name='CASE 7' />
         </Session>

         <h2> TABLE 8 reChart2</h2>
         <Session>
            <Case8 name='CASE 8' />
         </Session>
	 </>
	 )}
      </>
   );
};
