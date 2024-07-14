import './App.css';
import Google from './components/google/Google';
import EmploymentSelectionPage from './pages/employmentSelectionPage/EmploymentSelectionPage';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import EmployeeRegistration from './pages/employeeRegistration/EmployeeRegistration';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployerRegistration from './pages/employerRegistration/EmployerRegistration';
import JobSeekerRegistration from './pages/jobseekerRegistration/JobSeekerRegistration';
import LongTermShortTermSelection from './pages/choosing page/ChoosingPage';
import ProfileRegistration from './pages/ProfileRegistration/ProfileRegistration';
import ContinueOptionPage from './pages/Yes or/YesOrNo';
import MatrimonyHome from './pages/matrimonyHome/MatrimonyHome';
import FilterPage from './pages/filtering page/FilterPage';
import SingleUserPage from './pages/singleMUProfilePage/SingleUserPage';
// import { useContext } from 'react';
// import { AuthContext } from './context/customHooks/AuthContext';
import Activity from './pages/Activity/Activity';
import Sent from './pages/Activity/sent/Sent';
import Accept from './pages/Activity/accept/Accept';
import Reject from './pages/Activity/reject/Reject';
import Chat from './pages/Activity/chat/Chat';

function App() {
  // const { user } = useContext(AuthContext);
  // console.log(user);


  return (
    <Router>
      <Routes> 
        {/* <Route path="/" element={user ? <Home /> : <Login />} /> */}
        {/* / is only needed if login is successfull home else login */}
        <Route path="/home" element={<Home/>} /> 
        <Route path="/" element={<Login />} />
        {/* if it is user home or if user no register*/}
        <Route path="/register/:userId" element={<Register />} />
        <Route path="/google" element={<Google />} />
        <Route path="/EmploymentSelectionPage/:userRefId_ER" element={<EmploymentSelectionPage />} />
        <Route path="/employeeRegistration/:userRefId_EeR" element={<EmployeeRegistration />} />
        <Route path="/employerRegistration/:userRefId_EeR" element={<EmployerRegistration />} />
        <Route path="/jobseekerRegistration/:userRefId_EeR" element={<JobSeekerRegistration />} />
        <Route path="/LongTermShortTermSelection" element={<LongTermShortTermSelection />} />
        <Route path="/ContinueOptionPage" element={<ContinueOptionPage />} />
           {/* / matrimony profile is needed if profile is found matrimonyHome else profileRegistration*/}
        <Route path="/ProfileRegistration" element={<ProfileRegistration />} />
        <Route path="/matrimonyHome" element={<MatrimonyHome />} />

        <Route path="/matches" element={<FilterPage />} />
        <Route path='/activities' element={<Activity/>}/>
        <Route path='/sent'element={<Sent/>}/>
        <Route path='/accept'element={<Accept/>}/>
        <Route path='/reject'element={<Reject/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path="/matrimonySingleUserView/:singleUID" element={<SingleUserPage />} />
        {/* <Route path="*" element={user ? <Home /> : <Login />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
