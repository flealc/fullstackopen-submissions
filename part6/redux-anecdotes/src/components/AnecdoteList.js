import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === null) {
      return anecdotes
    }

    return anecdotes.filter(anecdote => anecdote.content.match(filter))
  })
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`you voted '${content}'`))
    setTimeout(
      () => { dispatch(removeNotification(null)) 
    }, 5000)
  }

  return (
    <div>
      {anecdotes.sort((a1, a2) => a2.votes - a1.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
} 

export default AnecdoteList
