import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JsonToForm from 'json-reactform';
import { ChevronLeftIcon, ChevronRightIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { Loading, Refreshing, NotFound } from './Support';
import { tableColumns } from '../handlers/constants';
import { fetchData, Initialized, LayoutSelect } from '../handlers/middlewares';
import { StoreContext } from '../handlers/stores';
import { handlePagination, handleRemove, handleSearch } from '../handlers/eventhandlers'

function PageList() {
  const {point, Layout } = LayoutSelect()
  const [ page, setPage ] = useState(1)
  const [ state, dispatch ] = useContext(StoreContext)

  const formConfigs = {
    "Cari Komoditas": { type: 'text', placeholder: 'Silahkan isi dengan komoditas' },
    "Pencarian": { type: 'submit' }
  }

  if (state?.params?.name) {
    formConfigs['Cari Komoditas'].defaultValue = state.params.name
  }  

  const clickPrevious = () => {
    if (page <= 1) return
    setPage(page - 1)
    handlePagination(page, state, dispatch)
  }

  const clickNext = () => {
    if (page >= 25) return
    setPage(page + 1)
    handlePagination(page, state, dispatch)
  }

  useEffect(() => {
    Initialized(state, dispatch)
  }, [])
  
  return (
    <Layout>
      {
        (() => {
          const RefreshComponent = <Refreshing click={
            () => { 
              fetchData(state).then(result => {
                dispatch({ type: 'SET_PARAMS', payload: null })
                dispatch({ type: 'SET_LISTS', payload: result })
                setPage(1)
              })
            }
            } />

          if (state.loading) {
            return <Loading />
          } else if (state?.lists && state.lists?.length > 0) {
            const Rows = []
            const Columns = []
            tableColumns?.forEach((item, index) => {
              Columns.push(<th key={index} className="text-sm text-blue-600 font-medium uppercase p-[8px]">{item.text}</th>)
            })
            if (!['xs', 'sm', 'md'].includes(point)) {
              Columns.push(<th key={Columns.length} className="text-sm text-blue-600 font-medium uppercase p-[8px]">Aksi</th>)
            }
            const lists = state.lists
            lists?.forEach((item, index) => {
              const rowClass = 'border-collapse border-t border-blue-400 p-[10px]'
              if (['xs', 'sm', 'md'].includes(point)) {
                Rows.push(
                  <tr key={index}>
                    <td className={rowClass}>{((page - 1) * 15) + (index + 1)}. {item.komoditas || 'Tidak Ada Nama'}</td>
                    <td className={rowClass}>{item.size || 0}</td>
                    <td className={rowClass}>Rp. {item.price || 0}</td>
                  </tr>
                )
                if (item.uuid || item.komoditas) {
                  Rows.push(
                    <tr key={'button-' + index}>
                      <td className="p-[5px]">
                        <Link to={'/list-edit/' + (item.uuid ? item.uuid : `${item.komoditas}?by=name`)}>
                          <button className="button bg-yellow-400">
                            <PencilAltIcon className="w-5 h-5" />
                            Ubah
                          </button>
                        </Link>
                      </td>
                      <td colSpan={2} className="p-[5px]">
                        <button className="button bg-red-400" onClick={() => handleRemove(item.uuid || item.komoditas, state, dispatch)}>
                          <TrashIcon className="w-5 h-5" />
                          Hapus
                        </button>
                      </td>
                    </tr>
                  )
                }
              } else {
                const ButtonComponent = (item.uuid || item.komoditas) ? <div className="flex justify-start">
                  <div className="p-[5px]">
                    <Link to={'/list-edit/' + (item.uuid ? item.uuid : `${item.komoditas}?by=name`)}>
                      <button className="button bg-yellow-400 w-10 h-10">
                        <PencilAltIcon className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                  <div className="p-[5px]">
                    <button className="button bg-red-400 w-10 h-10" onClick={() => handleRemove(item.uuid || item.komoditas, state, dispatch)}>
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div> : <div className="flex justify-start">-</div>
                Rows.push(
                  <tr key={index}>
                    <td className={rowClass}>{((page - 1) * 15) + (index + 1)}. {item.komoditas || 'Tidak Ada Nama'}</td>
                    <td className={rowClass}>{item.size || 0}</td>
                    <td className={rowClass}>Rp. {item.price || 0}</td>
                    <td className={rowClass}>{ ButtonComponent }</td>
                  </tr>
                )
              }
            })
            const paginatePrevClass = page <= 1 ? 'button-paginate-disabled' : 'button-paginate'
            const paginateNextClass = page >= 25 ? 'button-paginate-disabled' : 'button-paginate'
            const PaginateComponent = lists.length < 15 ?
              <div></div> :  
              <div className="flex justify-end cursor-pointer gap-[5px] mt-[15px]">
                <button className={paginatePrevClass} onClick={clickPrevious}>
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button className={paginateNextClass} onClick={clickNext}>
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            return (
              <div>
                <div className="w-11/12">
                  <JsonToForm model={formConfigs} onSubmit={(value) => handleSearch(value, state, dispatch)} />
                </div>
                <table className="table-auto border-collapse border-b border-blue-400 select-none w-full">
                  <thead>
                    <tr className="border-collapse border-t border-blue-400">
                      { Columns }
                    </tr>
                  </thead>
                  <tbody>
                    { Rows }
                  </tbody>
                </table>
                { PaginateComponent }
                <div className="h-[100px]" />
              </div>
            )
          } else {
            return ( 
              <div>
                <NotFound />
                { RefreshComponent }
              </div>
            )
          }
        })()
      }
    </Layout>
  )
}

export default PageList
