import { createContext, useReducer, useContext } from "react"
import storageService from "./services/storage"



const userReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "CLEAR":
      return null
    default:
      return storageService.loadUser()
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, storageService.loadUser())
  return (
    <UserContext.Provider value={ [user, userDispatch] }>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[1]
}

export default UserContext