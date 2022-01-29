import { useContext } from 'react';
import JsonToForm from 'json-reactform';
import { Loading, Refreshing } from './Support';
import { CashIcon, InformationCircleIcon, LocationMarkerIcon } from "@heroicons/react/outline";
import { LayoutSelect } from '../handlers/middlewares';
import { StoreContext } from '../handlers/stores';
import { createForm, handleSubmit } from '../handlers/eventhandlers';

function PageSearch() {
  const Layout = LayoutSelect()
  const [ state, dispatch ] = useContext(StoreContext)

  const type = 'search'
  const formConfigs = createForm(state, type)

  return (
    <Layout>
      <div id="search" className="w-11/12 mx-auto">
        { 
          (() => {
            if (state.loading) {
              return <Loading />
            } else if (!state.loading && state.listFilters?.length === 0) {
              return <JsonToForm model={formConfigs} onSubmit={(value) => handleSubmit(value, state, dispatch, type)}/>
            } else {
              const lists = state.listFilters
              const ListComponents = [] 
              lists?.forEach((item, index) => { 
                const Marker = !item.areaKota ? null : 
                    <div className="flex">
                      <LocationMarkerIcon className="w-5 h-5 text-gray-700 mr-[5px]" />
                      { item.areaKota } - { item.areaProvinsi }
                    </div>
                ListComponents.push(
                  <div key={index} className="card w-full select-none mb-[10px]">
                    <div className="flex flex-col capitalize">
                      { (index+1) }. { item.komoditas || 'Tidak Ada Nama' }
                      <div className="flex">
                        <CashIcon className="w-5 h-5 text-green-300 mr-[5px]" />
                        Rp. { item.price || 0 }
                      </div>
                      <div className="flex">
                        <InformationCircleIcon className="w-5 h-5 text-blue-300 mr-[5px]" />
                        { item.size || 0 }
                      </div>
                      { Marker }
                    </div>
                  </div>
                )
              })
              return (
                <div>
                  <Refreshing click={() => { dispatch({ type: 'SET_LISTS_FILTER', payload: [] }) }} />
                  <div className="text-md font-medium capitalize mt-[10px] mb-[5px]">
                    ditemukan sebanyak { lists.length } data.
                  </div>
                  <div className="my-[10px]">
                    { ListComponents }
                  </div>
                  <div className="h-[100px]" />
                </div>
              )
            }
          })()
        }
      </div>
    </Layout>
  )
}

export default PageSearch
