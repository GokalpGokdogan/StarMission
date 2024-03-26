import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import {
    IconChevronDown, IconChevronUp,
    IconChevronsLeft, IconChevronsRight
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
      
    ]


    return (
        <div className='bg-darker-bg h-full'>
            <header className='' >
                <div className={`text-right pr-1 pb-1 relative`}>
                <button type="button"
                        // className={`hover:bg-slate-100 ${open ? 'p-2' : ''} rounded-lg text-dark-title`}
                        className='absolute rounded-full -right-2.5 top-3 w-5 border-2 border-opacity-50 dark:border-opacity-50 bg-primary-bg border-primary-text text-primary-text dark:bg-dark-primary-bg dark:border-dark-secondary-text dark:text-dark-secondary-text hover:scale-110'
                        onClick={() => {
                            setOpen((prev) => !prev);
                        }}>
                        {
                            open ?
                                <IconChevronsLeft className='w-4 h-4' />
                                :
                                <IconChevronsRight className='w-4 h-4' />
                        }
                    </button>
                </div >
            </header >
            <nav className={`flex w-full justify-center items-center mt-5 transition-all duration-300 ${open ? 'pl-5' : ''}`}>
                <ul className='w-full'>
                    {
                        Menu.map((item, index) => {
                            return (
                                <li key={index} className={`font-poppins text-white p-2 transition-all duration-300 ${active === item.title ? 'font-bold' : ' '}`}>
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
                                            <p className={`flex relative transition-all duration-300 ${!open ? '-inset-x-96' : 'inset-x-0'} text-xl`}>{item.title}</p>
            
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

