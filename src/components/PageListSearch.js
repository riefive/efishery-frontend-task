import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import JsonToForm from 'json-reactform';
import { CashIcon, CalendarIcon, InformationCircleIcon, LocationMarkerIcon } from '@heroicons/react/outline';
import { Loading, Refreshing, NotFound } from './Support';
import { LayoutSelect } from '../handlers/middlewares';
import { StoreContext } from '../handlers/stores';
import { createForm, handleSubmit } from '../handlers/eventhandlers';

function PageSearch() {
  const navigate = useNavigate();
  const { Layout } = LayoutSelect()
  const [ state, dispatch ] = useContext(StoreContext)

  const type = 'search'
  const formConfigs = createForm(state, type)

  return (
    <Layout>
      <div id="search" className="w-11/12 mx-auto">
        { 
          (() => {
            const RefreshComponent = <Refreshing click={
                () => { 
                  dispatch({ type: 'SET_LISTS_FILTER', payload: [] })
                  dispatch({ type: 'SET_SEARCH_STATUS', payload: false })
                }
              } />

            if (state.loading) {
              return <Loading />
            } else if (!state.loading && state.listFilters?.length === 0) {
              if (state.searchStatus) {
                return ( 
                  <div>
                    <NotFound />
                    { RefreshComponent }
                  </div>
                )
              } else {
                return <JsonToForm model={formConfigs} onSubmit={(value) => handleSubmit(value, state, dispatch, navigate, type)}/>
              }
            } else {
              const lists = state.listFilters
              const ListComponents = [] 
              lists?.forEach((item, index) => { 
                const DateTime = !item.tglParsed ? null : 
                    <div className="flex">
                      <CalendarIcon className="w-5 h-5 text-orange-400 mr-[5px]" />
                      { item.tglParsed }
                    </div>
                const Marker = !item.areaKota ? null : 
                    <div className="flex">
                      <LocationMarkerIcon className="w-5 h-5 text-gray-700 mr-[5px]" />
                      { item.areaKota } - { item.areaProvinsi }
                    </div>
                ListComponents.push(
                  <div key={index} className="card w-full select-none shadow-md p-[20px] mb-[10px]">
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
                      { DateTime }
                    </div>
                  </div>
                )
              })
              return (
                <div>
                  { RefreshComponent }
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
