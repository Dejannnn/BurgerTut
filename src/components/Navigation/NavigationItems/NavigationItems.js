import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    console.log(props.isAuth);
  return (

      <ul className={classes.NavigationItems}>
          <NavigationItem link="/" exact>Burger Builder</NavigationItem>
          {!props.isAuth ===true ? null:<NavigationItem link="/orders">Orders</NavigationItem>}
          {!props.isAuth ===true ? <NavigationItem link="/auth">Auth</NavigationItem> :  <NavigationItem link="/logout" >Logout</NavigationItem>}
      </ul>
      );
}
export default navigationItems;