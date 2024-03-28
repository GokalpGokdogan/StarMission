import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import {
    IconChevronDown, IconChevronUp,
    IconChevronsLeft, IconChevronsRight, IconSquareChevronsLeftFilled
} from '@tabler/icons-react';


const Sidebar = ({ open, setOpen, setHref, active, setActive }) => {
    const [subOpen, setSubOpen] = useState(false)
    const [activeSub, setActiveSub] = useState("");

    const Menu = [
        {
            title: 'Sign Up',
            link: 'sign-up'
        },
        {
            title: 'Login',
            link: 'login'
        },
        {
            title: 'Dashboard',
            link: 'dashboard'
        },
        {
            title: 'Applications',
            link: 'applications'
        },
      
    ]


    return (
        <div className='bg-darker-bg h-full'>
            <header className='' >
                <div className={`text-right pr-1 pb-1 relative flex`}>
                <button type="button"
                        // className={`hover:bg-slate-100 ${open ? 'p-2' : ''} rounded-lg text-dark-title`}
                        className='absolute rounded-full -right-2.5 mt-80 flex w-5 border-2 border-opacity-50 bg-sub-text hover:scale-110'
                        onClick={() => {
                            setOpen((prev) => !prev);
                        }}>
                        {
                            open ?
                                <IconChevronsLeft className='w-4 h-4 text-white' />
                                :
                                <IconChevronsRight className='w-4 h-4 text-white' />
                        }
                    </button>
                </div >
            </header >
            <nav className={`flex w-full justify-center items-center transition-all duration-300 ${open ? 'pl-5' : ''}`}>
                <ul className='w-full'>
                <div className={`flex flex-row justify-start items-center p-2 rounded-xl`} >
                <p className={`font-poppins font-bold text-white py-8 px-2 justify-start flex relative transition-all duration-300 ${!open ? '-inset-x-96' : 'inset-x-0'} text-xl`} style={{ borderBottom: '1px solid white', fontSize:'26px' }}>StarMission</p>

                </div>
                    {

                        Menu.map((item, index) => {
                            return (
                                <li key={index} className={`font-poppins text-sub-text ${active === item.title ? 'text-white font-semibold' : ' '}`}>
                                    <NavLink to={item.link} className=''
                                        onClick={(e) => {
                                            if (!open) {
                                                if (item.title === 'Search') {
                                                    setOpen(true)
                                                    setSubOpen(true)
                                                }
                                            }
                                            if (item.title === 'Search') {
                                                if (!subOpen && !(active.includes('Search') || active.includes('Synopsis'))) {
                                                    setHref("Past Search")
                                                    setActiveSub("Past Search")
                                                    setSubOpen(true)
                                                }
                                                else
                                                    e.preventDefault()
                                            }
                                            else {
                                                setHref(item.title)
                                                setSubOpen(false)
                                                setActiveSub("Past Search")
                                            }
                                            setActive(item.title)
                                        }}
                                    >
                                        <div className={`flex flex-row justify-start items-center p-2 rounded-xl`} >
                                            <p className={`flex relative transition-all duration-300 ${!open ? '-inset-x-96' : 'inset-x-0'} text-lg`}>{item.title}</p>
            
                                        </div>
                                    </NavLink>
                                
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </div >
    )
}

export default Sidebar

