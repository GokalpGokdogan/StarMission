
const SinglePastMission = ({title, location}) => {
    return (
        <li className="flex justify-between py-1 px-2">
            <div className="flex w-full min-w-0 py-2 border rounded-xl border-transparent p-2 border-10 bg-white">
                <div className="flex items-center">
                    <img width="60" height="60" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" />
                </div>
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-main-text">{title}</p>
                    <p className="truncate text-xs leading-5 text-sub-text">{location}</p>
                </div>
                <div className="flex items-center ml-48">
                    <svg className="h-6 w-6 text-neutral-400" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="1" />  <circle cx="12" cy="19" r="1" />  <circle cx="12" cy="5" r="1" /></svg>
                </div>
            </div>
        </li>
    )
}

export default SinglePastMission