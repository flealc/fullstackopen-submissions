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

module.exports = {
  dummy,
  totalLikes
}