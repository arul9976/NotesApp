import React, { useEffect } from 'react'
import './NavbarMain.scss'
import { At, Box2HeartFill, Check, HouseFill, Peace, PersonFill, PlusLg, Whatsapp, } from 'react-bootstrap-icons'
import { useState } from 'react'
import NavbarComp from './InputComp/NavbarComp'
import { Link, useLocation } from 'react-router-dom'

const NavbarMain = () => {
    const location = useLocation();
    const navs = [<HouseFill />, <PersonFill />, <PlusLg />, <Whatsapp />, <Box2HeartFill />]
    const navnames = ['Home', 'About', 'Plus', 'Contact', 'Filter']
    const Linking = ['/', '/About', '', '/Contact', `${location.pathname}`]
    const [isActive, setIsActive] = useState(0)
    const [togg, setTogg] = useState(false)
    const [toggle, setToggle] = useState(false)

    const activeNav = (index) => {
        setIsActive(index)
    }
    const inpTogg = (index) => {
        if (index === 2) {
            setTogg(!togg)
            setToggle(false)

        }
        else if (index === 4) {
            setToggle(!toggle)
            setTogg(false)
        }
        else {
            setTogg(false)
            setToggle(false)
        }
    }
    useEffect(() => {
        for (let index = 0; index < Linking.length; index++) {
            if (Linking[index] === location.pathname && isActive !== 2 && isActive !== 4) {
                setIsActive(index)
                break;
            }
        }
    }, [Linking, location.pathname, isActive])

    return (
        <>
            <div className="container_main">
                <div className="navs">
                    {
                        navnames.map((Item, index) => {
                            return (
                                <>
                                    <li key={index} onClick={() => activeNav(index)} className={`${Item !== 'Plus' ? "navitem" : "plus"} ${isActive === index && "active"}`}>
                                        <Link to={index !== 2 && Linking[index]}>
                                            <div onClick={() => inpTogg(index)}
                                                className={`icon ${(index === 4 && toggle && isActive === 4) && 'icofil'} ${isActive === index && !(index === 2 && !togg) && "active"} ${(index === 2 && togg) && 'togg'}`}>

                                                {navs[index]}

                                            </div>
                                            {index === 4 && (
                                                <div className="fil">
                                                    <div className="filters">
                                                        <div onClick={() => inpTogg(null)} style={{ '--clr': 0 }} className='emo'>
                                                            <Link to={'/Work'} className='hiii'>
                                                                <Check />
                                                            </Link>
                                                        </div>
                                                        <div style={{ '--clr': 0 }} className='text'>
                                                            <div className="aft">
                                                                <b>work</b>
                                                            </div>
                                                        </div>

                                                        <div onClick={() => inpTogg(null)} style={{ '--clr': 1 }} className='emo'>
                                                            <Link to={'/Important'}>
                                                                <At />
                                                            </Link>
                                                        </div>
                                                        <div style={{ '--clr': 1 }} className='text'>

                                                            <div className="aft">
                                                                <b>imp</b>
                                                            </div>
                                                        </div>

                                                        <div onClick={() => inpTogg(null)} style={{ '--clr': 2 }} className='emo'>
                                                            <Link to={'/Personal'}>
                                                                <Peace />
                                                            </Link>
                                                        </div>
                                                        <div style={{ '--clr': 2 }} className='text'>
                                                            <div className="aft">
                                                                <b>per</b>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            )}

                                            {Item !== 'Plus' && <b className='navName'> {Item}</b>}
                                        </Link>
                                    </li >

                                </>
                            )
                        })
                    }

                </div>

            </div >
            {
                NavbarComp(togg)
            }
        </>

    )
}

export default NavbarMain