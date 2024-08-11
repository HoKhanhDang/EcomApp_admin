//icon

import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io'
import { MdOutlineSpaceDashboard, MdOutlineShoppingBag } from 'react-icons/md'
import { FiUsers } from 'react-icons/fi'
import { RiBox1Line } from 'react-icons/ri'

import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../../redux/pageSlide'

import { navItems } from '../../ultils/constant'

export default function Sidebar() {
    const dispatch = useDispatch()
    const { pageIndex } = useSelector((state) => state.page)
    const getClassName = (isActive: boolean, link: string): string => {
        return isActive && link !== undefined
            ? 'w-full h-[50px] px-5 flex flex-row justify-between items-center hover:bg-red-300 bg-red-300'
            : 'w-full h-[50px] px-5 flex flex-row justify-between items-center hover:bg-red-300'
    }

    // useEffect(() => {
    //     dispatch(setPage(0))
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [pageIndex])

    return (
        <div className='col-span-1 row-span-12 h-full bg-white flex flex-col justify-start items-center'>
            <img className=' w-[200px] h-[200px]' src={logo} alt='' />
            {navItems.map(
                (
                    item: {
                        id: number
                        title: string
                        icon: string
                        link: string
                        items?: {
                            id: number
                            title: string
                            icon: string
                            link: string
                        }[]
                    },
                    index: number
                ) => {
                    return (
                        <>
                            <NavLink
                                to={item?.link}
                                onClick={() => {
                                    if (index === pageIndex) {
                                        dispatch(setPage(-1))
                                    } else {
                                        dispatch(setPage(index))
                                    }
                                }}
                                key={index}
                                tabIndex={0} // Make it focusable
                                role='button' // Indicate it's an interactive element
                                className={({ isActive }) => getClassName(isActive, item?.link)}
                                aria-expanded={item.items && pageIndex === index ? 'true' : 'false'} // Accessibility for dropdown state
                            >
                                <div className=' flex flex-row gap-3 items-center'>
                                    {index === 0 && <MdOutlineSpaceDashboard />}
                                    {index === 1 && <RiBox1Line />}
                                    {index === 2 && <MdOutlineShoppingBag />}
                                    {index === 3 && <FiUsers />} {item.title}
                                </div>{' '}
                                {item.items && pageIndex === index && <IoIosArrowDown className=' text-[15px]' />}
                                {item.items && pageIndex !== index && <IoIosArrowBack className=' text-[15px]' />}
                            </NavLink>
                            {item.items && pageIndex === index && (
                                <div className='w-full h-auto flex flex-col justify-start items-start'>
                                    {item.items.map(
                                        (
                                            subItem: {
                                                id: number
                                                title: string
                                                icon: string
                                                link: string
                                            },
                                            subIndex: number
                                        ) => {
                                            return (
                                                <NavLink
                                                    to={subItem.link}
                                                    key={subIndex}
                                                    className={({ isActive }) => getClassName(isActive, subItem.link)}
                                                    style={{ paddingLeft: '20%' }}
                                                >
                                                    <span>{subItem.title}</span>
                                                </NavLink>
                                            )
                                        }
                                    )}
                                </div>
                            )}
                        </>
                    )
                }
            )}
        </div>
    )
}
