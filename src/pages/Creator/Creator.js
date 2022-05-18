import React from 'react'
import SurveyCreator from './SurveyCreator'

import { json } from '../../survey_json'

export function CreatorPage() {
  return (
    <>
      <h2>Survey Creator - create a new survey</h2>
      <SurveyCreator json={json} />
    </>
  )
}
