import React from 'react';
import { observer } from 'mobx-react-lite';
import { Route } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { CreationComponent } from './pages/CreationPage/CreationComponent';
import { FillingComponent } from './pages/FillingPage/FillingComponent';
import { NavBar } from './common/components/NavBar';


export const App = observer(() => {
  return (
    <>
      <NavBar/>
      <Container>
        <Route exact path='/' component={CreationComponent} />
        <Route path='/filling' component={FillingComponent} />
      </Container>
    </>
  );
});