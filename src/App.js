import React from 'react';
import './App.css';
import Dice from './Dice';
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
import RollCount from './RollCount';

function App() {

  const [dice, setDice] = React.useState(newNumbers())
  const [tenzi, setTenzi] = React.useState(false)
  const [rollCount, setRollCount] = React.useState(0)

  //tenzi value dependent on dice value all equal + all dice locked
  React.useEffect(() => {
    const anyValue = dice[0].value
    const allEqual = dice.every(die => die.value === anyValue)
    const allLocked = dice.every(die => die.locked)
    if (allEqual && allLocked){
      setTenzi(true)
    } 
  }, [dice])

function newDie(){
  return{
    value: Math.ceil(Math.random() * 6),
    locked: false,
    id: nanoid()
  }
}

  function newNumbers(){
    const newValues = []
    for (var i = 0; i < 10; i++){
      newValues.push(newDie())
  }
    return newValues
  }

 
  function rollDice(){
    if (!tenzi){
    setDice(prevDie => prevDie.map(die => {
      return die.locked ? die : newDie()}))
      setRollCount(prevValue => prevValue + 1)
    } else {
      setDice(newNumbers())
      setTenzi(false)
      setRollCount(0)
    }
  }

 


  function lockClick(id){
    setDice(prevDie => prevDie.map(die => {
        return die.id === id ? {...die, locked: !die.locked} : die
      })
    )
  }

  const eachDie = dice.map(die => (
    <Dice 
    key={die.id} 
    value={die.value} 
    locked={die.locked} 
    lockClick={() => lockClick(die.id)} 
    />
  ))

  
  return (
    <div className="AppContainer">

    {tenzi && <Confetti />}
    <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
    </p>

    <div className='DiceContainer'>{eachDie}</div>

    <div className="btn-counter">
    <button onClick={rollDice}>{tenzi ? "New Game" : "Roll"}</button>
    <RollCount 
    value={rollCount}/>
    </div>

    </div>
  );
}

export default App;
