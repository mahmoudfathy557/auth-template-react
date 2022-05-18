import React, { Component, useEffect } from 'react'
// import { data, json } from '../../analytics_data'
import { DataTables } from 'survey-analytics/survey.analytics.datatables.js'
import * as Survey from 'survey-core'
import $ from 'jquery'
import 'datatables.net/js/jquery.dataTables.js'
import 'datatables.net-dt/js/dataTables.dataTables.js'
import 'datatables.net-buttons/js/dataTables.buttons.js'
import 'datatables.net-buttons/js/buttons.print.js'
import 'datatables.net-buttons/js/buttons.html5.js'
import 'datatables.net-colreorder/js/dataTables.colReorder.js'
import 'datatables.net-rowgroup/js/dataTables.rowGroup.js'
import 'datatables.net-colreorder-dt/css/colReorder.dataTables.css'
import 'survey-analytics/survey.analytics.datatables.css'

const SurveyAnalyticsDatatables = ({ json, data }) => {
  useEffect(() => {
    DataTables.initJQuery($)
    const survey = new Survey.Model(json)
    let visPanel = new DataTables(survey, data)
    visPanel.render(document.getElementById('summaryContainer'))
  }, [])

  return <div id='summaryContainer'></div>
}

export default SurveyAnalyticsDatatables
