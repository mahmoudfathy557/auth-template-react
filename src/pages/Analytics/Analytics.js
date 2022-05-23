import React, { useContext, useState, useEffect } from 'react'
import SurveyAnalytics from './SurveyAnalytics'
import { IntranetContext } from '../../context'

export default function AnalyticsPage(props) {
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
      <h2>Analytics Pack - visualize survey results</h2>
      {surveyJSON && <SurveyAnalytics json={surveyJSON} data={surveyResult} />}
    </div>
  )
}
