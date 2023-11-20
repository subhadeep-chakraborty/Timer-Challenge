import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}){

    // const [timerExpired, setTimerExpired] = useState(false);
    // const [timerStarted, setTimerStarted] = useState(false);
    const timer = useRef();
    const dialog = useRef();
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    const isActive = timeRemaining >0 && timeRemaining <targetTime *1000;

    if(timeRemaining <=0){
        clearInterval(timer.current);
       
        dialog.current.open();
        
    }

    function handleReset(){
        setTimeRemaining(targetTime * 1000);
    }

    function handleStart() {
         timer.current = setInterval( () => {
            setTimeRemaining(prevValue => prevValue - 10)
        }, 10);
        
        // setTimerStarted(true); 
    }

    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current); 
    }
    return (
       
        <>
         <ResultModal ref={dialog} targetTime={targetTime} 
         onReset = {handleReset}
         remainingTime= {timeRemaining}
         result ="lost"/>
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime>1 ? 's' : ''};
            </p>
            <p>
                <button onClick={isActive ? handleStop : handleStart}>
                    {isActive ? 'Stop': 'Start'} Challenge
                </button>
            </p>
            <p className={isActive ? 'active': undefined}>
                {isActive? 'Timer Running...' : 'Timer Inactive'}
            </p>
        </section>
        </>
    );
}