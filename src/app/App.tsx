import React from 'react';
import { Route } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { CreationPageComponent } from '@pages/CreationPage/CreationPageComponent';
import { FillingPageComponent } from '@pages/FillingPage/FillingPageComponent';
import { NavBar } from '@common/components/NavBar';


export const App = () => {
  return (
    <>
      <NavBar/>
      <Container>
        <Route exact path='/' component={CreationPageComponent} />
        <Route path='/filling' component={FillingPageComponent} />
      </Container>
    </>
  );
}