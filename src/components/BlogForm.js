/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import blogService from '../services/blogs'
import userService from '../services/login'

const BlogForm = ({ setBlogs, setMessage, setErrorMessage, setUser }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlogObject = {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      }

      const createdBlog = await blogService.create(newBlogObject)
      setBlogs((prevBlogs) => [...prevBlogs, createdBlog])
      setNewBlog({ title: '', author: '', url: '' })
      setMessage(`Successfully created a new blog: ${createdBlog.title}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      // Fetch updated user information
      const updatedUser = await userService.getUser()
      setUser(updatedUser)
    } catch (error) {
      setErrorMessage('Failed to create a new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title:
          <input
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            name="author"
            value={newBlog.author}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            name="url"
            value={newBlog.url}
            onChange={handleBlogChange}
          />
        </div>
        <button type="submit" id="Create">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
