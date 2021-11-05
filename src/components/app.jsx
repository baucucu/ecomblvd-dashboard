import React, { useState, useEffect } from 'react';
// test

import {
  f7,
  f7ready,
  App,
  Panel,
  View,
  Icon,
  Popup,
  Page,
  Navbar,
  NavRight,
  Link,
  Block,
  Button,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter,
  useStore
} from 'framework7-react';

import routes from '../js/routes';
import store from '../js/store';

const MyApp = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState()
  const [loginScreenOpened,setLoginScreenOpened] = useState(!store.getters.user.value)
  
  // Framework7 Parameters
  const f7params = {
    name: 'Invoices App', // App name
      theme: 'aurora', // Automatic theme detection

      // App store
      store: store,
      // App routes
      routes: routes,
  };

  useEffect(() => {
    f7.on('loggedIn', () => {setLoginScreenOpened(false); setLoginError()}) 
    f7.on('loggedOut', () => setLoginScreenOpened(true)) 
    f7.on('loginError', (err) => {console.log("login error: ", err.error);setLoginError(err.error)})
  })

  f7ready(() => {


    // Call F7 APIs here
  });

  return (
    <App { ...f7params } themeDark>

        {/* Left panel with cover effect*/}
        <Panel left cover themeDark>
          <View>
            <Page>
              <Navbar title="Left Panel"/>
              <Block>Left panel content goes here</Block>
            </Page>
          </View>
        </Panel>


        {/* Right panel with reveal effect*/}
        <Panel right reveal themeDark>
          <View>
            <Page>
              <Navbar title="Right Panel"/>
              <Block>Right panel content goes here</Block>
            </Page>
          </View>
        </Panel>


        {/* Your main view, should have "view-main" class */}
        <View main className="safe-areas" url="/invoices/" />

      {/* Popup */}
      <Popup id="my-popup">
        <View>
          <Page>
            <Navbar title="Popup">
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <Block>
              <p>Popup content goes here.</p>
            </Block>
          </Page>
        </View>
      </Popup>

      <LoginScreen id="my-login-screen" opened={loginScreenOpened}>
        <View>
          <Page loginScreen>
            <LoginScreenTitle>Login</LoginScreenTitle>
            <List form>
              <ListInput
                type="text"
                name="email"
                placeholder="Your email"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
              ></ListInput>
              <ListInput
                type="password"
                name="password"
                placeholder="Your password"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              ></ListInput>
            </List>
            <List>
              <ListButton title="Sign In" onClick={() => {store.dispatch('login',{email,password})}} />
              <BlockFooter>
                {loginError && String(loginError)}
              </BlockFooter>
            </List>
          </Page>
        </View>
      </LoginScreen>
    </App>
  )
}
export default MyApp;