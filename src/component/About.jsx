import { Avatar, Button, Flex, Grid, Text } from '@chakra-ui/react'
import React from 'react'
import Nav from './HomeComp/Nav'
import { HouseFill } from 'react-bootstrap-icons'
import { ReduxData } from './Fetch'
import { useDispatch } from 'react-redux'
import { loggedOut } from './Redux/Actions'
import { Link } from 'react-router-dom'

const About = () => {
  const name = localStorage.getItem('un')
  const { trail } = ReduxData();


  const cal = (field) => {
    if (field === 'all') {
      return trail.length;
    }
    else {
      let count = 0;
      trail.forEach(Item => {
        Item.radio === field && count++
      })
      return count;
    }
  }
  const dispatch = useDispatch()
  const LogOut = () => {
    localStorage.removeItem("Token")
    localStorage.removeItem("un")
    dispatch(loggedOut([]))

  }

  return (
    <>
      <Nav />
      <Flex fontFamily={'cursive'} width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'center'}>
        <Flex position={'relative'} width={'clamp(90%, 1vw, 60%)'} height={'60%'} bg={'#fff'}
          boxShadow={'4px 4px 4px #3182ce, -4px 0 6px grey'}
          borderRadius={15} alignItems={'center'} justifyContent={'center'}>
          <Avatar position={'absolute'} top={'-20%'} size={'2xl'} name={name} />

          <Grid color={'#000'}>
            <Grid placeItems={'center'} width={'clamp(100%, 1vw, 60%)'}>
              <Text fontSize={25} letterSpacing={2} fontWeight={600} color={'#574f4f'}>{name ? name : "Username"}</Text>
              <Text fontSize={12} marginBottom={15} fontWeight={400}>New York, US</Text>

              <Text color={'#574f4f'}>Let's Welcome Buddy🤩 How Was You!😊</Text>

              <Flex gap={5} flexWrap={'wrap'} width={'100%'} margin={'10px 5px'} alignItems={'center'} justifyContent={'space-around'}>
                <Grid placeItems={'center'} color={'#000'} padding={2} bg={'#f1f1f1'} borderRadius={10}>
                  <Text>{cal('work')}</Text>
                  <Flex alignItems={'center'}>
                    <Text><HouseFill /></Text>
                    <Text>Work</Text>
                  </Flex>
                </Grid>
                <Grid placeItems={'center'} color={'#000'} padding={2} bg={'#f1f1f1'} borderRadius={10}>
                  <Text>{cal('personal')}</Text>
                  <Flex alignItems={'center'}>
                    <Text><HouseFill /></Text>
                    <Text>Personal</Text>
                  </Flex>
                </Grid>
                <Grid placeItems={'center'} color={'#000'} padding={2} bg={'#f1f1f1'} borderRadius={10}>
                  <Text>{cal('important')}</Text>
                  <Flex alignItems={'center'}>
                    <Text><HouseFill /></Text>
                    <Text>Important</Text>
                  </Flex>
                </Grid>
                <Grid placeItems={'center'} color={'#000'} padding={2} bg={'#f1f1f1'} borderRadius={10}>
                  <Text>{cal('all')}</Text>
                  <Flex alignItems={'center'}>
                    <Text><HouseFill /></Text>
                    <Text>Total</Text>
                  </Flex>
                </Grid>
                <Flex alignItems={'center'} justifyContent={'center'} width={'100%'}>
                  {

                    name ?
                      <Button onClick={LogOut} colorScheme={'red'}>
                        Log-Out
                      </Button>
                      :
                      <Link to={'/'}>
                        <Button colorScheme='blue'>
                          Log-In
                        </Button>
                      </Link>
                  }
                </Flex>
              </Flex>
            </Grid>

          </Grid>
        </Flex>
      </Flex>
    </>

  )
}

export default About