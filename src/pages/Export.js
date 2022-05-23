import React, { useContext, useEffect, useState } from 'react'
import { IntranetContext } from '../context'

import * as Survey from 'survey-core'
import * as SurveyPDF from 'survey-pdf'

// import { json } from '../survey_json.js'

export default function ExportToPDFPage(props) {
  const surveyId = props.match.params.id
  const { fetchOneSurvey } = useContext(IntranetContext)
  const [model, setModel] = useState(null)
  const [json, setJson] = useState(null)

  function savePDF(model) {
    var surveyPDF = new SurveyPDF.SurveyPDF(json)
    surveyPDF.data = model.data
    surveyPDF.save()
  }

  useEffect(() => {
    fetchOneSurvey(surveyId).then((res) => {
      const surveyJson = JSON.parse(res.data[0].survey_json)
      setModel(new Survey.Model(surveyJson))
      setJson(surveyJson)
    })
  }, [])

  return (
    <div className='container'>
      <div className='jumbotron'>
        <h2>Export survey to a PDF document</h2>
      </div>
      <div>
        {model && <button onClick={() => savePDF(model)}>Save PDF</button>}
      </div>
    </div>
  )
}
