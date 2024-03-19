import { Button, Flex, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import '../sass/Home.scss'
import { Pen, ThreeDotsVertical, Trash, XLg } from 'react-bootstrap-icons'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeNote } from '../Redux/Store'
import { DeleteData, WindowWD } from '../Fetch'
import { updateNote } from '../Redux/Actions'


const BoxComp = ({ code, radio, heading, content, id, index }) => {
    const dispatch = useDispatch();
    const WindowWid = WindowWD();
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
    const [updatedData, setUpdatedData] = useState({
        id: id,
        username: code,
        heading: heading,
        content: content,
        radio: radio
    })
    const updateChange = (e) => {
        const { name, value } = e.target
        setUpdatedData(prev => ({ ...prev, [name]: value }))
    }
    const UpdateData = () => {
        onClose()
        dispatch(updateNote(id, updatedData))
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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = useState('lg')
    const OpenModal = (up) => {
        if (up === 'update') {
            onOpen()
            setSize(null)

        }
        else {
            setSize(WindowWid < 650 ? 'xs' : 'lg')
            onOpen()
        }

    }

    if (heading) {
        setTimeout(() => {
            setStater(false)
        }, 600);
        return (
            <>
                <div style={ClrSet(radio)}
                    className={`BoxClr ${radio} ${Deleted === index && 'Deleted'} ${Starter && 'Starter'}`} key={index}>

                    <div className={'headingTop'} >
                        <Heading className='heading' margin={'0 10px'}>{UpperText(heading)}</Heading>
                        <Flex onClick={() => OpenActive(index)} className={active === index ? `MenuIco ${radio} active` : `MenuIco ${radio}`} >
                            {active === index &&
                                <>
                                    <Trash onClick={() => handleRemove(id, index, code)} fontSize={'1rem'} />
                                    <Pen onClick={() => OpenModal('update')} />
                                    <XLg />
                                </>
                            }
                            {active !== index && <ThreeDotsVertical />}
                        </Flex>
                    </div>
                    <Text onClick={OpenModal} className='content'>
                        {content}
                    </Text>
                </div>

                <Modal onClose={onClose} size={size ? size : 'xs'} isOpen={isOpen}>
                    <ModalOverlay />
                    <ModalContent height={size && 'calc(70% + 30px)'}>
                        <ModalHeader>{size ? UpperText(heading) : 'Update Data'}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {size ? content : (
                                <>
                                    <FormControl>
                                        <FormLabel>Heading</FormLabel>
                                        <Input name='heading' onChange={updateChange} value={updatedData.heading} placeholder='Heading...' />
                                    </FormControl>

                                    <FormControl mt={4}>
                                        <FormLabel>Content</FormLabel>
                                        <Textarea name='content' onChange={updateChange} value={updatedData.content} placeholder='Content...' />
                                    </FormControl>
                                </>
                            )}
                        </ModalBody>
                        <ModalFooter gap={'1rem'}>
                            {!size && <Button colorScheme='blue' onClick={UpdateData}>Update</Button>}
                            <Button onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }

}


export default BoxComp