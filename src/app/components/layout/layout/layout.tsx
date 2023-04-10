import { FunctionComponent } from 'react';
import { HashRouter, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '@store';
import { Header, Footer, Container, ToastContainer } from '@components';

export const Layout = () => (
  <Container>
    <Header />
    <main id='main'>
      <Outlet />
    </main>
    <Footer />
  </Container>
);

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) =>
  function withLayoutComponent(props: T): JSX.Element {
    return (
      <HashRouter>
        <Provider store={store}>
          <ToastContainer />
          <Component {...props} />
        </Provider>
      </HashRouter>
    );
  };
