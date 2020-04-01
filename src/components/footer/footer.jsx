import React from 'react'
import Box from '@material-ui/core/Box';
import Spinner from '../material-spinner/spinner';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import red from '@material-ui/core/colors/red';

function Footer(props){

    // material ui theme
    const mainTheme = createMuiTheme({
        palette: {
        primary: red,
        secondary: {
            main: '#ffffff',
        },
        }
    });

    // returns a box with a spinner inside. 
    // if contentMsg becomes defined (it does when there are no more content to fetch), display that instead
    return(
        <ThemeProvider theme={mainTheme}>
            <Box boxShadow={3} marginTop="10px" height="60px" display="flex" alignItems="center" justifyContent="center">
                {!props.contentMsg ? <Spinner color={red}></Spinner> : props.contentMsg}
            </Box>
        </ThemeProvider>
    )
}

export default Footer;