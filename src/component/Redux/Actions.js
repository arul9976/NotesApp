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
    const errors = {
        username: isCretencials.username,
        email: isCretencials.email,
        password: isCretencials.password,
        msgError: null,
        isLogged: false,
        isLogin: true
    }
    return async (dispatch) => {
        if (FetchMethod === 'userDataAdd') {
            await axios.post(`https://notes-app-p1-850e8af108bc.herokuapp.com/${FetchMethod}`, isCretencials)
                .then((response) => {
                    dispatch(addData(response.data))
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            await axios.post(`https://notes-app-p1-850e8af108bc.herokuapp.com/api/${FetchMethod}`, isCretencials)
                .then(res => {
                    if (res.status === 200) {
                        if (FetchMethod === 'isUser' || FetchMethod === "SignUser") {
                            errors.msgError = 'success'
                            errors.isLogged = true;
                            setisCretencials(errors)
                            localStorage.setItem("Token", res.data)
                            localStorage.setItem('un', isCretencials.username)
                            axios.get(`https://notes-app-p1-850e8af108bc.herokuapp.com/userDataList/${isCretencials.username}`)
                                .then(response => {
                                    dispatch(fetchedData(response.data))
                                })
                        }
                        else if (FetchMethod === 'validateToken') {
                            localStorage.setItem('un', res.data.username)
                            axios.get(`https://notes-app-p1-850e8af108bc.herokuapp.com/userDataList/${res.data.username}`)
                                .then(response => {
                                    dispatch(fetchedData(response.data))
                                })
                            errors.username = res.data.username
                            errors.isLogged = true;
                            setisCretencials(errors)

                        }


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
                }).catch(err => {
                    console.log(err);
                })
        }

    }


};
