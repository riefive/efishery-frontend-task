import { Link } from 'react-router-dom';
import { PlusIcon, ViewBoardsIcon } from '@heroicons/react/solid'
import { SearchIcon } from '@heroicons/react/outline'
import { menus } from '../handlers/constants.js'

function LayoutWide({ children }) {
  return (
    <div className="flex bg-white w-full">
      <div className="flex-none bg-blue-400 w-2/12 h-screen p-[20px]">
          <div className="text-2xl text-gray-50 text-center font-semibold capitalize">
            { String(process.env.REACT_APP_NAME || '').toLowerCase() }
          </div>
          <div className="border-t-4 border-gray-50 my-[5px]" />
          <div className="mt-[25px]">
          {
            (() => {
              let container = [];
              menus?.forEach((value, index) => {
                let icon = null
                if (value.id === 1) {
                  icon = <SearchIcon className="h-8 md:h-6 w-8 md:w-6 text-gray-50"/>
                } else if (value.id === 2) {
                  icon = <ViewBoardsIcon className="h-8 md:h-6 w-8 md:w-6 text-gray-50"/>
                } else {
                  icon = <PlusIcon className="h-8 md:h-6 w-8 md:w-6 text-gray-50"/>
                }
                container.push(
                  <Link to={value.click} className="menu-hover flex flex-row cursor-pointer select-none p-[10px] mb-[10px]" style={{"text-decoration": "none"}}>
                    <div className="flex-none mr-[5px]">
                      { icon }
                    </div>
                    <div key={index} className="flex-none mt-[3px] md:mt-[1px]">
                      <span className="text-lg md:text-sm text-gray-50 font-normal capitalize">{ value.text }</span>
                    </div>
                  </Link>
                )
              });
              return container;
            })()
          }
          </div>
      </div>
      <div className="flex-none w-8/12 h-screen p-[10px] mt-[10px]">
        { children }
      </div>
    </div>
  )
}

export default LayoutWide
