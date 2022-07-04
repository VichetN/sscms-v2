
import { useEffect, useState } from 'react';
import './App.scss';
import './theme.scss';
import { Header, NotFound, SideBar } from './components/index';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, Schedule, PrintSchedule, User } from './pages';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "rsuite-table/dist/css/rsuite-table.css";


const theme = createTheme({
  overrides: {
    MuiFilledInput: {
      root: {
        backgroundColor: "rgb(232, 241, 250)",
        "&:hover": {
          backgroundColor: "rgb(250, 232, 241)",
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: "rgb(232, 241, 250)"
          }
        },
        "&.Mui-focused": {
          backgroundColor: "rgb(250, 241, 232)"
        }
      }
    }
  }
});

function App() {

  const [toggled, setToggled] = useState(false)
  // const [isLogin,setIsLogin] = useState(false)

  // const [auth,setAuth] = useState(false)

  // useEffect(()=>{

  // })

  const handleToggleSidebar = (e) => {
    setToggled(e)
  }

  return (
    <div className='app'>
      <ThemeProvider theme={theme}>
        <SideBar handleToggleSidebar={handleToggleSidebar} toggled={toggled} />

        <Box style={{ padding: '0px 0px', width: '100%', overflowY: 'auto' }}>
          <Header handleToggleSidebar={handleToggleSidebar} toggled={toggled} />
          <Routes>
            {/* <Route path="/" element={<Navigate to={'/schedule'} />} /> */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/schedule">
              <Route index={true} element={<Schedule />} />
              <Route path="print" element={<PrintSchedule />} />
            </Route>
            <Route path="/user" element={<User />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>

        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;
