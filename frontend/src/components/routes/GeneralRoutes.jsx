import React from 'react'
import { Route } from 'react-router-dom';
import Popular from '../pages/Store/Popular.jsx';
import Store from '../pages/Store/Store.jsx';
import About from '../pages/Extras/About.jsx';
import Contact from '../pages/Extras/Contact.jsx';
import Privacy from '../pages/Extras/Privacy.jsx';
import Terms from '../pages/Extras/Terms.jsx';
import Login from '../pages/Auth/Login.jsx';
import Signup from '../pages/Auth/Signup.jsx';
import Verification from '../pages/Auth/Verification.jsx';

const GeneralRoutes = [
    <Route path="/" element={<Popular />} />,
    <Route path="/popular" element={<Popular />} />,
    <Route path="/store" element={<Store />} />,
    <Route path="/about" element={<About />} />,
    <Route path="/contact" element={<Contact />} />,
    <Route path="/privacy" element={<Privacy />} />,
    <Route path="/terms" element={<Terms />} />,
    <Route path="/login" element={<Login />} />,
    <Route path="/signup" element={<Signup />} />,
    <Route path="/verification" element={<Verification />} />
]

export default GeneralRoutes