import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import storageService from "../services/storage"

const initialState = storageService.loadUser()

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser(state, action) {
      return null
    }
  }
})

export const {setUser, clearUser} = userSlice.actions

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    dispatch(setUser(user))
    storageService.saveUser(user)
  }
}
export default userSlice.reducer