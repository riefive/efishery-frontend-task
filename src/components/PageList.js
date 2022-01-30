import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JsonToForm from 'json-reactform';
import { ArrowUpIcon, ArrowDownIcon, ChevronLeftIcon, ChevronRightIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { Loading, Refreshing, NotFound } from './Support';
import { tableColumns } from '../handlers/constants';
import { fetchData, Initialized, LayoutSelect } from '../handlers/middlewares';
import { StoreContext } from '../handlers/stores';
import { handlePagination, handleRemove, handleSearch } from '../handlers/eventhandlers'
import { debounce } from '../helpers/commons'

function PageList() {
  const {point, Layout } = LayoutSelect()
  const [ page, setPage ] = useState(1)
  const [ theLists, setTheLists ] = useState([])
  const [ rendered, setRendered ] = useState(false)
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
    fetchData(state).then(result => {
      if (state?.lists && state.lists.length === 0) {
        dispatch({ type: 'SET_LISTS', payload: result })
      }
      setTheLists(result)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleFilter(event, item, lists) {
    const name = item.name || null
    const target = event?.target
    if (target) {
      const value = target?.value
      debounce(() => {
        if (value === '') {
          dispatch({ type: 'SET_LISTS', payload: theLists })
        } else {
          let listUpdates = []
          if (name === 'comodity') {
            listUpdates = lists.filter(data => data.komoditas.toString().toLowerCase().includes(value.toLowerCase()))
          } else if (name === 'size') {
            listUpdates = lists.filter(data => Number(data.size) <= Number(value))
          } else if (name === 'price') {
            listUpdates = lists.filter(data => Number(data.price) <= Number(value))
          }
          dispatch({ type: 'SET_LISTS', payload: listUpdates })
        }
        dispatch({ type: 'SET_SEARCH_STATUS', payload: false })
      }, 1000)()
    }
  }

  function handleColumn(index, item, lists) {
    setRendered(true)
    if (item.sort) {
      const name = item.name || null
      const sort = item.sort === 'asc' ? 'desc' : 'asc'
      tableColumns[index].sort = sort
      setTimeout(() => {
        setRendered(false)
      }, 150)
      if (name === 'comodity') {
        if (sort === 'asc') {
          lists.sort((a, b) => a.komoditas > b.komoditas ? -1 : 1)
        } else {
          lists.sort((a, b) => a.komoditas < b.komoditas ? -1 : 1)
        }
      } else if (name === 'size') {
        if (sort === 'asc') {
          lists.sort((a, b) => Number(a.size) - Number(b.size))
        } else {
          lists.sort((a, b) => Number(b.size) - Number(a.size))
        }
      } else if (name === 'price') {
        if (sort === 'asc') {
          lists.sort((a, b) => Number(a.price) - Number(b.price))
        } else {
          lists.sort((a, b) => Number(b.price) - Number(a.price))
        }
      }
    }
  }
  
  return (
    <Layout>
      {
        (() => {
          const RefreshComponent = <Refreshing click={
            () => { 
              fetchData().then(result => {
                dispatch({ type: 'SET_PARAMS', payload: null })
                dispatch({ type: 'SET_LISTS', payload: result })
                dispatch({ type: 'SET_SEARCH_STATUS', payload: false })
                setPage(1)
              })
            }
            } />

          if (state.loading || rendered) {
            return <Loading />
          } else if (!rendered && state?.lists && state?.lists.length > 0) {
            const lists = state?.lists || []
            const Rows = []
            const Columns = []
            const Filters = []
            tableColumns?.forEach((item, index) => {
              const inputType = item.name === 'comodity' ? 'text' : 'number'
              const SortIcon = item.sort && item.sort === 'asc' ? 
                <ArrowDownIcon className="w-4 h-4 text-blue-400 mt-[2px]" /> : <ArrowUpIcon className="w-4 h-4 text-blue-400 mt-[2px]" />
              Columns.push(
                <th key={index} className="text-sm text-blue-600 font-medium uppercase p-[8px]">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => handleColumn(index, item, lists)}>
                    {item.text}
                    { SortIcon }
                  </div>
                </th>
              )
              Filters.push(
                <th key={`input-${index}`} className="p-[10px] w-10/12">
                  <input type={inputType} className="input-text" onChange={(value) => handleFilter(value, item, lists)} />
                </th>
              )
            })
            if (!['xs', 'sm', 'md'].includes(point)) {
              Columns.push(<th key={Columns.length} className="text-sm text-blue-600 font-medium uppercase p-[8px]">Aksi</th>)
            }
            lists?.forEach((item, index) => {
              const rowClass = 'text-sm border-collapse border-t border-blue-400 p-[10px]'
              item.komoditas = item.komoditas || ''
              item.size = item.size || 0
              item.price = item.price || 0
              if (['xs', 'sm', 'md'].includes(point)) {
                Rows.push(
                  <tr key={index}>
                    <td className={rowClass}>
                      <span className="text-sm font-medium">
                        {((page - 1) * 15) + (index + 1)}. {item.komoditas.toString().trim() !== '' ? item.komoditas : 'Tidak Ada Nama'}
                      </span>
                    </td>
                    <td className={rowClass}>{item.size}</td>
                    <td className={rowClass}>Rp. {item.price}</td>
                  </tr>
                )
                if (item.uuid || (item.komoditas && item.komoditas.toString().trim() !== '')) {
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
                    <tr>
                      { Filters }
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
