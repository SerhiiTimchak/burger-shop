import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawToggle from "../SideDrawer/DrawToggle/DrowToggle";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <DrawToggle clicked={props.drawerToggleClicked} />
    <nav className={classes.Display}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
