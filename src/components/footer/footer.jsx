import React from 'react'
import Box from '@material-ui/core/Box';
import Spinner from '../material-spinner/spinner';

function Footer(props){

    // returns a box with a spinner inside. 
    // if contentMsg becomes defined (it does when there are no more content to fetch), display that instead
    return(
        <Box boxShadow={3} marginTop="10px" height="60px" display="flex" alignItems="center" justifyContent="center">
            {!props.contentMsg ? <Spinner></Spinner> : props.contentMsg}
        </Box>
    )
}

export default Footer;