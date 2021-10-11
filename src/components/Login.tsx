import { Dialog, TextField, DialogContent, DialogActions, Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

interface LoginProps {
  isOpen: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ isOpen, handleClose }: LoginProps) => {
  //state
  const [username, setUsername] = useState('');

  //context
  const { toggleAuth } = useContext(AuthContext);

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onLoginSubmit = () => {
    toggleAuth(username);
    setUsername('');
    handleClose(false);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={() => handleClose(!isOpen)}>
        <DialogContent>
          <TextField
            label="username"
            onChange={onUsernameChange}
            value={username}
            required
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={onLoginSubmit}
            disabled={username === ''}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;
