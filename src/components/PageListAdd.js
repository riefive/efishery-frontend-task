import { useContext } from 'react';
import JsonToForm from 'json-reactform';
import { LayoutSelect } from '../handlers/middlewares';
import { StoreContext } from '../handlers/stores';
import { createForm, handleSubmit } from '../handlers/eventhandlers';

function PageListAdd() {
  const Layout = LayoutSelect()
  const [ state, dispatch ] = useContext(StoreContext)
  const type = 'save'
  const formConfigs = createForm(state, type)

  return (
    <Layout>
      <div id="save" className="w-11/12 mx-auto">
        <JsonToForm model={formConfigs} onSubmit={(value) => handleSubmit(value, dispatch, type)}/>
      </div>
    </Layout>
  )
}

export default PageListAdd
