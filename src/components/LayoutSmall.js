import { Link } from 'react-router-dom';
import { PaperAirplaneIcon, PlusIcon, ViewBoardsIcon } from '@heroicons/react/solid'
import { SearchIcon } from '@heroicons/react/outline'
import { menus } from '../handlers/constants'

function LayoutSmall({ children }) {
  const pathName = window?.location?.pathname || null
  const body = document?.querySelector('body') || null
  if (body) {
    body.style.zoom = 1
  }
  return (
    <div className="relative w-full">
      <div className="fixed top-0 flex items-center bg-blue-400 w-full h-[50px] z-10">
        <div className="flex items-center">
          <PaperAirplaneIcon className="icon w-6 h-6 mx-[5px]" />
          <span className="text-md text-gray-50 font-medium capitalize">
            { String(process.env.REACT_APP_NAME || '').toLowerCase() }
          </span>
        </div>
      </div>
      <div className="p-[10px] mt-[55px]">
        { children }
      </div>
      <div className="fixed bottom-0 bg-white w-full z-10">
        <div className="border-t border-blue-400 mb-[5px]" />
        <div className="columns-3 gap-[3px] mb-[5px]">
        {
          (() => {
            let container = [];
            menus?.forEach((value, index) => {
              let icon = null
              const iconClass = pathName === value.click ? 'h-8 w-8 text-blue-400' : 'h-8 w-8 text-black-50'
              const textClass = pathName === value.click ? 'text-sm text-center text-blue-400 font-normal capitalize' : 'text-sm text-center text-black-50 font-normal capitalize'
              if (value.id === 1) {
                icon = <SearchIcon className={iconClass} />
              } else if (value.id === 2) {
                icon = <ViewBoardsIcon className={iconClass} />
              } else {
                icon = <PlusIcon className={iconClass} />
              }
              container.push(
                <Link key={index} to={value.click} className="menu-hover-small flex flex-col justify-center items-center cursor-pointer select-none" style={{textDecoration: "none"}}>
                  <div className="flex-none mr-[5px]">
                    { icon }
                  </div>
                  <div className="flex-none mt-[3px]">
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
    </div>
  )
}

export default LayoutSmall
