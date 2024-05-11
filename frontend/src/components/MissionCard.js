import React from 'react'

const MissionCard = ({ missionData }) => {

  const formattedStart = new Date(missionData.start_date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '.');

  const formattedEnd = new Date(missionData.end_date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '.');

  return (
    <div className="w-full">
      <div className="flex flex-col p-4 rounded-xl bg-grey-bg shadow-lg min-h-64">
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-main-text font-semibold px-2 mb-4">Current Mission</h2>
        </div>
        <div className="flex flex-col rounded-xl bg-white p-4">
          <h2 className="text-2xl font-bold text-main-text ml-4">{missionData.name}</h2>
          <div className="flex items-center mt-4">
            <img width="90" height="90" src="https://seekvectorlogo.com/wp-content/uploads/2018/02/nasa-vector-logo.png" alt="NASA Logo" />
            <div className='flex-1 ml-4'>
              <p className="text-lg font-semibold mt-3 text-main-text">{missionData.company_name}</p>
              <p className="truncate text-base text-sub-text">{missionData.location}</p>
              <p className="truncate text-sm text-sub-text">Mission Start-End: {formattedStart} - {formattedEnd}</p>
            </div>
          </div>
          <div className="flex flex-col px-4 py-5 mt-4 mb-4 bg-grey-bg rounded-xl">
            <p className="text-sm font-semibold text-sub-text">{missionData.description}</p>
          </div>

          {missionData.important_notes && missionData.important_notes.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-main-text mt-4 ml-4">Important Notes</h2>
              <div className="flex flex-col px-4 py-2 mt-2 bg-grey-bg rounded-xl text-sub-text font-semibold">
                <ul className="list-disc list-inside">
                    <li className="text-sm">{missionData.important_notes[0]}</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>

  )
}

export default MissionCard