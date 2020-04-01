import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import red from '@material-ui/core/colors/red';

// Material ui style for spinner
const useStyles = makeStyles(theme => ({
  root: {
    color: red,
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function CircularDeterminate(props) {
  // set styles and state for progress
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  // call useffect on start with function tick
  React.useEffect(() => {
    function tick() {
      // resets progress when reaching 100%
      setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }
    // tick every 20ms
    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);

  // return material ui spinner determinate with value progress
  return (
    <>
    <div className={classes.root}>
      <CircularProgress color='primary' variant="determinate" value={progress} />
    </div>
    </>
  );
}