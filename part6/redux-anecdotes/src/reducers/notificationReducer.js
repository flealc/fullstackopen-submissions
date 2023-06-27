import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return action.payload
    }
  }
})

export const { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (text, timeout) => {
  return dispatch => {
    dispatch(createNotification(text))
    setTimeout(() => {
    dispatch(removeNotification(''))
    }, timeout * 1000)
  }
  
}
export default notificationSlice.reducer