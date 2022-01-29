import StoreApi from './api_connector'

StoreApi
  .read("list", { limit: 10, offset: 1, search: { komoditas: "Ikan Paus" } })
  .then(data => {
    console.log(data);
  });