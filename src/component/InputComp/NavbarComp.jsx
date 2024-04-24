import React from 'react'
import { SendFill } from 'react-bootstrap-icons'
import './NavbarComp.scss'
import { useState } from 'react'
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { FetchData, addData } from '../Redux/Actions'
import { useDispatch } from 'react-redux'
const NavbarComp = (isActive, setTogg) => {
    const dispatch = useDispatch();

    const [Data, setData] = useState({
        username: '',
        heading: '',
        content: '',
        radio: ''
    })

    const [isClicked, setIsClicked] = useState(false)

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        Data.username = localStorage.getItem('un');

        setData((prev) => ({ ...prev, [name]: value }))

    }
    const handleSubmit = () => {
        setTogg(false);
        setIsClicked(!isClicked)
        setTimeout(() => {
            setIsClicked(false)
        }, 1000);
        dispatch(addData(Data))
        dispatch(FetchData({ FetchMethod: "userDataAdd", isCretencials: Data }))
        setData({
            username: '',
            heading: '',
            content: '',
            radio: ''
        })
    }

    return (
        <>
            <div className={`container ${(isActive) ? 'Active' : 'NULL'}`}>
                <div className="inputBar">
                    <div className="input">
                        <div className="headComp">
                            <input onChange={handleChange} value={Data.heading} name='heading' type="text" placeholder='Heading'></input>
                            <button className='sendBtn' onClick={handleSubmit}>
                                <SendFill className={`send ${isClicked && 'clicked'}`} />
                            </button>
                        </div>
                        <RadioGroup className='radioGrp'>
                            <Stack direction={'row'} flexWrap={'wrap'}>
                                <Radio name='radio' value={'work'} onChange={handleChange}>Work</Radio>
                                <Radio name='radio' value={'personal'} onChange={handleChange}>Personal</Radio>
                                <Radio name='radio' value={'important'} onChange={handleChange}>Important</Radio>
                            </Stack>
                        </RadioGroup>
                        <textarea value={Data.content} onChange={handleChange} name='content' className='textarea' placeholder='Content...' ></textarea>
                    </div>
                </div>
            </div>

        </>
    )
}

export default NavbarComp