import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}){

    const [timerExpired, setTimerExpired] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const timer = useRef();
    const dialog = useRef();

    function handleStart() {
         timer.current = setTimeout( () => {
            setTimerExpired(true);
            dialog.current.showModal();
        }, targetTime * 1000);
        setTimerStarted(true); 
    }

    function handleStop() {
        clearTimeout(timer.current)
    }
    return (
       
        <>
         <ResultModal ref={dialog} targetTime={targetTime} result ="lost"/>
        <section className="challenge">
            <h2>{title}</h2>
            {timerExpired && <p>You lost !!</p>}
            <p className="challenge-time">
                {targetTime} second{targetTime>1 ? 's' : ''};
            </p>
            <p>
                <button onClick={timerStarted ? handleStop : handleStart}>
                    {timerStarted ? 'Stop': 'Start'} Challenge
                </button>
            </p>
            <p className={timerStarted ? 'active': undefined}>
                {timerStarted? 'Timer Running...' : 'Timer Inactive'}
            </p>
        </section>
        </>
    );
}