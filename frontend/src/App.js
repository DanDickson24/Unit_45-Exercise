import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import Signup from './Signup';
import Navbar from './NavBar';
import CompaniesList from './CompaniesList';
import CompanyJobs from './CompanyJobs';
import JobsList from './JobsList';
import Profile from "./Profile";
import PrivateRoute from './PrivateRoute';
import Job from './Job';
import { UserProvider} from './UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/companies" element={<PrivateRoute><CompaniesList /></PrivateRoute>} />
          <Route path="/companies/:handle" element={<PrivateRoute><CompanyJobs /></PrivateRoute>} />
          <Route path="/jobs" element={<PrivateRoute><JobsList /></PrivateRoute>} />
          <Route path="/jobs/:jobId" element={<PrivateRoute><Job /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

