import { useState } from 'react';
import CreateForm from './CreateForm';
import Notification from './Notification';
import Blog from './Blog';
import blogService from '../services/blogs';

const Bloglist = ({ errorMessage, user, blogs, setBlogs, setMessage }) => {
  const [visible, setVisible] = useState(true);
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
    console.log(`logged in visibility: ${visible}`);
  };

  const addLike = async (blog) => {
    //HTTP PUT
    //console.log('adding like');
    await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 });
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  const remove = async (blog) => {
    //HTTP DELETE
    if (window.confirm(`Are you sure you want to remove ${blog.name}?`)) {
      console.log('DELETING BLOG');
      await blogService.remove(blog.id);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    }
  };

  const create = async (title, author, url) => {
    try {
      await blogService.create({
        title,
        author,
        url,
      });
      console.log('Created new blog!');
      setMessage('A new blog was added!');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (exception) {
      setMessage('Could not add a new blog');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      console.log('Create form exception!');
    }
  };

  return (
    <div>
      <Notification message={errorMessage} />
      <div>
        <div style={showWhenVisible}>
          <button onClick={toggleVisibility}>create new blog</button>
        </div>
        <div style={hideWhenVisible}>
          <CreateForm create={create} toggleVisibility={toggleVisibility} />
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>

      {blogs
        .sort((a, b) => b.likes - a.likes) //sorting to order blogs by likes
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            remove={remove}
            user={user}
          />
        ))}
    </div>
  );
};

export default Bloglist;
