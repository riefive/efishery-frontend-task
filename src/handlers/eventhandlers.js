import { v4 as uuidv4 } from 'uuid';
import * as ApiList from '../services/service_list_api';

function createForm(state, type = 'search') {
  const required = type !== 'search'
  const formConfigs = {
    'Nama Komoditas': {
      type: 'text',
      placeholder: 'Silahkan isi nama komoditas',
      required
    },
    'Provinsi': {
      type: 'text',
      placeholder: 'Silahkan isi provinsi',
      required
    },
    'Kota': {
      type: 'text',
      placeholder: 'Silahkan isi kota',
      required
    },
    'Ukuran': {
      type: 'text',
      placeholder: 'Silahkan isi ukuran',
      required
    },
    'Harga': {
      type: 'currency',
      placeholder: 'Silahkan isi harga',
      required
    }
  }

  if (type === 'save') {
    formConfigs['Simpan'] = { type: 'submit' }
  } else if (type === 'edit') {
    formConfigs['Ubah'] = { type: 'submit' }
  } else {
    formConfigs['Pencarian'] = { type: 'submit' }
  }

  if (state?.sizes && state.sizes?.length > 0) {
    formConfigs['Ukuran'] = { type: 'select', placeholder: 'Pilih ukuran', options: state.sizes?.map(item => ({ value: Number(item.size || 0), label: item.size || '0' })) }
  }
  if (state?.provinces && state.provinces?.length > 0) {
    formConfigs['Provinsi'] = { type: 'select', placeholder: 'Pilih provinsi', options: state.provinces?.map(item => ({ value: item, label: item })) }
  }
  if (state?.cities && state.cities?.length > 0) {
    formConfigs['Kota'] = { type: 'select', placeholder: 'Pilih kota', options: state.cities?.map(item => ({ value: item, label: item })) }
  }
  if (state?.listCurrent && Object.keys(state.listCurrent).length > 0) {
    const current = state.listCurrent
    formConfigs['Nama Komoditas'].defaultValue = current?.komoditas || null
    formConfigs['Provinsi'].defaultValue = current?.areaProvinsi || null
    formConfigs['Kota'].defaultValue = current?.areaKota || null
    formConfigs['Ukuran'].defaultValue = current?.size || null
    formConfigs['Harga'].defaultValue = current?.price || null
  }

  return formConfigs
}

async function handleSubmit(payloads, state, dispatch, type) {
  const object = {}
  const params = { limit: 50 }
  for (const key in payloads) {
    const element = payloads[key];
    if (element) {
      if (key === 'Nama Komoditas') {
        object.name = element
      } else if (key === 'Provinsi') {
        object.province = element?.value ? element.value : (element !== '' ? element : null)
      } else if (key === 'Kota') {
        object.city = element?.value ? element.value : (element !== '' ? element : null)
      } else if (key === 'Ukuran') {
        object.size = element?.value ? element.value : (element !== '' ? element : null)
      } else if (key === 'Harga') {
        object.price = element.toString().replace(/\\,/g, '')
      }
    }
  }
  
  if (type === 'search') {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'SET_SEARCH_STATUS', payload: true })
    const lists = await ApiList.get(Object.assign(params, { search: object }))
    dispatch({ type: 'SET_LISTS_FILTER', payload: lists })
    dispatch({ type: 'SET_LOADING', payload: false })
  } else if (type === 'save') {
    dispatch({ type: 'SET_LOADING', payload: true })
    const objectNew = Object.assign({ id: uuidv4() }, object)
    await ApiList.add(objectNew)
    dispatch({ type: 'SET_LOADING', payload: false })
    await new Promise((resolve) => setTimeout(resolve, 100))
    window.location.href = '/'
  } else if (type === 'edit') {
    dispatch({ type: 'SET_LOADING', payload: true })
    await ApiList.update(state?.listCurrent?.uuid || null, object)
    dispatch({ type: 'SET_LOADING', payload: false })
    await new Promise((resolve) => setTimeout(resolve, 100))
    window.location.href = '/'
  }
}

async function foundById(id) {
  const lists = await ApiList.get({ limit: 1, search: { id } })
  return Array.isArray(lists) && lists.length > 0 ? lists[0] : null
}

export {
  createForm,
  foundById,
  handleSubmit
}
