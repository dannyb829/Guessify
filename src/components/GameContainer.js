
import { useState, useEffect } from "react";
import { useDocumentTitle } from "./utilites";
import SongQuestion from "./SongQuestion";
import { fetchConfigObj, STAT_URL } from "./utilites";
import { useNavigate } from "react-router-dom"



function GameContainer({setPlayerData, token, playerData, resetPlayerData, correctAnswers, setCorrectAnswers, isHard}) {

    //full gametimer, player has 60 seconds to guess as many songs as possible
    const [gameTimer, setGameTimer] = useState(isHard ? 5 : 10) 

    const [gameOver, setGameOver] = useState(false) 
    const navigate = useNavigate()
    useDocumentTitle('GUESSIFY GAME TIME')

    useEffect(() => {
        setCorrectAnswers([]);
    },[])
   
    useEffect(() => { //retrieves initial song data
       const timeID = setTimeout(() => {
        if (gameTimer > 0) {
        setGameTimer(gameTimer - 1)
        // console.log(gameTimer)
        }
        else{
            setGameOver(true)
            handlePOSTRecord()
        }
      },1000) ;
      return () => {clearTimeout(timeID)}  
        
    }, [gameTimer])

    

    function handlePOSTRecord(){

       fetch(STAT_URL, fetchConfigObj('POST', {...playerData, score: playerData.totalcorrect * 5, mode: isHard ? "Hard" : "Normal"}))
       .then(resp => {if (resp.ok) navigate("/Leaderboard")} )

    }

 

    
    return (
        <div>
            <img style={{maxWidth:'30%'}} src='/images/guess this song.png' alt='Guess this song' />

            <p>Your name: {playerData.username}</p>


           {isHard ? <h4>This is Hard Mode..good luck</h4> : <h4>This is Normal mode</h4>} 

            {!gameOver? <SongQuestion isHard={isHard} token={token} setPlayerData={setPlayerData} correctAnswers={correctAnswers} setCorrectAnswers={setCorrectAnswers}/> : <p>Posting Score...</p>}}

            
        </div>
    )
}

export default GameContainer