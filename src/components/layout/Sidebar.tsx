import { NavLink } from "react-router-dom";
import side from './layout.module.css';
import logo from '../../assets/logo.png';

const Sidebar = () => {
    return (
        <div className={side.sidebar}>
            <div className={side.mainLogoContainer}>
                <img src={logo} alt="logo" className={side.logoImg} />
            </div>

            <nav className={side.sidebarNav}>
                <NavLink to="/" end className={({isActive})=> `${side.sidebarLink} ${isActive ? side.active : ''}`}>
                    대시보드
                </NavLink>
                <NavLink to="/payments" end className={({isActive})=> `${side.sidebarLink} ${isActive ? side.active : ''}`}>
                    결제 내역
                </NavLink>
                <NavLink to="/merchants" end className={({isActive})=> `${side.sidebarLink} ${isActive ? side.active : ''}`}>
                    가맹점 정보
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;