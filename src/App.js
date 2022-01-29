import React, { useEffect, useReducer } from 'react';
import './styles/index.css';
import * as ApiList from './services/service_list_api.js';
import * as ApiRegion from './services/service_region_api.js';
import * as ApiSize from './services/service_size_api.js';
import * as StoreList from './stores/store_pricelist.js';
import * as StoreRegion from './stores/store_region.js';
import * as StoreSize from './stores/store_size.js';

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

  if (Array.isArray(listState) && listState.length > 0) {
    console.log(listState)
  }
  if (Array.isArray(regionState) && regionState.length > 0) {
    console.log(regionState)
  }
  if (Array.isArray(sizeState) && sizeState.length > 0) {
    console.log(sizeState)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>
  );
}

export default App;
