import React, { Suspense, useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  HashRouter,
} from 'react-router-dom'
import './App.css'
// import SkeletonLoader from './components/Skeleton/SkeletonLoader'
import 'bootstrap/dist/css/bootstrap.css'

import * as Survey from 'survey-core'

export { MyQuestion } from './MyQuestion'

import 'jquery-ui/themes/base/all.css'
import 'nouislider/distribute/nouislider.css'
import 'select2/dist/css/select2.css'
import 'bootstrap-slider/dist/css/bootstrap-slider.css'

import 'jquery-bar-rating/dist/themes/css-stars.css'
import 'jquery-bar-rating/dist/themes/fontawesome-stars.css'

import $ from 'jquery'
// import "jquery-ui/ui/widgets/datepicker.js";
import 'select2/dist/js/select2.js'
import 'jquery-bar-rating'

//import "icheck/skins/square/blue.css";
//require("icheck");
import 'pretty-checkbox/dist/pretty-checkbox.css'

window['$'] = window['jQuery'] = $
require('jquery-ui/ui/widgets/datepicker.js')

//widgets.icheck(Survey, $);
widgets.prettycheckbox(Survey)
widgets.select2(Survey, $)
widgets.inputmask(Survey)
widgets.jquerybarrating(Survey, $)
widgets.jqueryuidatepicker(Survey, $)
widgets.nouislider(Survey)
widgets.select2tagbox(Survey, $)
widgets.sortablejs(Survey)
widgets.ckeditor(Survey)
widgets.autocomplete(Survey, $)
widgets.bootstrapslider(Survey)

import * as widgets from 'surveyjs-widgets'

import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import ProtectedRoutes from './routes/ProtectedRoutes'
import SkeletonLoader from './components/Skeleton/SkeletonLoader'
import Login from './pages/Login/Login'

import { IntranetContext } from './context'
import MyNavbar from './components/Navbar'
import SingleSurveyPage from './pages/SingleSurveyPage'

export default function App() {
  const { user, serverError } = useContext(IntranetContext)

  const isAuthenticated = user.isAuthenticated
  return (
    <HashRouter>
      <Suspense fallback={<SkeletonLoader />}>
        <Switch>
          <PublicRoute path='/login' isAuthenticated={isAuthenticated}>
            <Login />
          </PublicRoute>
          <Route path='/survey/:id' component={SingleSurveyPage} />

          {serverError.show ? (
            <>
              <MyNavbar />

              <div className='error-container'>
                <h3>{serverError.msg}</h3>
              </div>
            </>
          ) : (
            <>
              <PrivateRoute path='/' isAuthenticated={isAuthenticated}>
                <ProtectedRoutes />
              </PrivateRoute>
            </>
          )}
        </Switch>
      </Suspense>
    </HashRouter>
  )
}
