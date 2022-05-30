// import CreatorPage from '../pages/Creator/Creator'
// import ExportToPDFPage from '../pages/Export'
// import AnalyticsPage from '../pages/Analytics/Analytics'
// import AnalyticsTabulatorPage from '../pages/AnalyticsTabulator/AnalyticsTabulator'
// import AnalyticsDatatablesPage from '../pages/AnalyticsDataTables/AnalyticsDatatables'
// import SingleSurveyPage from '../pages/SingleSurveyPage'
// import PreviewSurveyPage from '../pages/PreviewSurveyPage'
// import SurveysTable from '../pages/SurveysTable'
// import EditorPage from '../pages/Creator/Editor'
import { lazy } from 'react'

const routes = [
  {
    path: '/',
    component: lazy((props) => import('../pages/SurveysTable/SurveysTable')),
    exact: true,
  },
  {
    path: 'creator',
    component: lazy(() => import('../pages/Creator/Creator')),
    exact: true,
  },
  {
    path: 'export/:id',
    component: lazy((props) => import('../pages/Export')),
    exact: true,
  },
  // {
  //   path: 'survey/:id',
  //   component:lazy( (props) => <SingleSurveyPage props={props} />),
  //   exact: true,
  // },
  {
    path: 'preview/:id',
    component: lazy((props) => import('../pages/PreviewSurveyPage')),
    exact: true,
  },
  {
    path: 'edit/:id',
    component: lazy((props) => import('../pages/Creator/Editor')),
    exact: true,
  },
  {
    path: 'analytics/:id',
    component: lazy((props) => import('../pages/Analytics/Analytics')),
    exact: true,
  },
  {
    path: 'analyticsdatatables/:id',
    component: lazy((props) =>
      import('../pages/AnalyticsDataTables/AnalyticsDatatables')
    ),
    exact: true,
  },
  {
    path: 'analyticstabulator',
    component: lazy(() =>
      import('../pages/AnalyticsTabulator/AnalyticsTabulator')
    ),
    exact: true,
  },
]

export default routes
