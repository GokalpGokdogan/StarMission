import React from 'react'
import { useParams } from 'react-router-dom'

export const ReportDetails = () => {

    const { reportId } = useParams();
    return (
        <div>ReportDetails</div>
    )
}
