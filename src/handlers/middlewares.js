import Breakpoint from '../components/Breakpoint';
import LayoutSmall from '../components/LayoutSmall';
import LayoutWide from '../components/LayoutWide';
import * as ApiList from '../services/service_list_api';
import * as ApiRegion from '../services/service_region_api';
import * as ApiSize from '../services/service_size_api';

export async function fetchInit() {
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

export async function fetchData(state) {
  const object = state?.params || null
  const lists = await ApiList.get(object ? { search: object } : {})
  return Array.isArray(lists) ? lists : []
}

export function LayoutSelect() {
  const point = Breakpoint();
  const Layout = ['xs', 'sm', 'md'].includes(point) ? LayoutSmall : LayoutWide;
  return { point, Layout }
}
