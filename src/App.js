// import logo from './logo.svg';
import './App.css';
import TweetForm from './Component/TweetForm'; 
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import './Style/Form.css';
import Login from './Component/Login';
import { UserContext } from './Context/UserContext';
import {TweetContext} from './Context/TweetContext'
import { useState } from 'react';
import User from './Component/User';
import {CountContext} from './Context/CountContext';
import Count from './Component/Count';
import SignIn from './Component/SignIn'
import { LogedContext } from './Context/LogedContext';
import Profile from './Component/profile';

function App() {
  const [user, setUser] = useState({});
  const [tweetsList, setTweetsList] = useState([])
  const [count, setCount] = useState('')
  const [loged, setLoged] = useState(false)
  

return (
      <UserContext.Provider value ={{user, setUser}}>
            <TweetContext.Provider value={{tweetsList, setTweetsList}}>
                <CountContext.Provider value={{count, setCount}}>
                    <LogedContext.Provider value={{loged, setLoged}}>

                            
                          <BrowserRouter>
                            
                          

          <div className="hidden sm:block">
            <div className="flex space-x-4 text-white text-gray-300 hover:bg-gray-700 hover:text-white" className='Nav'>
              
            
              <a href="/Login" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-12 py-2 text-b font-medium" aria-current="page">Login</a>
             
              {loged === true ? (
                <>

              <a href="/Home" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-12 py-2 text-b font-medium">Home</a>
           
              <User /> 

              <p className='Count' 
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm "
              > My tweets : <Count/> </p>
              
              <button 
              className="text-gray-300 hover:bg-gray-700 hover:text-white ml:8 mr:8 rounded-md px-3 py-2 text-base mt:0,25 mr:0,5 "
              onClick={()=>{
              localStorage.removeItem("userId");
              setLoged(false);
              sessionStorage.setItem("loged", false)}
              }>Log me out</button>
                </>
                ) : (
                  <>
                    {
                      <>
                      <a href='/Profile'className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-12 py-2 text-b font-medium" aria-current="page"> Profile </a>

                      <a href='/SignIn' className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-12 py-2 text-b font-medium" aria-current="page"> Sign up </a>
                      </>
                    }
                  </>
                )}

            </div>
          </div> 
      
                            <Routes>
                                
                                <Route path ='/Profile' element={<Profile />} />
                                <Route path='/Login' element={<Login />} />
                                <Route path='/SignIn' element={<SignIn />} />
                                <Route path="/Home" element={< TweetForm />} />

                            </Routes>

                            </BrowserRouter>

                     </LogedContext.Provider>
                </CountContext.Provider>
              </TweetContext.Provider>
            </UserContext.Provider>
  );
}

export default App;
