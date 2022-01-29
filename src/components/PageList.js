import { useContext } from 'react';
import { Initialized, LayoutSelect } from '../handlers/middlewares';
import { StoreContext } from '../handlers/stores.js';

function PageList() {
  const Layout = LayoutSelect()
  const [ state, dispatch ] = useContext(StoreContext)
  Initialized(state, dispatch)

  return (
    <Layout></Layout>
  )
}

export default PageList
