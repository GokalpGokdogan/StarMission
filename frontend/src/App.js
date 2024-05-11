import Login from './screens/Login';
import SignUp from "./screens/SignUp";
import SimpleList from "./components/SimpleList";
import MissionApplicant from "./components/MissionApplicant";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from './components/SideBar';
import { useState, memo } from 'react';
import DashboardCompany from './screens/company/DashboardCompany';
import ApplicationsAstronaut from './screens/astronaut/ApplicationsAstronaut';
import MissionPostingsAstronaut from './screens/astronaut/MissionPostingsAstronaut';
import MissionPostingsCompany from './screens/company/MissionPostingsCompany';
import CreateMission from './screens/company/CreateMission';
import ApplicationsCompany from './screens/company/ApplicationsCompany';
import LeadingMissions from './screens/company/LeadingMissions';
import PartneredMissions from './screens/company/PartneredMissions';
import MissionDetailsCompany from './screens/company/MissionDetailsCompany';
import EmployeeDetailsCompany from './screens/company/EmployeeDetailsCompany';
import ManageEmployees from "./screens/company/ManageEmployees";
import LeadingMissionDetails from './screens/company/LeadingMissionDetails';
import DashboardAstronaut from './screens/astronaut/DashboardAstronaut';
import { UserProvider, useUser } from './UserProvider';
import UserContext from './UserProvider';
import { parseUserString } from './UserProvider';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import MissionApplicantCompany from "./screens/company/MissionApplicantCompany";
import MyBidsCompany from './screens/company/MyBidsCompany';
import EditProfile from './screens/EditProfile';
import BidDetailsCompany from './screens/company/BidDetailsCompany';
import ProfileCompany from './screens/company/ProfileCompany';
import MissionDetailsAstronaut from './screens/astronaut/MissionDetailsAstronaut';
import DashboardAdmin from './screens/admin/DashboardAdmin';
import CreateReport from './screens/admin/CreateReport';
import Reports from './screens/admin/Reports';
import { ReportDetails } from './screens/admin/ReportDetails';

function App() {
    return (
        <AppContent />
    );
}

export default App;


function AppContent() {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [open, setOpen] = useState(false);
    const [href, setHref] = useState("Login");
    const [active, setActive] = useState("Login");
    const { userType, userId } = useUser();

    const Auth = ({ allowedRoles }) => {
        const { userType } = useUser();
        const userId = Cookies.get('user_id'); // Directly check the cookie for user ID

        console.log(userType)
    
        
        if (!userId || !allowedRoles.includes(userType)) {
            return <Navigate to="/" replace />;
        }
    
        return <Outlet />;
    };

    const getMenuForRole = (role) => {
        switch (role) {
            case 'company':
                return [
                    {
                        title: 'Dashboard',
                        link: 'company-dashboard'
                    },
                    {
                        title: 'Applications',
                        link: 'company-applications'
                    },                    
                    {
                        title: 'My Bids',
                        link: 'my-bids'
                    },
                    {
                        title: 'Manage Employees',
                        link: 'manage-employees'
                    },
                    {
                        title: 'Leading Missions',
                        link: 'leading-missions'
                    },
                    {
                        title: 'Partnered Missions',
                        link: 'partnered-missions'
                    },
                    {
                        title: 'Past Missions',
                        link: 'past-missions'
                    },
                    {
                        title: 'Mission Posts',
                        link: 'company-mission-postings'
                    },
                ];
            case 'astronaut':
                return [
                    {
                        title: 'Dashboard',
                        link: 'dashboard'
                    },
                    {
                        title: 'Applications',
                        link: 'my-applications'
                    },
                    {
                        title: 'Mission Postings',
                        link: 'mission-postings'
                    }
                ];
            default:
                return [];
        }
    };

    const menu = getMenuForRole(userType);

    return (
        <div className="transition-all duration-300 h-screen bg-home-bg">
            <Router>
                <div className={`fixed inset-y-0 left-0 transform ${open ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-10 bg-darker-bg `} style={{width: '14rem'}}>
                    <Sidebar open={open} setOpen={setOpen} setHref={setHref} active={active} setActive={setActive} menu={menu} />
                </div>
                <div className={`flex flex-col w-full h-full transition-all duration-300 ${open ? 'pl-56' : "pl-0"} `}>
                    <div className='flex-1'>
                        <Routes>
                            <Route path='/admin' element={<DashboardAdmin/>}/>
                            <Route path='/create-report' element={<CreateReport/>}/>
                            <Route path='/reports' element={<Reports/>}/>
                            <Route path='/report-details/:reportId' element={<ReportDetails/>}/>
                            <Route path="/" element={<Login />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route path="/past-missions" element={<SimpleList />} />
                            <Route path="/mission-applicant" element={<MissionApplicant />} />
                            <Route element={<Auth allowedRoles={["company"]} />}>
                                <Route path="/company-dashboard" element={<DashboardCompany />} />
                                <Route path="/company-applications" element={<ApplicationsCompany />} />
                                <Route path="/company-mission-postings" element={<MissionPostingsCompany />} />
                                <Route path="/leading-missions" element={<LeadingMissions />} />
                                <Route path="/partnered-missions" element={<PartneredMissions />} />
                                <Route path="/mission-details/:missionId" element={<MissionDetailsCompany />} />
                                <Route path="/application-details/:astronautId/:missionId/:appliedDate" element={<MissionApplicantCompany />} />
                                <Route path="/employee-details/:employeeId" element={<EmployeeDetailsCompany />} />
                                <Route path="/manage-employees" element={<ManageEmployees />} />
                                <Route path="/my-bids" element={<MyBidsCompany />} />
                                <Route path="/create-mission" element={<CreateMission />} />
                                <Route path="/leading-mission-details/:missionId" element={<LeadingMissionDetails />} />
                                <Route path="/bid-details/:bidId" element={<BidDetailsCompany />} />
                                <Route path="edit-company-profile" element={<EditProfile type={'company'} />} />
                                <Route path="profile-company" element={<ProfileCompany/>} />
                            </Route>
                            <Route element={<Auth allowedRoles={["astronaut"]} />}>
                                <Route path="/dashboard" element={<DashboardAstronaut />} />
                                <Route path="/my-applications" element={<ApplicationsAstronaut />} />
                                <Route path="/mission-postings" element={<MissionPostingsAstronaut />} />
                                <Route path="/apply/:missionId" element={<MissionDetailsAstronaut />} />
                            </Route>
                        </Routes>
                    </div>
                </div>
            </Router>
        </div>

    );
}
