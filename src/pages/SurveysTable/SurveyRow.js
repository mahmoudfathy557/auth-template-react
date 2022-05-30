import React from 'react'
import {
  Button,
  DropdownButton,
  ButtonGroup,
  Dropdown,
  OverlayTrigger,
  Tooltip,
  Alert,
} from 'react-bootstrap'
import {
  AiOutlineVerticalAlignTop,
  AiFillEdit,
  AiOutlineTable,
  AiFillFilePdf,
} from 'react-icons/ai'
import { BiRun, BiTrash } from 'react-icons/bi'
import { GrAnalytics } from 'react-icons/gr'
import { MdOutlinePreview } from 'react-icons/md'
import { Link } from 'react-router-dom'

const SurveyRow = ({
  title,
  idx,
  isPublished,
  isAdmin,
  handleDeleteSurvey,
  handlePublishSurvey,
}) => {
  return (
    <tr>
      <td> {title} </td>
      <td className='  text-end '>
        <ButtonGroup>
          {/* Publish */}

          <OverlayTrigger
            placement={'top'}
            overlay={<Tooltip id={`tooltip-${'top'}-${idx}`}>Publish</Tooltip>}
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
            overlay={<Tooltip id={`tooltip-${'top'}-${idx}`}>Run</Tooltip>}
          >
            {isPublished ? (
              <Link
                to={`/survey/${idx}`}
                type='button'
                className='btn btn-primary text-capitalize       justify-content-center  d-flex align-items-center'
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
                disabled={!isPublished}
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
            overlay={<Tooltip id={`tooltip-${'top'}-${idx}`}>Preview</Tooltip>}
          >
            {!isPublished ? (
              <Link
                to={`/preview/${idx}`}
                type='button'
                className='btn btn-secondary text-capitalize       justify-content-center  d-flex align-items-center'
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
                disabled={isPublished}
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
            overlay={<Tooltip id={`tooltip-${'top'}-${idx}`}>Edit</Tooltip>}
          >
            {isAdmin || !isPublished ? (
              <Link
                to={`/edit/${idx}`}
                type='button'
                className='btn btn-warning text-capitalize       justify-content-center  d-flex align-items-center'
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
                disabled={isPublished}
              >
                <AiFillEdit
                  style={{
                    fontSize: '24px',
                  }}
                />
              </Button>
            )}
          </OverlayTrigger>
          {/* Delete  */}
          <OverlayTrigger
            placement={'top'}
            overlay={<Tooltip id={`tooltip-${'top'}-${idx}`}>Delete</Tooltip>}
          >
            <button
              type='button'
              className='btn btn-danger text-capitalize d-flex align-items-center justify-content-center '
              onClick={() => {
                handleDeleteSurvey(idx)
              }}
              disabled={isAdmin ? false : isPublished}
            >
              <BiTrash
                style={{
                  fontSize: '24px',
                }}
              />
            </button>
          </OverlayTrigger>
          {/*   Export to PDF*/}
          <OverlayTrigger
            placement={'top'}
            overlay={
              <Tooltip id={`tooltip-${'top'}-${idx}`}>
                Export survey to PDF
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
            </Link>
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
                  <Tooltip id={`tooltip-${'top'}-${idx}`}>
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
                  <Tooltip id={`tooltip-${'top'}-${idx}`}>
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
          </DropdownButton>
        </ButtonGroup>
      </td>
    </tr>
  )
}

export default SurveyRow
