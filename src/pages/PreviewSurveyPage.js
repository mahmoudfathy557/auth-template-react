import React, { useContext, useEffect, useState } from 'react'
import * as Survey from 'survey-core'
import * as SurveyReact from 'survey-react-ui'
import 'survey-core/defaultV2.css'
import { IntranetContext } from '../context'

import { json } from '../survey_json.js'
import { Badge, Button } from 'react-bootstrap'

Survey.StylesManager.applyTheme('defaultV2')

export default function SingleSurveyPage({ props }) {
  const surveyId = props.match.params.id
  const { fetchOneSurvey } = useContext(IntranetContext)
  const [model, setModel] = useState(null)

  function onValueChanged(result) {}

  function onComplete(result, surveyId) {}

  useEffect(() => {
    fetchOneSurvey(surveyId)
      .then((res) => {
        const surveyJson = JSON.parse(res.data[0].survey_json)
        setModel(new Survey.Model(surveyJson))
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className='container'>
      <h5 className='mt-5'>
        <Badge bg='secondary'>Note</Badge> this page is only previewing survey
        => answers will not be saved
      </h5>

      {model && (
        <SurveyReact.Survey
          model={model}
          onComplete={(result) => onComplete(result, surveyId)}
          onValueChanged={onValueChanged}
        />
      )}
    </div>
  )
}
