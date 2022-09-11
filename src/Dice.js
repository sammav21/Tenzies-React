import React from "react";

export default function Dice(props){
    const dieColor = {
        backgroundColor: props.locked === false ? "#FFFFFF" : "#59E391"}
    return(
        <div className="DieContainer" style={dieColor} onClick={props.lockClick}>{props.value}</div>
    )
}