import React from 'react';
import './styles/index.css';
import * as ApiList from './services/service_list_api.js';
import * as ApiRegion from './services/service_region_api.js';
import * as ApiSize from './services/service_size_api.js';

ApiList.get().then((data) => {
  console.log(data)
})

ApiRegion.get().then((data) => {
  console.log(data)
})

ApiSize.get().then((data) => {
  console.log(data)
})

function App() {
  return (
    <div>
      Hello world
    </div>
  );
}

export default App;
