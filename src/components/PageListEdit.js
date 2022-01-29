import { useContext, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import JsonToForm from 'json-reactform';
import { Loading, NotFound } from './Support';
import { LayoutSelect } from '../handlers/middlewares';
import { StoreContext } from '../handlers/stores';
import { createForm, foundById, handleSubmit } from '../handlers/eventhandlers';

function PageListEdit() {
  const { id } = useParams();
  const search = useLocation().search;
  const navigate = useNavigate();
  const byType = new URLSearchParams(search).get('by');
  const { Layout } = LayoutSelect()
  const [ state, dispatch ] = useContext(StoreContext)

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'SET_LIST_CURRENT', payload: {} })
    foundById(id, byType).then((result) => {
      dispatch({ type: 'SET_LIST_CURRENT', payload: result })
      dispatch({ type: 'SET_LOADING', payload: false })
    })
  }, [id, dispatch, byType])

  const type = 'edit'
  const formConfigs = createForm(state, type)

  return (
    <Layout>
      <div id="edit" className="w-11/12 mx-auto">
      { 
          (() => {
            if (state.loading) {
              return <Loading />
            } else if (state?.listCurrent && (state?.listCurrent?.uuid || state?.listCurrent?.komoditas)) {
              return <JsonToForm model={formConfigs} onSubmit={(value) => handleSubmit(value, state, dispatch, navigate, type)}/>
            } else {
              return <NotFound name={id} />
            }
          })()
        }
      </div>
    </Layout>
  )
}

export default PageListEdit
