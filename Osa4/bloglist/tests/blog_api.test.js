const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

//4.8
test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

// 4.9
test('ids are defined', async () => {
  const blogs = await helper.blogsInDb();
  blogs.forEach((blog) => expect(blog.id).toBeDefined());
});

// 4.10
test('a valid note can be added ', async () => {
  const newBlog = {
    title: 'Adding blog',
    author: 'Will Addthis',
    url: 'https://reactpatterns.com/',
    likes: 0,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((n) => n.title);
  expect(titles).toContain('Adding blog');
});

// 4.11
test('blog without likes has default likes of 0', async () => {
  const newBlog = {
    title: 'I have no likes',
    author: 'Will Addthis',
    url: 'https://reactpatterns.com/',
  };

  const savedBlog = await api.post('/api/blogs').send(newBlog).expect(201);
  console.log(JSON.parse(savedBlog.text));
  expect(JSON.parse(savedBlog.text).likes).toEqual(0);
});

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Will Addthis',
    url: 'https://reactpatterns.com/',
    likes: 0,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
