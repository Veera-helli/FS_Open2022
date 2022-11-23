//import Notification from './Notification';
import { useState } from 'react';

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
    console.log(`not logged in visibility: ${visible}`);
  };

  return (
    <div>
      <button
        id='init-login'
        style={hideWhenVisible}
        onClick={toggleVisibility}>
        login
      </button>
      <div style={showWhenVisible}>
        <div>
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                id='username'
                type='text'
                value={username}
                name='Username'
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                id='password'
                type='password'
                value={password}
                name='Password'
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button id='login-button' type='submit'>
              login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
