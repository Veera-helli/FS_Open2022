const Users = ({ users }) => {
  console.log(users);
  // {users.map((user) => (
  //     <p>{user?.name}</p>
  //   ))}
  return (
    <table>
      <thead>
        <td>
          <b>Name</b>
        </td>
        <td>
          <b>Blogs Created</b>
        </td>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.username}>
            <td>{user?.name}</td>
            <td>bllogs {user?.blogs?.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Users;
