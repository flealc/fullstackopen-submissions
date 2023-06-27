import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const anecdoteToUpdate = action.payload
      return state.map(
        a => a.id !== anecdoteToUpdate.id ? a : anecdoteToUpdate
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { appendAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = await anecdoteService.updateAnecdote(
      anecdote.id,
      { 
      ...anecdote, 
      votes: anecdote.votes + 1
      }
    )
    dispatch(updateAnecdote(changedAnecdote))
  }
}
export default anecdoteSlice.reducer