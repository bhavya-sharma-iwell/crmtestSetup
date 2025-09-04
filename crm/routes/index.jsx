import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Loader from '../components/loaders'
import Loadable from 'react-loadable'
import * as commonConst from '../constants'
// import Tasks from '../features/tasks'

const Loading = () => <div class='posRelative cl loaderMinHeight initialLoader'>
  {/* <Loader
    loaderType='line'
    loaderWidth={commonConst.LOADER_WIDTH[3].width}
    loaderHeight={commonConst.LOADER_WIDTH[3].height}
    loaderMessage={commonConst.CAPTION_MESSAGE[2].label}
  /> */}
</div>

const Dashboard = Loadable({
  loader: () => import('../features/dashboard'),
  loading: Loading,
})

const Tasks = Loadable({
  loader: () => import('../features/tasks'),
  loading: Loading,
})

const Leads = Loadable({
  loader: () => import('../features/leads'),
  loading: Loading,
})

const Clients = Loadable({
  loader: () => import('../features/clients'),
  loading: Loading,
})


const CrmRoutes = () => {
  return (
      <Routes>
          <Route path='/crm/dashboard' element={<Dashboard />} />
          <Route path='/crm/tasks' element={<Tasks />} />
          <Route path='/crm/leads' element={<Leads />} />
          <Route path='/crm/clients' element={<Clients />} />

      </Routes>
  )
}

export default CrmRoutes;
