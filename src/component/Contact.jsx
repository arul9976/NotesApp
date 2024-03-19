import { Button, Flex, FormControl, Grid, Input, Link, Text, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Github, Linkedin, Person, } from 'react-bootstrap-icons';
import './Contact.scss'
import { WindowWD } from './Fetch';
const Contact = () => {
    const windowWd = WindowWD();
    const [winsize, setWinSize] = useState(windowWd);

    const Icons = [<Github />, <Linkedin />, <Person />]
    const Types = [
        {
            name: 'GitHub',
            link: 'https://github.com/arul9976/'
        }, {
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/in/arul-kumar-m-494791254/'
        }, {
            name: 'My_PortFoilo',
            link: 'https://arul9976.github.io/My_PortFolio'
        }, {
            name: 'HackerRank',
            link: 'https://linkedin.in'

        }
    ]
    const sendfb = () => {
        console.log('submited....');
    }

    useEffect(() => {
        setWinSize(windowWd)
    }, [windowWd])
    return (
        <>
            <Grid className={winsize > 650 ? 'Mob' : 'Desk'} width={'100%'}>
                <Grid padding={'10px 12px'} placeItems={'center'} color={'#000'}>
                    <FormControl display={'flex'} flexDirection={'column'} bg={'#1c5d4b'} gap={5} padding={10} borderRadius={10}>
                        <Input type='text' name='Name' placeholder='Name' />
                        <Input type='email' name='Email' placeholder='Email' />
                        <Textarea placeholder='FeedBack' />
                        <Button onClick={sendfb} type='submit' colorScheme='whatsapp'>Send FeedBack</Button>
                    </FormControl>
                </Grid>
                <Grid width={'100%'} gridTemplateColumns={`repeat(${winsize < 650 ? 2 : 3}, 1fr)`} height={'70%'}>
                    {
                        Icons.map((item, index) => {
                            return (
                                <Flex alignItems={'center'} justifyContent={'center'} className={index === 1 && 'centering'}>
                                    <Link target={'_blank'} gap={3} href={Types[index].link} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                        <Text padding={'10px'} fontSize={'2.5rem'} borderRadius={'50%'} background={'blue.500'}>
                                            {item}
                                        </Text>
                                        <Text>
                                            {Types[index].name}
                                        </Text>
                                    </Link>
                                </Flex>
                            )
                        })
                    }

                </Grid>
            </Grid>

        </>
    )
}

export default Contact;