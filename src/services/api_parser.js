import { camelize } from '../helpers/words';

function mapper(data) {
  const item = {}
  for (const key in data) {
    const element = data[key]
    if (element && typeof element === 'object') {
      if (Array.isArray(element)) {
        item[camelize(key)] = element?.length > 0 ? element?.map((value) => mapper(value)) : []
      } else {
        const subItem = {}
        for (const subKey in element) {
          const subElement = element[subKey]
          subItem[camelize(subKey)] = subElement
        }
        item[camelize(key)] = subItem
      }
    } else {
      item[camelize(key)] = element
    }
  }
  return item
}

export function parsedArray(data) {
  const sources = Array.isArray(data) && data.length > 0 ? data : []
  const parsed = []
  sources?.forEach((element) => {
    parsed.push(mapper(element))
  })
  return parsed
}

export function parsedObject(data) {
  const parsed = typeof data !== 'object' ? data : mapper(data)
  return parsed
}
