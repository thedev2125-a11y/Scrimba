import React from 'react'

export default function Die(props) {
    const style ={
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
  return (
        <button 
            style={style} 
            onClick={() => props.holdDice(props.id)}
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
        >
            {props.value}
        </button>
  )
}
