import React, {useEffect} from 'react';
import { Page, Navbar, NavRight, Link , Block, BlockTitle, useStore } from 'framework7-react';
import * as Realm from "realm-web";
import store from '../js/store';

const app = new Realm.App({ id: "invoices-njwds" });

const InvoicesPage = () => {
  
  const invoices = useStore('invoices')
  const user = useStore('user')

  async function watchInvoices(store, invoices) {
    if (user!==null) {
      const mongodb = user.mongoClient("mongodb-atlas");
      const invoicesCollection = mongodb.db("EcomBlvd").collection("Invoices");
      for await (const change of invoicesCollection.watch({
        // filter : {
        //   operationType: "update"
        // }
      })) {
        const { documentKey, fullDocument } = change;
        console.log(`updated document - store.js : ${documentKey}`, fullDocument);
        store.dispatch('getInvoices', store.state.user).catch(err => console.log("setInvoices error: " + err))
      }
    }
  }

  useEffect(() => {store.dispatch('getInvoices',user)}, [])
  useEffect(() => {watchInvoices(store,invoices)}, [])

  return (
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
    </Page>
)};

export default InvoicesPage;