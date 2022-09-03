import react from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './DropDownMenu.css'
import {Link} from 'react-router-dom'


export const DropDownMenu = () => {
    const Logout = () => {
        localStorage.removeItem('token');
        window.location.reload(false)
    }

    const SignOut = () => {
        console.log("clickkkkkkkkkkkkkkkkk");
        localStorage.removeItem('token');
        window.location = "http://localhost:3000/"
    }

    return (
        <div className="drop-down-menu">
            <Link to="/dashboard" className="Router__link">
                {/*Allows the link to return to black color after clicking*/}
                <div className="menu-option">
                    <DashboardIcon/>
                    <h3 className="menu-text">User Dashboard</h3>
                </div>
            </Link>
            
                <div className="menu-option"
                    onClick={SignOut}>
                    <ExitToAppIcon/>
                    <h3 className="menu-text">Logout</h3>
                </div>
           
        </div>

    )
}