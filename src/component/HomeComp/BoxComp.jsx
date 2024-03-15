import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import '../sass/Home.scss'
import { Pen, ThreeDotsVertical, Trash, XLg } from 'react-bootstrap-icons'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeNote } from '../Redux/Store'


const BoxComp = ({code, radio, heading, content, id, index, Added }) => {

    const dispatch = useDispatch();

    const [Starter, setStater] = useState(true)

    const [Deleted, setDeleted] = useState(null)
    const handleRemove = (id, index, code) => {
        setDeleted(index)
        DeleteData(id, code)
        setTimeout(() => {
            dispatch(removeNote(id))
            setDeleted(null)
        }, 500);
    }
    const DeleteData = async (id, code) => {
        await axios.delete(`https://notes-app-p1-850e8af108bc.herokuapp.com/userData/RemoveData/${code}/${id}`)
    }

    const UpperText = (heading) => {
        const Head = heading
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        return Head;
    }

    const [active, setActive] = useState(false)
    const OpenActive = (index) => {
        active === index ? setActive(null) : setActive(index)
    }


    const ClrSet = (radio) => {
        if (radio === 'work') {
            return { '--clr': '#f73c3c' }
        }
        else if (radio === 'personal') {
            return { '--clr': '#ebcd22' }
        }
        else if (radio === 'important') {
            return { '--clr': '#1392fa' }
        }
    }
    if (heading) {
        setTimeout(() => {
            setStater(false)
        }, 600);
        return (
            <div style={ClrSet(radio)}
                className={`BoxClr ${Deleted === index && 'Deleted'} ${radio} ${Added === index ? 'Added' : ''} ${Starter && 'Starter'}`} key={index}>

                <div className={'headingTop'} >
                    <Heading className='heading' margin={'0 10px'}>{UpperText(heading)}</Heading>
                    <Flex onClick={() => OpenActive(index)} className={active === index ? `MenuIco ${radio} active` : `MenuIco ${radio}`} >
                        {active === index &&
                            <>
                                <Trash onClick={() => handleRemove(id, index, code)} fontSize={'1rem'} />
                                <Pen />
                                <XLg />
                            </>
                        }
                        {active !== index && <ThreeDotsVertical />}
                    </Flex>
                </div>
                <Text className='content'>
                    {content}
                </Text>
            </div>
        )
    }

}


export default BoxComp