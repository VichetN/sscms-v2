
import { useState } from 'react';
import './App.scss';
import './theme.scss';
import { Header, SideBar } from './components/index';
import { Routes, Route   } from 'react-router-dom';
import { Dashboard, Schedule } from './pages';
import { Box } from '@mui/material';
import User from './pages/user/User';


function App() {

  const [toggled, setToggled] = useState(false)

  const handleToggleSidebar = (e) => {
    setToggled(e)
  }

  return (
    <div className='app'>
        <SideBar handleToggleSidebar={handleToggleSidebar} toggled={toggled} />

        <Box style={{ padding:'0px 0px',width:'100%' }}>
          <Header handleToggleSidebar={handleToggleSidebar} toggled={toggled} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </Box>
    </div>
  );
}

export default App;
