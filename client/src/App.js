import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from './pages/Layout';
export default () => {
  return (
    <Router>
      <Route path="/" component={Main} />
    </Router>
  )
}