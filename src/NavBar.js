import React from "react";
import { NavLink } from "react-router-dom"
import { GiMountains } from "react-icons/gi";
// import { FaMountain } from "react-icons/fa";


function NavBar() {
    const style = { fontSize: "3vw" }

    return (
        
            <nav className="navbar">
                    <div className="navbar-header">
                        <div className="navbar-homepage">
                            <h1 className="header-welcome"> Artifacts </h1>
                            {/* <h3> <FaMountain /> <FaMountain /> <FaMountain /> </h3> */}
                            <h3> <GiMountains style={style}/> <GiMountains style={style}/> <GiMountains style={style}/> </h3>

                        </div>
                        <div className="flexbox-nav">
                            <div className="navbar-links">
                                <NavLink exact to="/">HOME</NavLink>
                                <NavLink activeStyle={{textDecoration:"underline"}} to="/task">TASK</NavLink>
                                <NavLink activeStyle={{textDecoration:"underline"}} to="/appreciation">  APPRECIATION </NavLink>
                                <NavLink activeStyle={{textDecoration:"underline"}} to="/review"> REVIEW </NavLink>
                            </div>
                        </div>
                    </div>
            </nav>
    );
}

export default NavBar;