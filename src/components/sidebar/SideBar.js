import React, { useState } from 'react'
import { Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader } from 'react-pro-sidebar'
import { RiDashboardFill, RiLogoutCircleRFill, RiUserSettingsFill } from 'react-icons/ri'
import {AiFillSchedule} from 'react-icons/ai'
import { useLocation, useNavigate } from "react-router-dom";
import Logo from '../../assets/logo/ssc-logo.png'

//style
import './SideBar.scss'
import { keyMenu } from '../../utils/function';
import Logout from '../logout/Logout';

function SideBar({ handleToggleSidebar, toggled }) {

    const [openLogout, setOpenLogout] = useState(false)

    const navigate = useNavigate()
    const urlPath = useLocation().pathname

    const handleNavigate = (e)=>{
        navigate(e)
        handleToggleSidebar(false)
    }

    return (
        <>
            <Logout setOpen={setOpenLogout} open={openLogout} />
            <ProSidebar
                breakPoint="md"
                // collapsed={true}
                style={{height:'none'}}
                toggled={toggled}
                onToggle={handleToggleSidebar}
                className="custome-sidebar"
            >
                <SidebarHeader>
                    <div style={{ fontSize: 30, textAlign: 'center' }}>
                        <img src={Logo} style={{ width: '70%', margin: '20px 0px' }} alt="Logo" />
                        {/* LOGO */}
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        {/* <MenuItem onClick={() => handleNavigate('/')} className={keyMenu(urlPath) === '' ? 'active_tab' : ''} icon={<RiDashboardFill />}>
                            Dashboard
                        </MenuItem> */}
                        <MenuItem onClick={() => handleNavigate('/schedule')} className={keyMenu(urlPath) === 'schedule' ? 'active_tab' : ''} icon={<AiFillSchedule />}>
                            Schedule
                        </MenuItem>
                        {/* <MenuItem onClick={() => handleNavigate('/user')} className={keyMenu(urlPath) === 'user' ? 'active_tab' : ''} icon={<RiUserSettingsFill />}>
                            User
                        </MenuItem> */}

                        {/* <SubMenu title="Components" icon={<FaHeart />}>
                        <MenuItem>Component 1</MenuItem>
                        <MenuItem>Component 2</MenuItem>
                    </SubMenu> */}
                    </Menu>
                </SidebarContent>

                <SidebarFooter className='sidebar_footer'>
                    <Menu iconShape="circle">
                        <MenuItem onClick={() => setOpenLogout(true)} className={'logout_footer'} icon={<RiLogoutCircleRFill />}>
                            Logout
                        </MenuItem>
                    </Menu>
                </SidebarFooter>

            </ProSidebar>
        </>
    )
}

export default SideBar