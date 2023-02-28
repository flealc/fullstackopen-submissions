import { useState } from 'react'


const Header = (props) => (
  <h1>{props.text}</h1>
)

const Button = (props) => (
  <button onClick={props.handler}>
    {props.text}
  </button>
)

const Anecdote = (props) => (
  <div>
      {props.anecdote}
    </div>
)

const VoteCount = (props) => {

  
  if (props.votes === 0) {
    return (
      <div>
        no votes yet
      </div> 
    )
  }
  
  if (props.votes === 1) {
    return (
      <div>
      has {props.votes} vote
    </div>
    )
    
  }
  return (
    <div>
      has {props.votes} votes
    </div>
  )
  
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const [top, setTop] = useState(0);

  const nextHandler = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  
  const voteHandler = () => {
    const copy = [...votes]
    copy[selected] += 1
    if (copy[selected] > copy[top]) {
      const updateTop = selected
      setTop(updateTop)
    }
    setVotes(copy)
    
  }

  return (
    <>
    <Header text='Anecdote of the day'/>
    <Anecdote anecdote={anecdotes[selected]}/>
    <VoteCount votes={votes[selected]}/>
    <Button handler={voteHandler} text={'vote'}/>
    <Button handler={nextHandler} text={'next anecdote'}/>
    <Header text='Anecdote with most votes'/>
    <Anecdote anecdote={anecdotes[top]}/>
    <VoteCount votes={votes[top]}/>
    </>
  )
}

export default App