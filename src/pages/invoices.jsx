import React from 'react';
import { Page, Navbar, NavRight, Link , Block, BlockTitle } from 'framework7-react';
import { DataGrid } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

const InvoicesPage = () => (
  <Page>
    <Navbar title="Invoices">
      <NavRight>
        <Link icon="upload_circle_fill  " panelOpen="right">Import invoices</Link>
      </NavRight>
    </Navbar>
    <BlockTitle>Invoices</BlockTitle>
    <Block strong>
      <p>Fugiat perspiciatis excepturi, soluta quod non ullam deleniti. Nobis sint nemo consequuntur, fugiat. Eius perferendis animi autem incidunt vel quod tenetur nostrum, voluptate omnis quasi quidem illum consequuntur, a, quisquam.</p>
      <p>Laudantium neque magnam vitae nemo quam commodi, in cum dolore obcaecati laborum, excepturi harum, optio qui, consequuntur? Obcaecati dolor sequi nesciunt culpa quia perspiciatis, reiciendis ex debitis, ut tenetur alias.</p>
    </Block>
    <Block strong>
      {/* <FlexLayoutGrid/> */}
    </Block>
  </Page>
);

export default InvoicesPage;


function FlexLayoutGrid() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 5,
    maxColumns: 6,
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid {...data} />
        </div>
      </div>
    </div>
  );
}