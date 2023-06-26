import { createSlice } from '@reduxjs/toolkit'

const initialState = 'This is a notification!'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotification(state, action) {
      const newNotification = action.payload
      state = newNotification
    }
  }
})

export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer