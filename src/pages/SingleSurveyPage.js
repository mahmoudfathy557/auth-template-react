import React, { useContext, useEffect, useState } from 'react'
import * as Survey from 'survey-core'
import * as SurveyReact from 'survey-react-ui'
import 'survey-core/defaultV2.css'
import { IntranetContext } from '../context'
import dmglogo from '../components/img/dmg FOUNDATION.png'

import Navbar from '../components/Navbar'
import { Figure } from 'react-bootstrap'

Survey.StylesManager.applyTheme('defaultV2')

export default function SingleSurveyPage(props) {
  const surveyId = props.match.params.id

  const { fetchOneSurvey, addNewSurveyResult, user_id } =
    useContext(IntranetContext)

  const [model, setModel] = useState(null)

  function onValueChanged(result) {}

  function onComplete(result, surveyId) {
    addNewSurveyResult(JSON.stringify(result.valuesHash), surveyId)
  }

  useEffect(async () => {
    fetchOneSurvey(surveyId)
      .then((res) => {
        const surveyJson = JSON.parse(res.data[0].survey_json)
        setModel(new Survey.Model(surveyJson))
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      {user_id && <Navbar />}
      <div className='container'>
        {!user_id && (
          <Figure className='d-flex flex-column justify-content-center align-items-center mt-3 '>
            <Figure.Image
              width={230}
              height={180}
              alt='230x180'
              src={dmglogo}
            />
            <Figure.Caption>DMG Survey Platform</Figure.Caption>
          </Figure>
        )}

        {model && (
          <SurveyReact.Survey
            model={model}
            onComplete={(result) => onComplete(result, surveyId)}
            onValueChanged={onValueChanged}
          />
        )}
      </div>
    </>
  )
}
