import axios from 'axios'
import React from 'react'

const Test = () => {
    const Data = {
        username: 'Arulkumar',
        password: 'arul9976'
    }
    axios.post(`https://notes-app-p1-850e8af108bc.herokuapp.com/api/isUser`, Data)
        .then((res) => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    return (
        <div>Test</div>
    )
}

export default Test