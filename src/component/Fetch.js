
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
        await axios.delete(`${apiUrl}/userData/RemoveData/${code}/${id}`)
    }
    catch {
        console.log('errr deletion');
    }
}

export const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

export const UpdateData = async (data) => {
    try {
        await axios.put(`${apiUrl}/userData/UpdateUserData`, data)
    }
    catch {
        console.log('errr updation',data);
    }
}