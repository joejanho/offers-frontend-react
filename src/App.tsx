/* eslint-disable require-jsdoc */
import React from 'react';
import '@fontsource/roboto';
import {Container} from '@material-ui/core';
import AppBarComponent from './components/appbar.component';
import OffersListComponent from './components/offerslist.component';
import AdsListComponent from './components/adslist.component';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
function App() {
  return (
    <Container maxWidth="lg">
      Welcome
      <BrowserRouter>
        <AppBarComponent></AppBarComponent>
        <Switch>
          <Route path="/offers" component={OffersListComponent}/>
          <Route path="/ads" component={AdsListComponent} />
        </Switch>
      </BrowserRouter>
    </Container>

  );
}

export default App;
