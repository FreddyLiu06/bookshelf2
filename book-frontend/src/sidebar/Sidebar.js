import React, {useState} from 'react';
import './Sidebar.css';
import SidebarData from './SidebarData';
import {Link} from 'react-router-dom';
import {Menu, Close} from '@mui/icons-material';

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    }

    return (
        <>
        <div className = "Navbar">
            <Link className='menu-bars'>
                <Menu onClick={toggleSidebar}/>
            </Link>        
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={toggleSidebar}>
                <li className='navbar-toggle'>
                    <Link className='menu-bars'>
                        <Close />
                    </Link>
                </li>
                {SidebarData.map((item, index) => {
                    return (
                        <li key = {index} className = {item.cname}>
                            <Link to={item.link}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
        </>
    )
}

export default Sidebar