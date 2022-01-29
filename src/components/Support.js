import { ClockIcon, RefreshIcon } from '@heroicons/react/outline'

export function Loading() {
  return (
    <div className="flex flex-col justify-center items-center">
      <ClockIcon className="w-9 h-9" />
      Processing ...
    </div>
  )
}

export function Refreshing(props) {
  return (
    <div className="flex justify-center">
      <button className="text-white bg-blue-400 rounded-md w-6/12 h-10" onClick={props.click}>
        <div className="flex flex-row justify-center items-center">
          <RefreshIcon className="w-7 h-7 mr-[5px]" />
          Clear All
        </div>
      </button>
    </div>
  )
}