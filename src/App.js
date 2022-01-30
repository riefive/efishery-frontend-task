import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import './styles/style.scss';
import PageList from './components/PageList';
import PageListAdd from './components/PageListAdd';
import PageListEdit from './components/PageListEdit';
import PageListSearch from './components/PageListSearch';
import { StoreProvider } from './handlers/stores.js';

function App() {
  return (
    <StoreProvider>
      <Router>
          <Routes>
            <Route exact path="/" element={<PageList />} />
            <Route exact path="/search" element={<PageListSearch />} />
            <Route exact path="/list" element={<PageList />} />
            <Route exact path="/list-add" element={<PageListAdd />} />
            <Route exact path="/list-edit/:id" element={<PageListEdit />} />
          </Routes>
      </Router>
    </StoreProvider>
  );
}

export default App;
