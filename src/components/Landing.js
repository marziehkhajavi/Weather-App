import React, { useState } from 'react';
import axios from "axios";

//Styles
import styles from "./Landing.module.css"

const Landing = () => {

    const [inputVal, setInputVal] = useState('');
    const [info, setInfo] = useState({});
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=edc228562ac0a8aa3116d41c0687cf56&units=metric`
    const [error, setError] = useState("")
    const addCity = async () => {
        await axios.get(url)
            .then(response => {
                setInfo(response.data)
                console.log(info)
            })
            .catch(error => {
                setError(error)
                console.log(error)
            })
        setInputVal('')
    };
    
    const changeHandler = (event) => {
        let text = (event.target.value)
        setInputVal(text)
    };
    
    return (
        <div className={styles.main}>
            <div className={styles.mainInput}>
            <input className={styles.input} type="text" placeholder="Search s city" value={inputVal} onChange={changeHandler}></input>
            <button className={styles.button} onClick={addCity}>Add City</button>
            </div>
                <div className={styles.container}>
                    <div className={styles.info}>
                        <div className={styles.name} >
                            <p>{info.name}</p>
                        </div>
                        <div className={styles.temp}>
                            {info.main ? <h1 >{info.main.temp.toFixed()}°C</h1> : null}
                        </div>
                        <div className={styles.weatherCondition}>
                            {info.weather ? <p>{info.weather[0].main}</p> : null}
                        </div>
                    </div>
                    
                    
                    {info.name !== undefined &&
                       <div className={styles.information}>
                         <div className={styles.tempFeels}>
                           <p>Feels Like</p>
                           {info.main ? <p className={styles.same}>{info.main.feels_like.toFixed()}°C</p> : null}
                         </div>
                         <div className={styles.humidity}>
                           <p>Humidity</p>
                           {info.main ? <p className={styles.same}>{info.main.humidity}%</p> : null}
                         </div>
                         <div className={styles.wind}>
                           <p>Wind Speed</p>
                           {info.wind ? <p className={styles.same}>{info.wind.speed.toFixed()} Km/h</p> : null}
                         </div>
                       </div>
                    }

                </div>
        </div>
    );
};

export default Landing;