import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import PageSearch from './components/PageSearch';
import PageList from './components/PageList';
import PageListAdd from './components/PageListAdd';
import { StoreProvider } from './handlers/stores.js';

function App() {
  return (
    <StoreProvider>
      <Router>
          <Routes>
            <Route exact path="/" element={<PageList />} />
            <Route exact path="/search" element={<PageSearch />} />
            <Route exact path="/list" element={<PageList />} />
            <Route exact path="/list-add" element={<PageListAdd />} />
          </Routes>
      </Router>
    </StoreProvider>
  );
}

export default App;
