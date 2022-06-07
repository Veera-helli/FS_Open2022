// Requiring the lodash library
const lodash = require('lodash');

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

//favoriteBlog
const favoriteBlog = (blogs) => {
  const reducer = (favorite, item) => {
    return favorite.likes >= item.likes ? favorite : item;
  };

  return blogs.length === 0 ? NaN : blogs.reduce(reducer, 0);
};

const mostBlogs = (bloglist) => {
  const bloggerObj = lodash.countBy(bloglist, 'author');
  const reducer = (mostBlogger, item) => {
    return mostBlogger.blogs >= item.blogs ? mostBlogger : item;
  };

  const ret = Object.entries(bloggerObj)
    .map((p) => ({
      author: p[0],
      blogs: p[1],
    }))
    .reduce(reducer, {});

  //console.log(`length ${bloglist.length}: ${JSON.stringify(ret)}`);

  return ret;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
