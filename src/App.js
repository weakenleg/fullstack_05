import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

      blogService.getAll().then((blogs) => {
        setBlogs(blogs)
      })
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(null)

      blogService.getAll().then((blogs) => {
        setBlogs(blogs)
      })
    } catch (exception) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
  }
  const handleLike = async (blogId) => {
    try {
      const response = await blogService.like(blogId);
      const updatedBlog = response.data;
      
      setBlogs(blogs.map(blog => blog.id !== blogId ? blog : updatedBlog));
    } catch (error) {
      console.log('Failed to like blog:', error);
    }
  };
  

  return (
    <div>
      <h2>Bloglist</h2>
      <Notification message={message} error={errorMessage} />

      {user === null ? (
        <div>
          <h2>Login</h2>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </div>
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>

          <Togglable buttonLabel="Create New Blog">
            <BlogForm
              setBlogs={setBlogs}
              setMessage={setMessage}
              setErrorMessage={setErrorMessage}
            />
          </Togglable>

          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              user={user} // Pass the 'user' prop here
              setBlogs={setBlogs}
              setMessage={setMessage}
              setErrorMessage={setErrorMessage}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App





