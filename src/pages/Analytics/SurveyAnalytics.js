import React, { Component, useEffect, useState } from 'react'
import { data, json } from '../../analytics_data'
import { VisualizationPanel } from 'survey-analytics'
import 'survey-analytics/survey.analytics.css'
import * as Survey from 'survey-core'

// export default class SurveyAnalytics extends Component {
//   visPanel
//   componentDidMount() {
//     const survey = new Survey.Model(json)
//     this.visPanel = new VisualizationPanel(survey.getAllQuestions(), data)
//     this.visPanel.render(document.getElementById('summaryContainer'))
//   }
//   render() {
//     return <div id='summaryContainer'></div>
//   }
// }

const SurveyAnalytics = ({ json, data }) => {
  useEffect(() => {
    const survey = new Survey.Model(json)
    let visPanel = new VisualizationPanel(survey.getAllQuestions(), data)
    visPanel.render(document.getElementById('summaryContainer'))
  }, [])

  return <div id='summaryContainer'></div>
}

export default SurveyAnalytics
