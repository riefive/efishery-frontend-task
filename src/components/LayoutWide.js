import { Link } from 'react-router-dom';
import { PaperAirplaneIcon, PlusIcon, ViewBoardsIcon } from '@heroicons/react/solid'
import { SearchIcon } from '@heroicons/react/outline'
import { menus } from '../handlers/constants'

function LayoutWide({ children }) {
  const pathName = window?.location?.pathname || null
  const body = document?.querySelector('body') || null
  if (body) {
    body.style.zoom = 1
    setTimeout(() => { body.style.zoom = 0.75 }, 5)
  }
  return (
    <div className="flex bg-white w-full">
      <div className="flex-none bg-blue-400 w-2/12 h-[133vh] p-[20px]">
          <div className="text-md text-gray-50 text-center font-semibold capitalize">
            <div className="flex items-center">
              <PaperAirplaneIcon className="icon w-6 h-6 mx-[5px]" />
              { String(process.env.REACT_APP_NAME || '').toLowerCase() }
            </div>
          </div>
          <div className="border-t-4 border-gray-50 my-[5px]" />
          <div className="mt-[25px]">
          {
            (() => {
              let container = [];
              menus?.forEach((value, index) => {
                let icon = null
                const iconClass = pathName === value.click ? 'h-8 md:h-6 w-8 md:w-6 text-blue-400' : 'h-8 md:h-6 w-8 md:w-6 text-gray-50'
                const textClass = pathName === value.click ? 'text-md md:text-sm text-blue-400 font-normal capitalize' : 'text-lg md:text-sm text-gray-50 font-normal capitalize'
                const menuClass = `menu-hover ${(pathName === value.click ? 'menu-active' : '').trim()} flex flex-row cursor-pointer select-none p-[10px] mb-[10px]`
                if (value.id === 1) {
                  icon = <SearchIcon className={iconClass} />
                } else if (value.id === 2) {
                  icon = <ViewBoardsIcon className={iconClass}/>
                } else {
                  icon = <PlusIcon className={iconClass}/>
                }
                container.push(
                  <Link key={index} to={value.click} className={menuClass} style={{textDecoration: "none"}}>
                    <div className="flex-none mr-[5px]">
                      { icon }
                    </div>
                    <div className="flex-none mt-[3px] md:mt-[1px]">
                      <span className={textClass}>{ value.text }</span>
                    </div>
                  </Link>
                )
              });
              return container;
            })()
          }
          </div>
      </div>
    <div className="scrollbar-thin flex-none w-10/12 max-h-[725px] p-[10px] mt-[10px] overflow-y-scroll">
        { children }
      </div>
    </div>
  )
}

export default LayoutWide
