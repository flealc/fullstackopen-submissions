import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Header = (props) => (
  <h1>{props.text}</h1>
)

const Counter = (props) => (
  <div>{props.text} {props.feedbackType}</div>
)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
      <Counter text={'good'} feedbackType={good}/>
      <Counter text={'neutral'} feedbackType={neutral}/>
      <Counter text={'bad'} feedbackType={bad}/>

    </div>
  )
}

export default App