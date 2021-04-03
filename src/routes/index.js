import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import Vacina from '../pages/Vacina';
import ListaVacinas from '../pages/ListaVacinas';

export default function Routes() {
  return (
    <Switch>
      <Redirect exact from="/" to="/vacinas/cadastrar" />

      <Route path="/vacinas/buscar" exact component={ListaVacinas}  />
      <Route path="/vacinas/cadastrar" exact component={Vacina}  />
      <Route path="/vacinas/editar/:id" exact component={Vacina}  />
      
    </Switch>
  );
}
