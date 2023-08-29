import { createSlice } from "@reduxjs/toolkit"

const initialState = { message: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      return { message: action.payload.content, type: action.payload.type }
    },
    clearNotification(state, action) {
      return { message: null }
    }
  }

})

export const notifyWith = (content, type = 'info') => {
  
  return async dispatch => {
    dispatch(createNotification({ content, type }))

    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
  }
}
export const {createNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer