import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Bloglist from './components/Bloglist';
import LoginForm from './components/LoginForm';
import LoggedUser from './components/LoggedUser';
//import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import usersService from './services/users';
import Users from './components/Users';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setMessage] = useState('');

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    console.log(user);
    console.log(users);
    console.log(Users);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      console.log('setted ', user);
      blogService.setToken(user.token);
    }

    const fetchBlogs = async () => {
      const newBlogs = await blogService.getAll();
      setBlogs(newBlogs);
    };
    fetchBlogs();

    const fetchUsers = async () => {
      const newUsers = await usersService.getAll();
      setUsers(newUsers);
    };
    fetchUsers();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setMessage('Wrong username or password!');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const blogsList = () => (
    <Bloglist
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      errorMessage={errorMessage}
      setMessage={setMessage}
      user={user}
      setUser={setUser}
      blogs={blogs}
      setBlogs={setBlogs}
      handleLogin={handleLogin}
    />
  );

  const userList = () => <Users users={users} />;

  const loggedUser = () => {
    return (
      <LoggedUser
        user={user}
        setUser={setUser}
        setMessage={setMessage}
        setBlogs={setBlogs}
      />
    );
  };

  const loginForm = () => {
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />;
  };

  return (
    <Router>
      <section>
        <Link to='/'>HOME</Link>
        <Link to='/users'>USERS</Link>
      </section>

      <header>
        <h2>Blogs</h2>
      </header>

      <div>{user ? loggedUser() : loginForm()}</div>

      <Routes>
        <Route path='/users' element={<div>{userList()}</div>} />
        <Route path='/' element={<div>{blogsList()}</div>} />
      </Routes>

      <div>
        <i>Bloglist app, Veera Ihalainen 2022</i>
      </div>
    </Router>
  );
};

export default App;
