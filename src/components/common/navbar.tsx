// Desc: Navbar for admin page
import { logout } from '../../redux/admin/adminSlide'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { path } from '../../ultils/path'
import { useState, memo } from 'react'

//MUI
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
//icons
import { HiDotsVertical } from 'react-icons/hi'
import { TbLogout } from 'react-icons/tb'

const Navbar = () => {
    const { current } = useSelector((state) => state.admin)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const openMenu = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate(`${path.admin.login}`)
    }
    return (
        <div className='w-full h-full rounded-[10px] bg-white flex flex-row justify-between items-center px-5'>
            <span>
                Welcome {current?.firstName} {current?.lastName} !
            </span>
            <div className=' flex flex-row justify-between items-center'>
                <div>
                    <Button
                        id='demo-positioned-button'
                        aria-controls={openMenu ? 'demo-positioned-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={openMenu ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <HiDotsVertical className=' text-black text-[20px]' />
                    </Button>
                    <Menu
                        id='demo-positioned-menu'
                        aria-labelledby='demo-positioned-button'
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                    >
                        <MenuItem onClick={handleLogout}>
                            <div className=' flex flex-row gap-2'>
                                <TbLogout className=' text-black text-[20px]' />
                                <span>Logout</span>
                            </div>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default memo(Navbar)
