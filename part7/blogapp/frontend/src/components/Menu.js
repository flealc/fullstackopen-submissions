import React, {useState}  from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearLogin } from '../reducers/loginReducer'
import storageService from '../services/storage'

import { notifyWith } from '../reducers/notificationReducer'



const Menu = ({ user }) => {

  const [active, setActive] = useState('blogs')

  const logout = async () => {
    dispatch(clearLogin())
    storageService.removeUser()
    dispatch(notifyWith("logged out"))
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleItemClick = (route, item) =>{
    navigate(route)
    setActive(item)
  }

  
    return (
      <div>
        <div className="ui pointing secondary menu">
          <a 
            className={active === 'blogs' ? 'active item' : 'item'}
            onClick={() => handleItemClick('/', 'blogs')}>
              Blogs
          </a>
          <a 
            className={active === 'users' ? 'active item' : 'item'}
            onClick={() => handleItemClick('/users', 'users')}>
              Users
          </a>
          
          <div className="right menu">
            <a className="item" style={{background: "lightgray"}}>{user.name} logged in</a>
            <a className="item" onClick={logout}>Logout</a>
          </div>
        </div>
      </div>
    )
  }

  export default Menu