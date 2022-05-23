import React, { useContext, useState, useEffect } from 'react'
import SurveyAnalyticsDatatables from './SurveyAnalyticsDatatables'
import { IntranetContext } from '../../context'

export default function AnalyticsDatatablesPage(props) {
  const surveyId = props.match.params.id
  const { fetchOneSurvey, fetchSurveyResult } = useContext(IntranetContext)
  const [surveyJSON, setSurveyJSON] = useState(null)
  const [surveyResult, setSurveyResult] = useState([])

  useEffect(() => {
    fetchOneSurvey(surveyId)
      .then((res) => {
        const surveyJson = JSON.parse(res.data[0].survey_json)
        fetchSurveyResult(surveyId)
          .then((res) => {
            if (res.data) {
              const results = res.data.map((result) =>
                JSON.parse(result.result_json)
              )

              setSurveyResult(results)
            }
            setSurveyJSON(surveyJson)
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div>
      <h2>Results Table - display survey results in the table form</h2>
      <span>Uses DataTables. Browsers compatibility: IE10+ </span>
      {surveyJSON && (
        <SurveyAnalyticsDatatables json={surveyJSON} data={surveyResult} />
      )}
    </div>
  )
}
