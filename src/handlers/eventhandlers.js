import * as ApiList from '../services/service_list_api.js';

function createForm(state, type = 'search') {
  const formConfigs = {
    "Nama Komoditas": {
      type: 'text',
      placeholder: "Silahkan isi nama komoditas",
      required: false
    },
    "Provinsi": {
      type: 'text',
      placeholder: "Silahkan isi provinsi",
      required: false
    },
    "Kota": {
      type: 'text',
      placeholder: "Silahkan isi kota",
      required: false
    },
    "Ukuran": {
      type: 'text',
      placeholder: "Silahkan isi ukuran",
      required: false
    },
    "Harga": {
      type: 'number',
      placeholder: "Silahkan isi harga",
      required: false
    }
  }

  if (type === 'save') {
    formConfigs['Simpan'] = { type: 'submit' }
  } else if (type === 'edit') {
    formConfigs['Ubah'] = { type: 'submit' }
  } else {
    formConfigs['Pencarian'] = { type: 'submit' }
  }

  if (state?.sizes && state.sizes.length > 0) {
    formConfigs['Ukuran'] = { type: 'select', placeholder: 'Pilih ukuran', options: state.sizes?.map(item => ({ value: Number(item.size || 0), label: item.size || '0' })) }
  }
  if (state?.provinces && state.provinces.length > 0) {
    formConfigs['Provinsi'] = { type: 'select', placeholder: 'Pilih provinsi', options: state.provinces?.map(item => ({ value: item, label: item })) }
  }
  if (state?.cities && state.cities.length > 0) {
    formConfigs['Kota'] = { type: 'select', placeholder: 'Pilih kota', options: state.cities?.map(item => ({ value: item, label: item })) }
  }

  return formConfigs
}

async function handleSubmit(payloads, dispatch, type) {
  const search = {}
  const params = { limit: 15 }
  for (const key in payloads) {
    const element = payloads[key];
    if (element) {
      if (key === 'Nama Komoditas') {
        search.name = element
      } else if (key === 'Provinsi' && element?.value) {
        search.province = element.value
      } else if (key === 'Kota' && element?.value) {
        search.city = element.value
      } else if (key === 'Ukuran' && element?.value) {
        search.size = element.value
      } else if (key === 'Harga') {
        search.price = element
      }
    }
  }
  
  if (type === 'search') {
    dispatch({ type: 'SET_LOADING', payload: true })
    const lists = await ApiList.get(Object.assign(params, { search }))
    dispatch({ type: 'SET_LISTS_FILTER', payload: lists })
    dispatch({ type: 'SET_LOADING', payload: false })
  }
}

export {
  createForm,
  handleSubmit
}
