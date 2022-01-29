import React, { useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import LayoutWide from './components/LayoutWide'
import * as ApiList from './services/service_list_api.js';
import * as ApiRegion from './services/service_region_api.js';
import * as ApiSize from './services/service_size_api.js';
import * as StoreList from './stores/store_pricelist.js';
import * as StoreRegion from './stores/store_region.js';
import * as StoreSize from './stores/store_size.js';
import Breakpoint from './components/Breakpoint';

function HomePage() {
  return (
    <div>
      <h1>Welcome Page</h1>
    </div>
  )
}

function App() {
  const [listState, listDispatch] = useReducer(StoreList.reducer, StoreList.initialState)
  const [regionState, regionDispatch] = useReducer(StoreRegion.reducer, StoreRegion.initialState)
  const [sizeState, sizeDispatch] = useReducer(StoreSize.reducer, StoreSize.initialState)

  useEffect(() => {
    async function fetchInit() {
      const regions = await ApiRegion.get()
      const sizes = await ApiSize.get()
      const provinces = [], cities = [];
      if (Array.isArray(regions)) {
        regions.forEach((item) => { 
          if (item?.province) {
            const idx = provinces.findIndex(v => v === item.province)
            if (idx === -1) provinces.push(item.province)
          }
          if (item?.city) {
            cities.push(item.city)
          }
        })
      }
      return { provinces, cities, sizes: Array.isArray(sizes) ? sizes : [] }
    }

    async function fetchData() {
      const lists = await ApiList.get()
      return Array.isArray(lists) ? lists : []
    }

    fetchInit().then(result => {
      regionDispatch({ type: 'SET_PROVINCES', payload: result?.provinces })
      regionDispatch({ type: 'SET_CITIES', payload: result?.cities })
      sizeDispatch({ type: 'SET_SIZES', payload: result?.sizes })
    })

    fetchData().then(result => {
      listDispatch({ type: 'SET_PRICES', payload: result })
    })
  }, [])

  console.log(listState)
  console.log(regionState)
  console.log(sizeState)
  const point = Breakpoint();
  console.log(point)

  return (
    <LayoutWide>
    <Router>
        <Routes>
          <Route exact path="/">
            { HomePage }
          </Route>
        </Routes>
    </Router>
    </LayoutWide>
  );
}

export default App;
