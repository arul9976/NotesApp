
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { selectNotes } from './Redux/Store'
import axios from 'axios';

const navs = ["Home", "About", "Skills", "Contact"]
const Filters = ['Work', 'Personal', 'Important']

const isValidEmail = (email) => {
    const emailRegax = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegax.test(email)
}

export { isValidEmail, navs, Filters }
export const FormDataState = () => {
    const [isCretentials, setIsCretentials] = useState({
        username: '',
        email: '',
        password: '',
        msgError: null,
        isLogged: false
    })

    return [isCretentials, setIsCretentials]
}

export const FormErrorState = () => {
    const [FormError, setFormError] = useState({
        msgError: null,
        isLogged: false,
        isLogin: true,
    })

    return [FormError, setFormError]
}

export const ReduxData = () => {
    const DataNotes = useSelector(selectNotes)
    const { trail, isLogged } = DataNotes
    return { trail, isLogged };
}

export const WindowWD = () => {
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setwindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return (() => {
            window.removeEventListener('resize', handleResize)
        })
    }, [windowWidth])

    return windowWidth;
}

export const DeleteData = async (id, code) => {
    try {
        await axios.delete(`https://notes-app-p1-850e8af108bc.herokuapp.com/userData/RemoveData/${code}/${id}`)
    }
    catch {
        console.log('errr deletion');
    }
}


export const UpdateData = async (data) => {
    try {
        await axios.put(`http://localhost:8080/userData/UpdateUserData`, data)
        console.log('success');
    }
    catch {
        console.log('errr updation',data);
    }
}