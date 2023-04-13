var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  const likesReducer = (sum, blog) => {
    return blog.likes
      ? sum + blog.likes
      : sum
  }

  const likes = blogs.reduce(
    likesReducer,
    0
  )

  return blogs.length === 0
    ? 0
    : likes
}

const favoriteBlog = (blogs) => {

  const mostLikedReducer = (mostLiked, blog) => {

    if (!blog.likes) {
      return mostLiked
    }

    return (blog.likes > mostLiked.likes || !mostLiked.likes)
      ? blog
      : mostLiked
  }

  return blogs.length === 0
    ? {}
    : blogs.reduce(mostLikedReducer, {})
}

const mostBlogs = (blogs) => {
  const sortedByAuthor = _.groupBy(blogs, 'author')
  const authorWithMost = _.maxBy(_.keys(sortedByAuthor), (author) => sortedByAuthor[author].length)

  return blogs.length === 0
    ? {}
    : {
      author: authorWithMost,
      blogs: sortedByAuthor[authorWithMost].length
    }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}