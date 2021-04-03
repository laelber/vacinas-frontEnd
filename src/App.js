import { Router } from 'react-router-dom';

import Routes from './routes';
import history from './services/history';

import Default from './pages/Default'

function App() {
  return (
    <Router history={history}>
      <Default>
        <Routes />
      </Default>
    </Router>
  );
}

export default App;
