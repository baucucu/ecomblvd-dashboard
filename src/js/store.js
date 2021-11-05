
import { createStore } from 'framework7/lite';
import {f7} from 'framework7-react';
import * as Realm from "realm-web";
const app = new Realm.App({ id: "invoices-njwds" });

const store = createStore({
  state: {
    user: app.currentUser,
    invoices: []
  },
  getters: {
    user({ state }) {
      return state.user;
    }, 
    invoices({state}) {
      return state.invoices
    }
  },
  actions: {
    getInvoices({state}, user){
      // f7.dialog.preloader()
      if(user !==null) {
        const mongodb = user.mongoClient("mongodb-atlas");
        const invoicesCollection = mongodb.db("EcomBlvd").collection("Invoices");
        invoicesCollection.find()
        .then(invoices=> {
          state.invoices = [...invoices];
        })
      }
    },
    setUser({ state }, user) {
      state.user = user
    },
    login({state, dispatch},{email, password}) {
      async function loginEmailPassword(email, password) {
        f7.dialog.preloader()
        const credentials = Realm.Credentials.emailPassword(email, password);
        
        app.logIn(credentials).then(dbUser => {
          dispatch('setUser', dbUser)
          dispatch('getProjects', dbUser)
          f7.dialog.close()
          f7.emit('loggedIn')
        })
        .catch((err) => {
          console.error("Failed to log in", err);
          f7.emit('loginError', err)
          f7.dialog.close()
        })
      }
      loginEmailPassword(email,password)
      .then(user => state.user = user)
    },
    logout({state, dispatch}) {
      const logOutUser = async () => {
        return await app.currentUser.logOut()
      }
      // console.log('logout dispatched: ', app)
      f7.dialog.preloader()
      logOutUser()
      .then(() => {
        // console.log("log out successful")
        dispatch('setUser', null)
        f7.dialog.close()
        f7.emit('loggedOut')
      })
      .catch(error=> {
        console.log("log out error: ", error)
      })
    },
  },
})
export default store;
