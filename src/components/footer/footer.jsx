import React from 'react'
import Box from '@material-ui/core/Box';
import Spinner from '../material-spinner/spinner';

function Footer(props){

    return(
        <Box boxShadow={3} marginTop="10px" height="60px" display="flex" alignItems="center" justifyContent="center">
            {!props.contentMsg ? <Spinner></Spinner> : props.contentMsg}
        </Box>
    )
}

export default Footer;