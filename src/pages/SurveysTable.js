import React, { useContext, useEffect, useState, useLayoutEffect } from 'react'
import { IntranetContext } from '../context'
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
import DeleteModal from '../components/DeleteModal'

import {
  AiOutlineVerticalAlignTop,
  AiFillEdit,
  AiOutlineTable,
  AiFillFilePdf,
} from 'react-icons/ai'
import { BiRun, BiTrash } from 'react-icons/bi'
import { GrAnalytics } from 'react-icons/gr'
import { MdOutlinePreview } from 'react-icons/md'

const SurveysTable = (props) => {
  const { fetchAllSurveys, deleteOneSurvey, surveys, publishSurvey } =
    useContext(IntranetContext)

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
                  <tr key={id}>
                    <td> {title} </td>
                    <td className='d-flex justify-content-end'>
                      <ButtonGroup>
                        {/* Publish */}
                        <OverlayTrigger
                          placement={'top'}
                          overlay={
                            <Tooltip id={`tooltip-${'top'}`}> Publish </Tooltip>
                          }
                        >
                          <Button
                            type='button'
                            className='btn btn-success    text-capitalize  '
                            onClick={() => {
                              handlePublishSurvey(idx)
                            }}
                            disabled={isPublished}
                          >
                            <AiOutlineVerticalAlignTop
                              style={{
                                fontSize: '24px',
                              }}
                            />
                          </Button>
                        </OverlayTrigger>
                        {/* Run */}
                        <OverlayTrigger
                          placement={'top'}
                          overlay={
                            <Tooltip id={`tooltip-${'top'}`}>Run</Tooltip>
                          }
                        >
                          {isPublished ? (
                            <Link
                              to={`/survey/${idx}`}
                              type='button'
                              className='btn btn-primary text-capitalize       justify-content-center  d-flex align-items-center'
                              disabled={true}
                            >
                              <BiRun
                                style={{
                                  fontSize: '24px',
                                }}
                              />
                            </Link>
                          ) : (
                            <Button
                              type='button'
                              className='btn btn-primary text-capitalize       justify-content-center  d-flex align-items-center'
                              disabled={true}
                            >
                              <BiRun
                                style={{
                                  fontSize: '24px',
                                }}
                              />
                            </Button>
                          )}
                        </OverlayTrigger>

                        {/* preview */}
                        <OverlayTrigger
                          placement={'top'}
                          overlay={
                            <Tooltip id={`tooltip-${'top'}`}> Preview </Tooltip>
                          }
                        >
                          {!isPublished ? (
                            <Link
                              to={`/preview/${idx}`}
                              type='button'
                              className='btn btn-secondary text-capitalize       justify-content-center  d-flex align-items-center'
                              disabled={true}
                            >
                              <MdOutlinePreview
                                style={{
                                  fontSize: '24px',
                                }}
                              />
                            </Link>
                          ) : (
                            <Button
                              type='button'
                              className='btn btn-secondary text-capitalize       justify-content-center  d-flex align-items-center'
                              disabled={true}
                            >
                              <MdOutlinePreview
                                style={{
                                  fontSize: '24px',
                                }}
                              />
                            </Button>
                          )}
                        </OverlayTrigger>
                        {/* Edit */}
                        <OverlayTrigger
                          placement={'top'}
                          overlay={
                            <Tooltip id={`tooltip-${'top'}`}> Edit </Tooltip>
                          }
                        >
                          {!isPublished ? (
                            <Link
                              to={`/edit/${idx}`}
                              type='button'
                              className='btn btn-warning text-capitalize       justify-content-center  d-flex align-items-center'
                              disabled={true}
                            >
                              <AiFillEdit
                                style={{
                                  fontSize: '24px',
                                }}
                              />
                            </Link>
                          ) : (
                            <Button
                              type='button'
                              className='btn btn-warning text-capitalize       justify-content-center  d-flex align-items-center'
                              disabled={true}
                            >
                              <AiFillEdit
                                style={{
                                  fontSize: '24px',
                                }}
                              />
                            </Button>
                          )}
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement={'top'}
                          overlay={
                            <Tooltip id={`tooltip-${'top'}`}> Delete </Tooltip>
                          }
                        >
                          <div
                            type='button'
                            className='btn btn-danger text-capitalize d-flex align-items-center justify-content-center '
                            onClick={() => {
                              handleDeleteSurvey(idx)
                            }}
                          >
                            <BiTrash
                              style={{
                                fontSize: '24px',
                              }}
                            />
                          </div>
                        </OverlayTrigger>
                        <DropdownButton
                          as={ButtonGroup}
                          title='Results'
                          id='bg-nested-dropdown'
                          variant='info'
                        >
                          {/* results analytics */}
                          <Dropdown.Item eventKey='1'>
                            <OverlayTrigger
                              placement={'top'}
                              overlay={
                                <Tooltip id={`tooltip-${'top'}`}>
                                  Results Analytics
                                </Tooltip>
                              }
                            >
                              <Link
                                className='btn text-capitalize   d-flex align-items-center justify-content-start'
                                to={`/analytics/${idx}`}
                              >
                                <GrAnalytics
                                  style={{
                                    fontSize: '24px',
                                  }}
                                />
                                &nbsp;Analytics
                              </Link>
                            </OverlayTrigger>
                          </Dropdown.Item>
                          {/* results table */}
                          <Dropdown.Item eventKey='2'>
                            <OverlayTrigger
                              placement={'top'}
                              overlay={
                                <Tooltip id={`tooltip-${'top'}`}>
                                  Results Table
                                </Tooltip>
                              }
                            >
                              <Link
                                className='btn text-capitalize   d-flex align-items-center justify-content-start'
                                to={`/analyticsdatatables/${idx}`}
                              >
                                <AiOutlineTable
                                  style={{
                                    fontSize: '24px',
                                  }}
                                />
                                &nbsp;Table
                              </Link>
                            </OverlayTrigger>
                          </Dropdown.Item>
                          {/*   Export to PDF*/}
                          <Dropdown.Item eventKey='3'>
                            <OverlayTrigger
                              placement={'top'}
                              overlay={
                                <Tooltip id={`tooltip-${'top'}`}>
                                  Export to PDF
                                </Tooltip>
                              }
                            >
                              <Link
                                type='button'
                                className='btn  d-flex align-items-center justify-content-start'
                                to={`/export/${idx}`}
                              >
                                <AiFillFilePdf
                                  style={{
                                    fontSize: '24px',
                                  }}
                                />
                                &nbsp;Export to PDF
                              </Link>
                            </OverlayTrigger>
                          </Dropdown.Item>
                        </DropdownButton>
                      </ButtonGroup>
                    </td>
                  </tr>
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
