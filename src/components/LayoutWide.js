import { PlusIcon, ViewBoardsIcon } from '@heroicons/react/solid'
import { SearchIcon } from '@heroicons/react/outline'
import { menus } from '../helpers/constants.js'

function LayoutWide({ children }) {
  return (
    <div className="flex bg-white w-full">
      <div className="flex-none bg-blue-400 w-2/12 h-screen p-[20px]">
          <div className="text-3xl text-gray-50 font-medium capitalize">
            { String(process.env.REACT_APP_NAME || '').toLowerCase() }
          </div>
          <div className="mt-[55px]">
          {
            (() => {
              let container = [];
              menus?.forEach((value, index) => {
                let icon = null
                if (value.id === 1) {
                  icon = <SearchIcon className="h-8 w-8 text-gray-50"/>
                } else if (value.id === 2) {
                  icon = <ViewBoardsIcon className="h-8 w-8 text-gray-50"/>
                } else {
                  icon = <PlusIcon className="h-8 w-8 text-gray-50"/>
                }
                container.push(
                  <div className="menu-hover flex flex-row cursor-pointer select-none p-[10px] mb-[10px]">
                    <div className="flex-none mr-[5px]">
                      { icon }
                    </div>
                    <div key={index} className="flex-none mt-[3px]">
                      <span className="text-xl text-gray-50 font-normal capitalize">{ value.text }</span>
                    </div>
                  </div>
                )
              });
              return container;
            })()
          }
          </div>
      </div>
      <div className="flex-none w-8/12 h-screen p-[10px]">
        { children }
      </div>
    </div>
  )
}

export default LayoutWide
