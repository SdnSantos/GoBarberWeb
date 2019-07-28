import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const signed = false;

  // caso não esteja logado e a rota é privada
  // redireciona para a tela de login
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  // caso esteja logado e a rota não for privada
  // redireciona para uma tela diferente da de login
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  // caso esteja logado e acessando uma rota privada
  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.default = {
  isPrivate: false,
};
