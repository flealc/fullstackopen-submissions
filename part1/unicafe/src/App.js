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
  <div>{props.text} {props.display}</div>
)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // log specific feedback value (1, 0, -1) to an array for average calculation
  const [average, setAverage] = useState([])

  
  // click handlers
  const feedbackGood = () => {
    setGood(good + 1)
    setAverage(average.concat(1))
  }

  const feedbackNeutral = () => {
    setNeutral(neutral + 1)
    setAverage(average.concat(0))
  }

  const feedbackBad = () => {
    setBad(bad + 1)
    setAverage(average.concat(-1))
  }


  return (
    <div>
      <Header text={'give feedback'}/>
      <Button handleClick={feedbackGood} text={'good'}/> 
      <Button handleClick={feedbackNeutral} text={'neutral'}/> 
      <Button handleClick={feedbackBad} text={'bad'}/> 
      <Header text={'statistics'}/>
      <Counter text={'good'} display={good}/>
      <Counter text={'neutral'} display={neutral}/>
      <Counter text={'bad'} display={bad}/>
      <Counter text={'all'} display={good + bad + neutral}/>
      <Counter text={'average'} display={average.reduce((acc, c) => acc + c, 0) / average.length}/>
      <Counter text={'positive'} display={good * 100 / (bad + good + neutral) + ' %'}/>
      
    </div>
  )
}

export default App