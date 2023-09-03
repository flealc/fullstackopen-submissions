import { useSelector } from "react-redux/es/hooks/useSelector"

const Notification = () => {

  const info = useSelector(state => state.notification ) 
  
  if (!info.message) {
    return
  }

  const style = {
    color: info.type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  const type = info.type === "error" ? 'ui negative message' : 'ui positive message'
   return <div className={type}>{info.message}</div>
}

export default Notification
