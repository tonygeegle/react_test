import React, { useState, useEffect } from 'react';
// console log：
// component renders.
// exec effect
// receive new state
// component renders.
// clearTimeout
// exec effect
// receive new state
// component renders.
// clearTimeout
// exec effect
export default function Clock() {
    const [time, setTime] = useState(new Date().toTimeString());

    useEffect(() => {
        console.log('exec effect'); 
        const lazy = setTimeout(() => {
            console.log('receive new state');   
            setTime(new Date().toTimeString())
        }, 3000);

        return () => {
            console.log('clearTimeout'); 
            clearTimeout(lazy)
        };
    })
    console.log('component renders.');   
    return (
        <div>
            <h3>{time}</h3>
        </div>
    );
}
