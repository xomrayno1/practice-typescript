import { AppBar, Toolbar, Box, Typography, FormControl, Select, MenuItem, Button, Chip } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import WelcomeMessage from './WelcomeMessage';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ProgressContext } from '../contexts/ProgressContext';
import { ThemeContext } from '../contexts/ThemeContext';
import Login from './Login';
import { AuthContext } from '../contexts/AuthContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    positionSelect: {
      color: 'white',
      borderBottom: '1px solid white',
    },
  })
);


const Navbar = () => {
  //styles
  const classes = useStyles();

  //context
  const {lastTime, status} = useContext(ProgressContext);

  const { authInfo: { isAuthenticated }, toggleAuth }  = useContext(AuthContext);

  const {theme} = useContext(ThemeContext);

  const [time, setTime] = useState<Date>(() =>  new Date(Date.now()));

  const [position, setPosition] = useState<string>('Full-stack dev');

  // state
  const [loginOpen, setLoginOpen] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date(Date.now())), 1000)
    return () => clearInterval(timer)
  },[]) 

  const onPositionChange = (event: React.ChangeEvent<{value: unknown}>) =>
    setPosition(event.target.value as string);

  return (
    <AppBar position="static" color={theme}>
      <Toolbar>
        <Box display="flex" justifyContent="space-between" alignItems="center" width={1} py={2}>
          <Typography variant="h6">My Movie</Typography>
          <Box textAlign="center">
            <WelcomeMessage position={position} />
            <Chip label={`Last time working on this project : ${lastTime} - Status: ${status}`}/>
            <Box mt={1}>
              <FormControl>
                <Select
                  value={position}
                  onChange={onPositionChange}
                  className={classes.positionSelect}
                >
                  <MenuItem value="Full-stack dev">Full-stack dev</MenuItem>
                  <MenuItem value="Front-end dev">Front-end dev</MenuItem>
                  <MenuItem value="Back-end dev">Back-end dev</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box textAlign='center'>
            <Box my={1}>
                <Typography variant='h6'>{time.toUTCString()}</Typography>
            </Box>
            <Button variant='contained' onClick={isAuthenticated ? () => toggleAuth('') :  () => setLoginOpen(true)}>
              { isAuthenticated ? 'Logout' : 'Login'}
            </Button>
          </Box>
          <Login isOpen={loginOpen} handleClose = {setLoginOpen} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
