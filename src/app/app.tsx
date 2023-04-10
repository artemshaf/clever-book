import { AppRouter, withLayout } from './components';

const App = () => <AppRouter />;

export const AppWithLayout = withLayout(App);
