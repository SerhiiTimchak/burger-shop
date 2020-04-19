import React, { Component } from "react";
import Auxiliary from "../Auxiliaru/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawCloseHandler = () => {
    // let updateSideDrawer = { ...this.state };
    // this.setState({ showSideDrawer: !updateSideDrawer.showSideDrawer });
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Auxiliary>
        <Toolbar
          className={classes.Display}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          closed={this.sideDrawCloseHandler}
          open={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

export default Layout;
