import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import PageSearch from './components/PageSearch';
import PageList from './components/PageList';
import { Initialized, LayoutSelect } from './handlers/middlewares';
import { StoreProvider, StoreContext } from './handlers/stores.js';

function HomePage() {
  const Layout = LayoutSelect()
  const [ state, dispatch ] = useContext(StoreContext)
  Initialized(state, dispatch)

  return (
    <Layout></Layout>
  )
}

function App() {
  return (
    <StoreProvider>
      <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/search" element={<PageSearch />} />
            <Route exact path="/list" element={<PageList />} />
          </Routes>
      </Router>
    </StoreProvider>
  );
}

export default App;
