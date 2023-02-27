import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Header = (props) => (
  <h1>{props.text}</h1>
)

const Statistics = (props) => {
  
  const total = props.good + props.bad + props.neutral
  const avg = ((props.good * 1 + props.bad * -1) / total) % 1
  const percentage = props.good * 100 / total

  return (
    
    <>
     <div>{'good'} {props.good}</div>
     <div>{'neutral'} {props.neutral}</div>
     <div>{'bad'} {props.bad}</div>
     <div>{'all'} {total}</div>
     <div>{'average'} {avg}</div>
     <div>{'positive'} {percentage + ' %'}</div>
    </>
  )
    
  }


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  
  // click handlers
  const feedbackGood = () => {
    setGood(good + 1)
  }

  const feedbackNeutral = () => {
    setNeutral(neutral + 1)
  }

  const feedbackBad = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <Header text={'give feedback'}/>
      <Button handleClick={feedbackGood} text={'good'}/> 
      <Button handleClick={feedbackNeutral} text={'neutral'}/> 
      <Button handleClick={feedbackBad} text={'bad'}/> 
      <Header text={'statistics'}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App