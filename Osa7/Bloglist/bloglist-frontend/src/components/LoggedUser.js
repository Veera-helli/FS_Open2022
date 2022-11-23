const LoggedUser = ({ user, setUser }) => {
  return (
    <div>
      <p>{user?.name} logged in</p>
      <button
        onClick={() => {
          window.localStorage.removeItem('loggedBlogappUser');
          setUser(null);
        }}>
        log out
      </button>
    </div>
  );
};

export default LoggedUser;
