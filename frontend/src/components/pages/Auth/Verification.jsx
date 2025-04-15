import React from 'react'
import { useLocation } from "react-router-dom";

const Verification = () => {
  const location = useLocation();
  const email = location.state?.email || null;
  return (
    <div>Verification</div>
  )
}

export default Verification