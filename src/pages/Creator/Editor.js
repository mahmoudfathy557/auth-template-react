import React, { useEffect, useContext, useState } from 'react'
import SurveyCreator from './SurveyCreator'
import { IntranetContext } from '../../context'

export function EditorPage({ props }) {
  const surveyId = props.match.params.id
  const { fetchOneSurvey } = useContext(IntranetContext)
  const [jsonFile, setJsonFile] = useState(null)
  useEffect(() => {
    fetchOneSurvey(surveyId)
      .then((res) => {
        const tempJsonFile = JSON.parse(res.data[0].survey_json)

        setJsonFile(tempJsonFile)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <h2>Survey Creator - create a new survey</h2>
      {jsonFile && <SurveyCreator json={jsonFile} edit surveyId={surveyId} />}
    </>
  )
}
