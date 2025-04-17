import React from 'react'
import { Route } from 'react-router-dom';

import Profile from '../pages/User/Profile.jsx';
const UserRoutes = [
    <Route path="/profile" element={<Profile />} />,
]


export default UserRoutes