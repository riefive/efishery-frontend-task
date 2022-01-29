import StoreApi from './api_connector'
import { parsedArray } from './api_parser'

const endPoint = 'option_area'

export async function get(data) {
  if (!StoreApi) return null
  const params = {}
  if (!data?.limit) {
    params.limit = 50
  }
  if (data?.offset) {
    params.offset = data.offset || 1
  }
  return await StoreApi.read(endPoint, params).then((result) => parsedArray(result))
}
