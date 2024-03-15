import { Avatar, Flex, Grid, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { WindowWD } from '../Fetch';

const Nav = () => {
    const WindowWidth = WindowWD();
    const lam = () => {
        const name = localStorage.getItem('un');
        if (name) {
            if (WindowWidth < 640) {
                return name.split(' ')[0].substring(0, 5) + '....';
            }
            else {
                return name;
            }
        }
        else {
            return 'Username'
        }

    }
    return (
        <Flex borderRadius={10} margin={'0 10px'} alignItems={'center'} justifyContent={'space-between'} position={'absolute'} top={1} left={0} width={'calc(100% - 20px)'} height={'10%'} bg={'blue.500'}>
            <Flex>
                <Text margin={'0 10px'} fontWeight={900} fontSize={'clamp(17px, 1vw, 19px)'}
                    letterSpacing={2} bg={'blue.200'} borderRadius={20} padding={'5px 20px'}>
                    Notes
                </Text>
            </Flex>
            <Flex alignItems={'center'} justifyContent={'center'} gap={2} margin={'0 5px'}>
                <Grid placeItems={'center'}>
                    <Text fontWeight={600}>
                        {
                            lam()
                        }
                    </Text>
                    <Text fontSize={12} fontWeight={400}>
                        🤩hey let's welcome💕
                    </Text>
                </Grid>
                <Stack>
                    <Avatar src='https://bit.ly/broken-link' />
                </Stack>
            </Flex>
        </Flex>
    )
}

export default Nav