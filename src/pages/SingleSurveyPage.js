import React, { useContext, useEffect, useState } from 'react'
import * as Survey from 'survey-core'
import * as SurveyReact from 'survey-react-ui'
import 'survey-core/defaultV2.css'
import { IntranetContext } from '../context'
import mvlogo from '../components/img/MVLogo-Yellow.svg'

import Navbar from '../components/Navbar'
import { Figure } from 'react-bootstrap'

Survey.StylesManager.applyTheme('defaultV2')

export default function SingleSurveyPage(props) {
  const surveyId = props.match.params.id
  const [surveyAnswered, setSurveyAnswered] = useState(
    localStorage.getItem('surveysAnswered')
      ? JSON.parse(localStorage.getItem('surveysAnswered'))
      : null
  )

  const {
    fetchOneSurvey,
    addNewSurveyResult,
    user_id,
    checkIfUserAnsweredSpecificSurvey,
  } = useContext(IntranetContext)

  const [model, setModel] = useState(null)

  function onValueChanged(result) {}

  function onComplete(result, surveyId) {
    addNewSurveyResult(JSON.stringify(result.valuesHash), surveyId)

    // check if user has completed certain survey
    if (surveyAnswered === null) {
      localStorage.setItem('surveysAnswered', JSON.stringify([surveyId]))
    } else {
      localStorage.setItem(
        'surveysAnswered',
        JSON.stringify([...surveyAnswered, surveyId])
      )
    }
  }

  useEffect(() => {
    fetchOneSurvey(surveyId)
      .then((res) => {
        const surveyJson = JSON.parse(res.data[0].survey_json)
        setModel(new Survey.Model(surveyJson))
      })
      .catch((err) => console.log(err))
  }, [])

  if (surveyAnswered?.includes(surveyId)) {
    return (
      <>
        <Figure className='d-flex flex-column justify-content-center align-items-center pt-5  '>
          <Figure.Image width={150} height={100} alt='230x180' src={mvlogo} />
          <Figure.Caption>MV Survey Platform</Figure.Caption>
        </Figure>
        <div className='text-center pt-5 mt-5'>
          <h3>😎 You have completed this survey before 😎 </h3>
        </div>
      </>
    )
  } else
    return (
      <>
        {user_id && <Navbar />}
        <div className='container'>
          {!user_id && (
            <Figure className='d-flex flex-column justify-content-center align-items-center mt-3 '>
              <Figure.Image
                width={150}
                height={100}
                alt='230x180'
                src={mvlogo}
              />
              <Figure.Caption>MV Survey Platform</Figure.Caption>
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
