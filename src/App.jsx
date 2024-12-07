import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Users from './pages/Users';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/users" element={<Users />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
