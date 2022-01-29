import JsonToForm from 'json-reactform';
import { LayoutSelect } from '../handlers/middlewares';

const formConfigs = {
  "Nama Komoditas": {
    type: 'text',
    placeholder: "Silahkan isi nama komoditas",
    required: false
  },
  /*
  "Provinsi": {
    type: 'select',
    required: false,
    // "defaultValue": "1",
  }
  */
}

function handleSubmit() {

}

function PageSearch() {
  const Layout = LayoutSelect()
  return (
    <Layout>
      <div className="w-10/12">
        <JsonToForm model={formConfigs} onSubmit={handleSubmit}/>
      </div>
    </Layout>
  )
}

export default PageSearch