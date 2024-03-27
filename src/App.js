import logo from './logo.svg';
import Login from './screens/Login';
import SignUp from "./screens/SignUp";
import PastMissions from "./components/PastMissions";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Sidebar from './components/SideBar';
import { useState } from 'react';
import Dashboard from './screens/Dashboard';

function App() {

    const [login, setLogin] = useState(true);
    const [open, setOpen] = useState(false);
    const [href, setHref] = useState("Login");
    const [darkMode, setDarkMode] = useState(false);
    const [active, setActive] = useState("Login");

  return (
    <div className="transition-all duration-300 h-screen"  >
                        <Router >
                        <div className={`fixed inset-y-0 left-0 ${open ? 'w-56' : 'w-0'} transition-all duration-300 z-50 bg-darker-bg`}>
                                <Sidebar open={open} setOpen={setOpen} setHref={setHref} darkMode={darkMode} active={active} setActive={setActive} />
                            </div>
                            <div className={`flex flex-col w-full h-full transition-all duration-300 ${open ? 'pl-56' : "pl-0"} `}>
                                <div className='flex-1 h-full'>
                                    <Routes>
                                        <Route path="/" element={<Login />} />
                                        <Route path="/sign-up" element={<SignUp />} />
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/past-missions" element={<PastMissions />}/>
                                    </Routes>
                                </div>
                            </div>
                        </Router>
                    </div>
  );
}

export default App;
