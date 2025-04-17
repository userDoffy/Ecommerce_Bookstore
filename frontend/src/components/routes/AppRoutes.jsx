import React from 'react'
import { Routes, Route} from 'react-router-dom';
import GeneralRoutes from './GeneralRoutes.jsx';
import UserRoutes from './UserRoutes.jsx';
import NotFound from '../pages/NotFound.jsx';
import Error from '../pages/Error.jsx';
const AppRoutes = () => {
  return (
    <>
    <Routes>
    {GeneralRoutes}
    {UserRoutes}
    <Route path="/error" element={<Error />} />
    <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default AppRoutes