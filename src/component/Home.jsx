import React from 'react'
import './sass/Home.scss'
import BoxComp from './HomeComp/BoxComp'
import { Flex, Grid, Image } from '@chakra-ui/react'

import NOData from './images/NoDatarb.png'
import Nav from './HomeComp/Nav'
import { ReduxData, WindowWD } from './Fetch'
import { useLocation } from 'react-router-dom'
const Home = () => {
    const trail = ReduxData();
    const WindowWidth = WindowWD();
    const location = useLocation();
    if (trail) {
        return (
            <>
                <Nav />
                <div className="home">
                    <Grid gridTemplateRows={`repeat(${Math.floor(trail.length / (WindowWidth < 668 ? 2 : 3) + 1)}, ${WindowWidth < 668 ? 50 : 49}%)`} className='BoxCon'>
                        {
                            trail.length > 0 ?

                                trail.map((Item, index) => {
                                    if (location.pathname === '/Work' || location.pathname === '/Personal' || location.pathname === '/Important') {
                                        const type = location.pathname.substring(1).toLowerCase();
                                        return (
                                            Item.radio === type && (
                                                <div key={index}>
                                                    <BoxComp radio={Item.radio} heading={Item.heading} content={Item.content}
                                                        id={Item.id} index={index}
                                                        Added={trail.length} code={Item.username} />
                                                </div>
                                            )
                                        )
                                    }
                                    else {
                                        return (
                                            <div key={index}>
                                                <BoxComp radio={Item.radio} heading={Item.heading} content={Item.content}
                                                    id={Item.id} index={index}
                                                    Added={trail.length} code={Item.username} />
                                            </div>
                                        )
                                    }

                                })
                                :
                                <Flex position={'absolute'} top={0} left={0} width={'100%'} height={'100%'}>
                                    <Image minWidth={'280px'} maxWidth={'700px'} height={'70%'} margin={'20px auto'} objectFit={'cover'} src={NOData}></Image>
                                </Flex>
                        }
                    </Grid>
                </div>

            </>
        )
    }
}


export default Home;