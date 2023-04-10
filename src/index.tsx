import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { AppWithLayout } from './app/app';
import { Loader } from './app/components';

import './app/styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // <StrictMode>
  <Suspense fallback={<Loader />}>
    <AppWithLayout />
  </Suspense>
  // </StrictMode>
);
