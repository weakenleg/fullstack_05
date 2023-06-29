import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../src/components/Blog'
import BlogForm from '../src/components/BlogForm'
import '@testing-library/jest-dom/extend-expect'


describe('Blog component', () => {
  test('renders title and author, but not URL or number of likes by default', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://example.com',
      likes: 10,
      user: {
        name: 'Test User',
      },
    }

    const { getByText, queryByText } = render(
      <Blog blog={blog} className="blog-component" />
    )

    // Title and author should be rendered with the specified CSS class
    expect(getByText('Test Blog')).toHaveClass('blog-component__title')
    expect(getByText('Test Author')).toHaveClass('blog-component__author')

    // URL and number of likes should not be rendered
    expect(queryByText('https://example.com')).toBeNull()
    expect(queryByText('10 likes')).toBeNull()
  })
})
describe('Blog Component', () => {
  test('renders title and author by default, shows URL and likes when clicked', () => {
    const blog = {
      title: 'Test Blog',
      author: 'John Doe',
      url: 'https://example.com',
      likes: 10,
      user: {
        name: 'Jane Smith',
      },
    }

    const component = render(<Blog blog={blog} />)
    const detailsDiv = component.container.querySelector('.blog-details')

    // By default, only the title and author should be visible
    expect(detailsDiv).toHaveStyle('display: none')

    const button = component.getByText('View')
    fireEvent.click(button)

    // After clicking the "View" button, the URL and likes should be visible
    expect(detailsDiv).not.toHaveStyle('display: none')
    expect(detailsDiv).toHaveTextContent('https://example.com')
    expect(detailsDiv).toHaveTextContent('Likes: 10')
  })
})
describe('Blog Component', () => {
  test('calls the handleLike function twice when the like button is clicked twice', () => {
    const blog = {
      title: 'Test Blog',
      author: 'John Doe',
      url: 'https://example.com',
      likes: 0,
      user: {
        name: 'Jane Smith',
      },
    }

    const handleLike = jest.fn()

    const component = render(<Blog blog={blog} handleLike={handleLike} />)
    const likeButton = component.getByText('Like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
describe('BlogForm Component', () => {
  test('calls the event handler with the correct details when a new blog is created', () => {
    const mockCreateBlog = jest.fn()

    const component = render(<BlogForm createBlog={mockCreateBlog} />)
    const titleInput = component.container.querySelector('input[name="title"]')
    const authorInput = component.container.querySelector('input[name="author"]')
    const urlInput = component.container.querySelector('input[name="url"]')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, { target: { value: 'Test Blog' } })
    fireEvent.change(authorInput, { target: { value: 'John Doe' } })
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } })
    fireEvent.submit(form)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0]).toEqual({
      title: 'Test Blog',
      author: 'John Doe',
      url: 'https://example.com',
    })
  })
})