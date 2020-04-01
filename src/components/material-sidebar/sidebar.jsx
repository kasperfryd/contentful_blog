import React, {useState} from 'react';
import clsx from 'clsx';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home'
import AnnouncementIcon from '@material-ui/icons/Announcement';
import AddCommentIcon from '@material-ui/icons/AddComment';
import FullScreenDialog from '../material-dialog/dialog';
import red from '@material-ui/core/colors/red';
import { ThemeProvider } from '@material-ui/core/styles';
import Styles from './sidebar.module.scss';
import banner from '../images/bannertextreversed.png';

// material ui theme
const mainTheme = createMuiTheme({
  palette: {
    primary: red,
    secondary: {
      main: '#ffffff',
    },
  }
});

// width of sidebar
const drawerWidth = 260;

// material ui styling from "Permanent drawer example"
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  blogPosts:{
      marginLeft: "8px"
  }
}));

// Sidebar
export default function PersistentDrawerLeft(props) {

  // Define states for checking if open as well as themes
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  // function to set open to true
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // function to set open to false
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
  <ThemeProvider theme={mainTheme}>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar color="secondary" position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: open,})}>
        <Toolbar>

          <IconButton color="inherit" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton>

          <Typography className={!open ? Styles.nowReading: Styles.hidden}>
            {props.currentTitle}
          </Typography>
   
        <img src={banner} alt="logo" className={Styles.logo} />
        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{paper: classes.drawerPaper}}>
        
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        
      <List>
        <ListItem button component={"a"} onClick={handleDrawerClose} href="/contentful_blog" key={"Home"}>
              <ListItemIcon ><HomeIcon htmlColor="rgb(244,67,54)"	 color="primary" /></ListItemIcon>
              <ListItemText primary={"Home"} />
        </ListItem>

        <Divider />
            <ListItem key={"Latest_Posts"}>
              <ListItemIcon><AnnouncementIcon htmlColor="rgb(244,67,54)"	 color="primary" /></ListItemIcon>
              <ListItemText primary={"Latest Posts"} />
            </ListItem>

            {props.top.items.map((item, index) =>
            <ListItem onClick={() => {props.showSelected(item.fields.title); handleDrawerClose()}} button key={index}>
                <ListItemText className={classes.blogPosts} primary={item.fields.title}></ListItemText>
            </ListItem>
            )}
        <Divider />
        <FullScreenDialog close={handleDrawerClose} showSelected={props.showSelected} getAllData = {props.getAllData} array={props.allArray} />
        <ListItem button component={"a"} href="https://be.contentful.com/login" key={"New_Post"}>
          <ListItemIcon ><AddCommentIcon htmlColor="rgb(244,67,54)"	 color="primary" /></ListItemIcon>
          <ListItemText primary={"New Post"} />
        </ListItem>

      </List>
      </Drawer>
    </div>
  </ThemeProvider>
  );
}
