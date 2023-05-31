const Notification = ({ content }) => {
  if (content === null) {
    return null
  }

  return (
    <div className={content[0]}>
      {content[1]}
    </div>
  )
}

export default Notification