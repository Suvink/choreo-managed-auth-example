import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function App() {
  const encodedUserInfo = Cookies.get('userinfo');
  const [userInfo, setUserInfo] = React.useState(null);

  useEffect(() => {
    if (!encodedUserInfo) return;
    // Read the cookie and set it to the state.
    const userInfo = JSON.parse(atob(encodedUserInfo))
    if (userInfo) {
      const info = JSON.stringify(userInfo);
      localStorage.setItem('userinfo', info);
      setUserInfo(info);
      Cookies.remove('userinfo', { path: '/' })
    }
  }, [encodedUserInfo]);

  const handleLogout = async () => {
    // Read the cookie
    const sessionHint = Cookies.get('session_hint');

    // Clear session data
    Cookies.remove('userinfo', { path: '/' })
    localStorage.clear();

    // Redirect the user
    window.location.href = `/auth/logout?session_hint=${sessionHint}`;
  }

  return (
    <div className="App">
      {
        userInfo ? <div>
          <h1>Welcome {userInfo.username}</h1>
          <button onClick={handleLogout}>Log Out</button>
        </div> :
          <button onClick={() => {
            window.location.href = "/auth/login"
          }}
          >
            Login
          </button>
      }
    </div>
  );
}

export default App;