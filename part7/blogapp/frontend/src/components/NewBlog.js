import { useState } from "react"

const BlogForm = ({ create }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")


  const handleSubmit = async (event) => {
    event.preventDefault()
    create({title, author, url})
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <div>
      <h4>Create a new blog</h4>

      <form className="ui form" onSubmit={handleSubmit}>
        <div className="four wide field">
          <label htmlFor="title">title</label>
          <input
            id="title"
            placeholder="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="four wide field">
        <label htmlFor="author">author</label>
          <input
            id="author"
            placeholder="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className="four wide field">
        <label htmlFor="url">url</label>
          <input
            id="url"
            placeholder="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" className="ui basic compact button mini">create</button>
      </form>
    </div>
  )
}

export default BlogForm
