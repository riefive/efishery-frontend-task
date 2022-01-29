import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import JsonToForm from 'json-reactform';
import { Loading } from './Support';
import { LayoutSelect } from '../handlers/middlewares';
import { StoreContext } from '../handlers/stores';
import { createForm, handleSubmit } from '../handlers/eventhandlers';

function PageListAdd() {
  const navigate = useNavigate();
  const { Layout } = LayoutSelect()
  const [ state, dispatch ] = useContext(StoreContext)

  const type = 'save'
  const formConfigs = createForm(state, type)

  return (
    <Layout>
      <div id="save" className="w-11/12 mx-auto">
      { 
          (() => {
            if (state.loading) {
              return <Loading />
            } else {
              return <JsonToForm model={formConfigs} onSubmit={(value) => handleSubmit(value, state, dispatch, navigate, type)}/>
            }
          })()
        }
      </div>
    </Layout>
  )
}

export default PageListAdd
