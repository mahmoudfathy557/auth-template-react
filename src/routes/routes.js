import { CreatorPage } from '../pages/Creator/Creator'
import { ExportToPDFPage } from '../pages/Export'
import { AnalyticsPage } from '..//pages/Analytics/Analytics'
import { AnalyticsTabulatorPage } from '../pages/AnalyticsTabulator/AnalyticsTabulator'
import { AnalyticsDatatablesPage } from '../pages/AnalyticsDataTables/AnalyticsDatatables'
import SingleSurveyPage from '../pages/SingleSurveyPage'
import PreviewSurveyPage from '../pages/PreviewSurveyPage'
import SurveysTable from '../pages/SurveysTable'
import { EditorPage } from '../pages/Creator/Editor'

const routes = [
  {
    path: '/',
    component: (props) => <SurveysTable props={props} />,
    exact: true,
  },
  {
    path: 'creator',
    component: () => <CreatorPage />,
    exact: true,
  },
  {
    path: 'export/:id',
    component: (props) => <ExportToPDFPage props={props} />,
    exact: true,
  },
  // {
  //   path: 'survey/:id',
  //   component: (props) => <SingleSurveyPage props={props} />,
  //   exact: true,
  // },
  {
    path: 'preview/:id',
    component: (props) => <PreviewSurveyPage props={props} />,
    exact: true,
  },
  {
    path: 'edit/:id',
    component: (props) => <EditorPage props={props} />,
    exact: true,
  },
  {
    path: 'analytics/:id',
    component: (props) => <AnalyticsPage props={props} />,
    exact: true,
  },
  {
    path: 'analyticsdatatables/:id',
    component: (props) => <AnalyticsDatatablesPage props={props} />,
    exact: true,
  },
  {
    path: 'analyticstabulator',
    component: () => <AnalyticsTabulatorPage />,
    exact: true,
  },
]

export default routes
