import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, ListItemText, ListItem, List, Divider, AppBar, Toolbar, Typography, Slide, IconButton, ListItemIcon, ListItemAvatar } from '@material-ui/core/';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';

// Material ui styles
const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

// Material ui transition animation
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Fullscreen with list of 100 latest entries
export default function FullScreenDialog(props) {
  
  // set states
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  // function to open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // function to close dialog
  const handleClose = () => {
    setOpen(false);
  };

  // returns a list item back to parent (sidebar) with a clickable object that opens the dialog
  // upon opening, fetch latest posts, and display them in a list
  return (
    <div>
      <ListItem button key={"All_Posts"} onClick={() => { handleClickOpen(); props.getAllData() }}>
        <ListItemIcon><InfoIcon htmlColor="rgb(244,67,54)" color="primary"/></ListItemIcon>
        <ListItemText primary={"All Posts"} />
      </ListItem>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" className={classes.title}>
              All Blog Posts
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {
          // if props.array if present map it, and create a new list item with title and author and an onclick
          //  that onclick handles; close dialog, close sidebar and display only the currently selected article
          props.array && props.array.items && props.array.items.map((item) =>
            <>
              <ListItem key={item.fields.title} button>
                <ListItemText primary={item.fields.title} secondary={item.fields.author} onClick={() => { handleClose(); props.showSelected(item.fields.title); props.close() }} />
                <ListItemAvatar children={<i>{item.fields.date}</i>}></ListItemAvatar>
              </ListItem>
              <Divider />
            </>
          )
          }
        </List>
      </Dialog>
    </div>
  );
}
