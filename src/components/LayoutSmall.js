import { PlusIcon, ViewBoardsIcon } from '@heroicons/react/solid'
import { SearchIcon } from '@heroicons/react/outline'
import { menus } from '../helpers/constants.js'

function LayoutSmall({ children }) {
  return (
    <div className="relative w-full">
      <div className="fixed top-0 flex items-center bg-blue-400 w-full h-[50px] z-10">
        <span className="text-md text-gray-50 font-medium capitalize mx-[10px]">
          { String(process.env.REACT_APP_NAME || '').toLowerCase() }
        </span>
      </div>
      <div className="p-[10px] mt-[55px]">
        { children }
      </div>
      <div className="fixed bottom-0 w-full">
        <div className="border-t border-black-50 mb-[5px]" />
        <div className="columns-3 gap-[3px] mb-[5px]">
        {
          (() => {
            let container = [];
            menus?.forEach((value, index) => {
              let icon = null
              if (value.id === 1) {
                icon = <SearchIcon className="h-8 w-8 text-black-50"/>
              } else if (value.id === 2) {
                icon = <ViewBoardsIcon className="h-8 w-8 text-black-50"/>
              } else {
                icon = <PlusIcon className="h-8 w-8 text-black-50"/>
              }
              container.push(
                <div className="flex flex-col justify-center items-center cursor-pointer select-none">
                  <div className="flex-none mr-[5px]">
                    { icon }
                  </div>
                  <div key={index} className="flex-none mt-[3px]">
                    <span className="text-sm text-center text-black-50 font-normal capitalize">{ value.text }</span>
                  </div>
                </div>
              )
            });
            return container;
          })()
        }
        </div>
      </div>
    </div>
  )
}

export default LayoutSmall
