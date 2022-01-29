import { ClockIcon, EmojiSadIcon, RefreshIcon } from '@heroicons/react/outline'

export function Loading() {
  return (
    <div className="flex flex-col justify-center items-center">
      <ClockIcon className="w-9 h-9" />
      <span className="text-md capitalize">
        Processing ...
      </span>
    </div>
  )
}

export function NotFound(props) {
  const ComponentName = !props?.name ? <div>Sorry! There are no items.</div> : <div>Sorry! There are no items for <b>"{props.name}".</b></div>
  return (
    <div className="flex flex-col justify-center items-center h-[180px]">
      <EmojiSadIcon className="w-28 h-28 mb-[10px] text-blue-400" />
      <span className="flex text-md text-blue-400">
        { ComponentName }
      </span>
    </div>
  ) 
}

export function Refreshing(props) {
  return (
    <div className="flex justify-center">
      <button className="text-white bg-blue-400 rounded-md w-6/12 h-10" onClick={props.click}>
        <div className="flex flex-row justify-center items-center">
          <RefreshIcon className="w-7 h-7 mr-[5px]" />
          <span className="text-md capitalize">
            Clear All
          </span>
        </div>
      </button>
    </div>
  )
}