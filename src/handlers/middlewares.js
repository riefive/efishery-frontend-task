import { useEffect } from 'react';
import Breakpoint from '../components/Breakpoint';
import LayoutSmall from '../components/LayoutSmall';
import LayoutWide from '../components/LayoutWide';
import * as ApiList from '../services/service_list_api';
import * as ApiRegion from '../services/service_region_api';
import * as ApiSize from '../services/service_size_api';

async function fetchInit() {
  const regions = await ApiRegion.get();
  const sizes = await ApiSize.get();
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

export function LayoutSelect() {
  const point = Breakpoint();
  const Layout = ['xs', 'sm', 'md'].includes(point) ? LayoutSmall : LayoutWide;
  return Layout
}

export function Initialized(state, dispatch) {
  useEffect(() => {
    fetchInit().then(result => {
      if (state?.provinces && state.provinces.length === 0) {
        dispatch({ type: 'SET_PROVINCES', payload: result?.provinces })
      }
      if (state?.cities && state.cities.length === 0) {
        dispatch({ type: 'SET_CITIES', payload: result?.cities })
      }
      if (state?.sizes && state.sizes.length === 0) {
        dispatch({ type: 'SET_SIZES', payload: result?.sizes })
      }
    })
    fetchData().then(result => {
      if (state?.lists && state.lists.length === 0) {
        dispatch({ type: 'SET_LISTS', payload: result })
      }
    })
  }, [])
}
