import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import storageService from "../services/storage"

const initialState = storageService.loadUser()

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin(state, action) {
      return action.payload
    },
    clearLogin(state, action) {
      return null
    }
  }
})

export const {setLogin, clearLogin} = loginSlice.actions

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    dispatch(setLogin(user))
    storageService.saveUser(user)
  }
}
export default loginSlice.reducer