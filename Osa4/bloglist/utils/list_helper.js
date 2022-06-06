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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
