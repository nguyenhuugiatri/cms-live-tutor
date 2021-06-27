import AppLayout from 'app/containers/AppLayout';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GlobalStyle } from 'styles/globalStyles';
import 'styles/core.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - LT" defaultTitle="Live Tutor Admin">
        <meta
          name="description"
          content="CMS of Live online tutoring platform"
        />
        <meta property="og:url" content="https://admin.livetutor.live/" />
        <meta
          property="og:image"
          content="https://admin.livetutor.live/logo192.png"
        />
        <meta
          property="og:description"
          content="CMS of Live online tutoring platform"
        />
      </Helmet>
      <Switch>
        <Route component={AppLayout} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
};
