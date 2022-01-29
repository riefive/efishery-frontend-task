import StoreApi from './api_connector'
import { parsedArray, parsedObject } from './api_parser'

const endPoint = 'list'

function mapperToServer(data, isSave = false) {
  const maps = {
    uuid: data?.id || null,
    komoditas: data?.name || null,
    area_provinsi: data?.province || null,
    area_kota: data?.city || null,
    size: data?.size || 0,
    price: data?.price || 0
  }
  if (isSave) {
    const dateCurrent = new Date()
    Object.assign(maps, { tgl_parsed: dateCurrent.toISOString(), timestamp: dateCurrent.getTime() })
  } else {
    delete maps.uuid
  }
  return maps
}

export async function add(data) {
  if (!StoreApi) return null
  const params = mapperToServer(data, true)
  return await StoreApi.append(endPoint, [params]).then((result) => parsedObject(result))
}

export async function update(id, data) {
  if (!StoreApi) return null
  const params = mapperToServer(data)
  return await StoreApi.edit(endPoint, { search: { uuid: id }, set: params }).then((result) => parsedObject(result))
}

export async function remove(id) {
  if (!StoreApi) return null
  return await StoreApi.delete(endPoint, { search: { uuid: id } }).then((result) => parsedObject(result))
}

export async function get(data) {
  if (!StoreApi) return null
  const params = {}
  if (!data?.limit) {
    params.limit = 15
  } else {
    params.limit = data.limit
  }
  if (data?.offset) {
    params.offset = data.offset || 1
  }
  if (data?.search) {
    const details = {}
    const search = data.search
    if (search?.id) {
      Object.assign(details, { uuid: search.id?.toString() })
    } 
    if (search?.name) {
      Object.assign(details, { komoditas: search.name?.toString() })
    } 
    if (search?.size) {
      Object.assign(details, { size: search.size?.toString() })
    }
    if (search?.price) {
      Object.assign(details, { price: search.price?.toString() })
    }
    if (search?.city) {
      Object.assign(details, { area_kota: search.city?.toString() })
    }
    if (search?.province) {
      Object.assign(details, { area_provinsi: search.province?.toString() })
    }
    params.search = details
  }
  return await StoreApi.read(endPoint, params).then((result) => parsedArray(result))
}
