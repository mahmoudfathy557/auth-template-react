import React, { useContext, useEffect, useState, useLayoutEffect } from 'react'
import { IntranetContext } from '../../context'
import { Link } from 'react-router-dom'
import {
  Button,
  DropdownButton,
  ButtonGroup,
  Dropdown,
  OverlayTrigger,
  Tooltip,
  Alert,
} from 'react-bootstrap'
import DeleteModal from '../../components/DeleteModal'

import {
  AiOutlineVerticalAlignTop,
  AiFillEdit,
  AiOutlineTable,
  AiFillFilePdf,
} from 'react-icons/ai'
import { BiRun, BiTrash } from 'react-icons/bi'
import { GrAnalytics } from 'react-icons/gr'
import { MdOutlinePreview } from 'react-icons/md'
import SurveyRow from './SurveyRow'

const SurveysTable = (props) => {
  const {
    fetchAllSurveys,
    deleteOneSurvey,
    surveys,
    publishSurvey,
    isAdmin,
    user,
  } = useContext(IntranetContext)

  const [modalShow, setModalShow] = useState(false)
  const [deletedSurveyIndex, setDeletedSurveyIndex] = useState(null)
  const [isSurveyPublished, setIsSurveyPublished] = useState(false)
  const handleDeleteSurvey = (idx) => {
    setModalShow(true)
    setDeletedSurveyIndex(idx)
  }

  const handlePublishSurvey = (idx) => {
    publishSurvey(idx)
    navigator.clipboard.writeText(
      `${window.location.href}survey/${String(idx)}`
    )
    setIsSurveyPublished(true)

    setTimeout(() => {
      setIsSurveyPublished(false)
    }, 4000)
  }

  useEffect(() => {
    fetchAllSurveys()
  }, [])

  const adminId = user?.userData?.userId
  const adminSurveys = surveys.filter(
    (survey) => Number(survey.creator_id) === Number(adminId)
  )
  const nonAdminSurveys = surveys.filter(
    (survey) => Number(survey.creator_id) !== Number(adminId)
  )

  return (
    <>
      {isSurveyPublished && (
        <Alert className='alert text-center text-dark'>
          Survey link has been copied to clipboard
        </Alert>
      )}
      <div className='surveys-table'>
        <table className='table  table-striped'>
          <tbody>
            {surveys ? (
              surveys.map((survey, id) => {
                const surveyData = JSON.parse(survey.survey_json)
                const title = surveyData.title
                const idx = survey.id
                const isPublished = survey.is_published

                return (
                  <SurveyRow
                    title={title}
                    idx={idx}
                    isPublished={isPublished}
                    key={id}
                    isAdmin={isAdmin}
                    handleDeleteSurvey={handleDeleteSurvey}
                    handlePublishSurvey={handlePublishSurvey}
                  />
                )
              })
            ) : (
              <h3 className='text-center'> no surveys available now </h3>
            )}
            {modalShow && (
              <DeleteModal
                modalShow={modalShow}
                setModalShow={setModalShow}
                deletedSurveyIndex={deletedSurveyIndex}
                deleteOneSurvey={deleteOneSurvey}
              />
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default SurveysTable
