// actions.js
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Action to add a new note
export const fetchedData = createAction('notes/fetchedData', (data) => ({
    payload: {
        id: Date.now(),
        data
    }
}))
export const addNote = createAction('notes/addNote', (data) => ({
    payload: data
}));

export const addData = createAction('notes/addData', (data) => ({
    payload: data
}))
// Action to update an existing note
export const updateNote = createAction('notes/updateNote', (id, data) => ({
    payload: {
        id,
        data
    }
}));

export const loggedOut = createAction('notes/loggedOut', (data) => ({
    payload: data
}))

// Action to remove a note
export const removeNote = createAction('notes/removeNote');

export const FetchData = ({ FetchMethod, isCretencials, setisCretencials }) => {
    return async (dispatch) => {
        if (FetchMethod === 'userDataAdd') {
            await axios.post(`https://notes-app-p1-850e8af108bc.herokuapp.com/${FetchMethod}`, isCretencials)
                .then((response) => {
                    dispatch(addNote(response.data))
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            const errors = {
                username: isCretencials.username || "",
                email: isCretencials.email || "",
                password: isCretencials.password || "",
                msgError: null,
            }
            await axios.post(`https://notes-app-p1-850e8af108bc.herokuapp.com/api/${FetchMethod}`, isCretencials)
                .then(res => {
                    if (res.status === 200) {
                        setisCretencials(errors)
                        if (FetchMethod === 'isUser' || FetchMethod === "SignUser") {
                            localStorage.setItem("Token", res.data)
                        }
                        localStorage.setItem('un', FetchMethod === 'validateToken' ? res.data.username : isCretencials.username)
                        axios.get(`https://notes-app-p1-850e8af108bc.herokuapp.com/userDataList/${FetchMethod === 'validateToken' ? res.data.username : isCretencials.username}`)
                            .then((response) => {
                                dispatch(fetchedData(response.data))
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    }
                    else if (FetchMethod === 'isUser') {
                        if (res.data === "Incorrect Password") {
                            errors.msgError = res.data
                            setisCretencials(errors)
                        }
                        else if (res.data === "User Not Found") {
                            errors.msgError = res.data
                            setisCretencials(errors)
                        }

                    }
                    else if (FetchMethod === "validateToken") {
                        errors.msgError = "Token Expired or Invalid"
                        setisCretencials(errors)
                        localStorage.removeItem("Token")
                        localStorage.removeItem("un")
                    }
                }).catch(err => {
                    console.log('error ---', err);
                    setisCretencials(errors)
                    dispatch(fetchedData([{ id: 1, username: 'Arulkumar', heading: 'fwefw ', content: 'erfrf gtg4g 45g45g ', radio: 'work' }, { id: 2, username: 'Arulkumar', heading: 'rtgtrg ', content: 'erfrf grtgrtg grtgrtgrtgrtg ', radio: 'personal' }]))
                })
        }
    }


};
