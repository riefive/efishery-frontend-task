import { useContext } from 'react';
import { Initialized, LayoutSelect } from '../handlers/middlewares';
import { StoreContext } from '../handlers/stores';

function PageList() {
  const Layout = LayoutSelect()
  const [ state, dispatch ] = useContext(StoreContext)
  Initialized(state, dispatch)

  return (
    <Layout>
      {
        (() => {
          return (
            <table className="table-auto">
              <thead>
                <tr>
                  <th>Song</th>
                  <th>Artist</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td>Malcolm Lockyer</td>
                  <td>1961</td>
                </tr>
                <tr>
                  <td>Witchy Woman</td>
                  <td>The Eagles</td>
                  <td>1972</td>
                </tr>
                <tr>
                  <td>Shining Star</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td>
                </tr>
              </tbody>
            </table>
          )
        })()
      }
    </Layout>
  )
}

export default PageList
