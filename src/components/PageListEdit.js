import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JsonToForm from 'json-reactform';
import { Loading } from './Support';
import { LayoutSelect } from '../handlers/middlewares';
import { StoreContext } from '../handlers/stores';
import { createForm, foundById, handleSubmit } from '../handlers/eventhandlers';

function PageListEdit() {
  const { id } = useParams()
  const Layout = LayoutSelect()
  const [ state, dispatch ] = useContext(StoreContext)

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'SET_LIST_CURRENT', payload: {} })
    foundById(id).then((result) => {
      dispatch({ type: 'SET_LIST_CURRENT', payload: result })
      dispatch({ type: 'SET_LOADING', payload: false })
    })
  }, [])

  const type = 'edit'
  const formConfigs = createForm(state, type)

  return (
    <Layout>
      <div id="edit" className="w-11/12 mx-auto">
      { 
          (() => {
            if (state.loading) {
              return <Loading />
            } else {
              return <JsonToForm model={formConfigs} onSubmit={(value) => handleSubmit(value, state, dispatch, type)}/>
            }
          })()
        }
      </div>
    </Layout>
  )
}

export default PageListEdit
