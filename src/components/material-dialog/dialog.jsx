import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, ListItemText, ListItem, List, Divider, AppBar, Toolbar, Typography, Slide, IconButton, ListItemIcon } from '@material-ui/core/';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ListItem button key={"All_Posts"} onClick={() => { handleClickOpen(); props.getAllData() }}>
        <ListItemIcon><InfoIcon /></ListItemIcon>
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
          {props.array && props.array.items && props.array.items.map((item) =>
            <>
              <ListItem key={item.fields.title} button>
                <ListItemText primary={item.fields.title} secondary={item.fields.author} onClick={() => { handleClose(); props.showSelected(item.fields.title); props.close() }} />
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
