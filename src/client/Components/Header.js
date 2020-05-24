import React, { useState } from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, Close } from '@material-ui/icons';

const drawerWidth = 140;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
  title: { flexGrow: 1 },
}));

const list = [
  { name: 'Home', link: '#' },
  { name: 'Monitor', link: '#Monitor' },
];

const Header = props => {
  const styles = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        {list.map(item => (
          <ListItem button component="a" href={item.link} key={item.name}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={styles.root}>
      <CssBaseline />
      <AppBar position="fixed" className={styles.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={styles.menuButton}
            onClick={() => handleDrawerToggle()}
            color="inherit"
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            className={styles.title}
            color="inherit"
            noWrap
          >
            Stat Monitor
          </Typography>
        </Toolbar>
      </AppBar>

      <nav className={styles.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={() => handleDrawerToggle()}
            classes={{
              paper: styles.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton
              onClick={() => {
                handleDrawerToggle;
              }}
              className={styles.closeMenuButton}
            >
              <Close />
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={styles.drawer}
            variant="permanent"
            classes={{
              paper: styles.drawerPaper,
            }}
          >
            <div className={styles.toolbar} />
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div className={styles.content}>
        <div className={styles.toolbar}>{props.children}</div>
      </div>
    </div>
  );
};
export default Header;
