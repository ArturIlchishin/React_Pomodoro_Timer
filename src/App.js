import React, {useState, useRef} from 'react'
import { FiPlayCircle, FiPauseCircle, FiRotateCcw } from "react-icons/fi";
import './App.css';


function App() {

  const [theme, setTheme] = useState('worktime');
  const [count, setCount] = useState(1500);
  const timeRef = useRef(null);
  
  const startCount = () => {
      if(!timeRef.current) {
          timeRef.current = setInterval(changingTime, 1000);
      }
  }

  const pauseCount = () => {
      clearInterval(timeRef.current);
      timeRef.current = false;
  }

  const resetTime = () => {
      clearInterval(timeRef.current);
      setCount(1500);
      timeRef.current = false;
  }
  
  const changingTime = () => setCount((state) => {
     if (state === 1) {clearInterval(timeRef.current)}
     return state - 1;
  })
  
  const renderingTime = () => {
      const minutes = Math.floor(count / 60);
      const seconds = count % 60;
      let finalCountdown; 
      count % 60 >= 10 ? 
          finalCountdown = `${minutes}:${seconds}` : 
          finalCountdown = `${minutes}:0${seconds}`;       
      console.log(finalCountdown, count);
      return finalCountdown;
      
  }

  return (   
      <div className={`container ${theme === 'worktime' ?
      'worktime' : 'chilltime'}`}>
      <h1>Pomodorro Timer</h1>
        <div className='painel'>
          <p onClick={()=>{setTheme('worktime');
                          setCount(1500);
                          pauseCount()}} 
                          id='work' 
                          className="active">Work</p>
          <p onClick={()=>{setTheme('chilltime'); 
                          setCount(300);
                          pauseCount()}} 
                          id='break'>Chill</p>
        </div>
        <section>
                <div className="container">
                <div className="timer">
                    <div className="circle">
                        <div className="time">
                            <p className="countdown">{renderingTime()}</p>
                        </div>
                    </div>
                </div>
                        <div className="controls">
                            <button onClick={startCount} id="start"><FiPlayCircle className='icon'/></button>
                            <button onClick={pauseCount} id="pause"><FiPauseCircle className='icon'/></button>
                            <button onClick={() => {resetTime(); setTheme('worktime')}} id="restart"><FiRotateCcw className='icon'/></button>
                        </div>
                </div>    
            </section>
      </div>
  );
}

export default App;
