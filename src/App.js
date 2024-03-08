import logo from './logo.svg';
import Login from './screens/Login';
import SignUp from "./screens/SignUp";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <div className='bg-main-bg'>
              <Routes>
                  <Route path = "/" element = {<Login></Login>}></Route>
                  <Route path = "/sign-up" element = {<SignUp></SignUp>}></Route>
                  <Route path = "/login" element = {<Login></Login>}></Route>
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
