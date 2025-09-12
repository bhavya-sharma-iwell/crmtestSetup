import { Route, Routes } from 'react-router-dom'
import React, { Suspense } from 'react'

const Loading = () => <div className='posRelative cl loaderMinHeight initialLoader'></div>

const Dashboard = React.lazy(() => import('../features/dashboard'))
const Tasks = React.lazy(() => import('../features/tasks'))
const Leads = React.lazy(() => import('../features/leads'))
const Clients = React.lazy(() => import('../features/clients'))

const CrmRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/leads' element={<Leads />} />
        <Route path='/clients' element={<Clients />} />
      </Routes>
    </Suspense>
  )
}

export default CrmRoutes;