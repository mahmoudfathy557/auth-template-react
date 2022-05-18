import React, { Component, useState, useEffect, useContext } from 'react'
import * as Survey from 'survey-core'
import * as SurveyCreatorCore from 'survey-creator-core'
import * as SurveyCreatorReact from 'survey-creator-react'
import 'survey-core/defaultV2.css'
import 'survey-creator-core/survey-creator-core.css'

// Survey.StylesManager.applyTheme("defaultV2");
import { IntranetContext } from '../../context'

export default function SurveyCreator(props) {
  const { addNewSurvey, editOneSurvey } = useContext(IntranetContext)
  let [creator, setCreator] = useState()

  if (creator === undefined) {
    let options = {
      showEmbededSurveyTab: true,
      showLogicTab: true,
      showTranslationTab: true,
    }
    creator = new SurveyCreatorReact.SurveyCreator(options)

    // when user hit save btn
    creator.saveSurveyFunc = (no, callback) => {
      const surveyJson = JSON.stringify(creator.JSON)
      if (props.edit && props.surveyId) {
        editOneSurvey(surveyJson, props.surveyId)
      } else {
        addNewSurvey(surveyJson)
      }
      callback(no, true)
    }

    setCreator(creator)
  }

  creator.JSON = props.json

  return (
    <div style={{ height: 'calc(100% - 70px)' }}>
      <SurveyCreatorReact.SurveyCreatorComponent
        creator={creator}
      ></SurveyCreatorReact.SurveyCreatorComponent>
    </div>
  )
}
