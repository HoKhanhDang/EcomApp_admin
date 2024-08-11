//React
import { useState, useEffect } from 'react'
import Navbar from '../components/common/navbar'
import Sidebar from '../components/common/sidebar'
//Icons
import addButton from '../assets/add.png'
import { FaRegTrashAlt } from 'react-icons/fa'
//MUI
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
//Ultis
import { colors, internals } from '../ultils/constant'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//api
import { uploadImage, apiAddProduct } from '../apis/productApi'
import { apiGetBrand } from '../apis/brandApi'
import { apiGetCategory } from '../apis/categoryApi'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
})
export default function AddProduct() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    //content
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [brand, setBrand] = useState<string>('')
    const [listBrand, setListBrand] = useState([])
    const [listCategory, setListCategory] = useState([])
    const [color, setColor] = useState<Array<string>>([])
    const [internal, setInternal] = useState<Array<string>>([])
    const [quantity, setQuantity] = useState<number | null>(null)
    const [price, setPrice] = useState<number | null>(null)

    //image
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [selectedFiles, setSelectedFiles] = useState<Array<File>>([])

    //fetch brand and category list
    const fetchBrandAndCategory = async () => {
        const [brand, category] = await Promise.all([apiGetBrand(), apiGetCategory()])
        if (brand && category) {
            setListBrand(brand?.data?.res)
            setListCategory(category?.data?.res)
        }
    }
    useEffect(() => {
        fetchBrandAndCategory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const onSubmit = async () => {
        //check empty
        if (
            selectedFiles.length === 0 ||
            !title ||
            !description ||
            !category ||
            !brand ||
            !color ||
            !internal ||
            !quantity ||
            !price
        ) {
            toast.warning('Please fill all fields')
            return
        }
        if (quantity <= 0) {
            toast.warning('Quantity must be greater than 0')
            return
        }
        if (price <= 0) {
            toast.warning('Price must be greater than 0')
            return
        }
        setIsLoading(true)

        //load image to cloud
        const formData = new FormData()
        selectedFiles.forEach((file) => {
            formData.append(`images`, file)
        })
        const img = await uploadImage(formData)
        const arrayImg = []
        img.data.res.forEach((element: any) => {
            arrayImg.push({ image: element.path })
        })
        try {
            await apiAddProduct({
                title,
                description,
                image: arrayImg,
                category,
                brand,
                color,
                internal,
                quantity,
                price
            })

            toast.success('Add product success', { autoClose: 2000 })
            setTimeout(() => {
                setIsLoading(false)
                window.location.reload()
            }, 2000)
        } catch (error) {
            setIsLoading(false)
            toast.error('Upload image failed')
            return
        }
    }
    const handlePick = (e: any) => {
        const files = e.target.files

        if (selectedFiles.length >= 4) {
            toast('You can only upload 4 images')
            return
        }
        if (files) {
            setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)])
        }
    }
    const handleSetColor = (value: string[]) => {
        setColor(value)
    }
    const handleSetInternal = (value: string[]) => {
        setInternal(value)
    }
    return (
        <div className=' w-screen min-h-screen h-auto bg-main-bg font-main grid grid-cols-6'>
            {isLoading && (
                <div className=' fixed top-0 z-50 w-full h-[10px]'>
                    <LinearProgress color='primary' />
                </div>
            )}
            <Sidebar />
            <div className='  col-span-5 row-span-1 w-full h-full min-h-[60px] px-5 py-2 bg-main-bg '>
                <Navbar />
            </div>
            <div className=' col-span-5 w-full h-full px-5 bg-main-bg text-login-main flex justify-center items-center flex-col'>
                <div className='h-[5%] w-1/2 font-bold text-[30px] flex flex-row justify-between'>
                    <span></span>
                    <span className='text-black'>Add Product</span>
                    <span></span>
                </div>
                <div className='w-full h-auto flex justify-center'>
                    <div className='w-[50%] h-auto flex flex-col justify-start items-start p-5 gap-4 bg-white rounded-xl'>
                        <TextField
                            className='w-full'
                            id='standard-textarea'
                            label='Title'
                            placeholder='Enter title'
                            variant='standard'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            className='w-full'
                            id='standard-textarea'
                            label='Description'
                            placeholder='Enter description'
                            multiline
                            variant='standard'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className='w-full'>
                            <span className='w-full'>Image</span>
                            <div className='w-full h-auto flex flex-row gap-2'>
                                {selectedFiles?.map((file, index) => (
                                    <div
                                        key={index}
                                        onMouseEnter={() => setHoverIndex(index)}
                                        onMouseLeave={() => setHoverIndex(null)}
                                        className='relative'
                                    >
                                        <img src={URL.createObjectURL(file)} alt='' className='w-[100px] h-[100px]' />
                                        {hoverIndex === index && (
                                            <div
                                                className='absolute top-[40%] left-[40%] w-[25px] h-[25px] flex justify-center items-center'
                                                role='button'
                                                tabIndex={0}
                                                onClick={() => {
                                                    setSelectedFiles((prevFiles) =>
                                                        prevFiles.filter((_, i) => i !== index)
                                                    )
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        setSelectedFiles((prevFiles) =>
                                                            prevFiles.filter((_, i) => i !== index)
                                                        )
                                                    }
                                                }}
                                            >
                                                <FaRegTrashAlt className='text-[30px] text-red-500' />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className='w-[100px] h-[100px] border flex justify-center items-center'>
                                    <Button
                                        className='w-full h-full'
                                        component='label'
                                        role={undefined}
                                        variant='contained'
                                        tabIndex={-1}
                                        color='inherit'
                                    >
                                        <img src={addButton} className=' w-[50px] h-[50px]' alt='' />
                                        <VisuallyHiddenInput accept='image/*' type='file' onChange={handlePick} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-row gap-2'>
                            <FormControl style={{ margin: 0 }} sx={{ m: 1, minWidth: 120 }} className='w-1/2'>
                                <InputLabel id='demo-simple-select-helper-label'>Category</InputLabel>
                                <Select
                                    labelId='demo-simple-select-helper-label'
                                    id='demo-simple-select-helper'
                                    label='Category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {listCategory?.map((item: any) => (
                                        <MenuItem key={item._id} value={item.title}>
                                            {item.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl style={{ margin: 0 }} sx={{ m: 1, minWidth: 120 }} className='w-1/2'>
                                <InputLabel id='demo-simple-select-helper-label'>Brand</InputLabel>
                                <Select
                                    labelId='demo-simple-select-helper-label'
                                    id='demo-simple-select-helper'
                                    label='Brand'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                    {listBrand?.map((item: any, index: number) => (
                                        <MenuItem key={index} value={item.title}>
                                            {item.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className='w-full'>
                            <Autocomplete
                                onChange={(e, value) => handleSetColor(value)}
                                multiple
                                limitTags={2}
                                id='multiple-limit-tags'
                                options={colors}
                                getOptionLabel={(item) => item.label}
                                renderInput={(params) => {
                                    return <TextField {...params} label='Color' placeholder='Colors' />
                                }}
                                sx={{ width: '100%' }}
                            />
                        </div>

                        <div className='w-full'>
                            <Autocomplete
                                onChange={(e, value) => handleSetInternal(value)}
                                multiple
                                limitTags={2}
                                id='multiple-limit-tags'
                                options={internals}
                                getOptionLabel={(item) => item.label}
                                renderInput={(params) => (
                                    <TextField {...params} label='Internal' placeholder='Internals' />
                                )}
                                sx={{ width: '100%' }}
                            />
                        </div>
                        <div className='w-full'>
                            <TextField
                                id='outlined-number'
                                label='Quantity'
                                type='number'
                                InputLabelProps={{
                                    shrink: true
                                }}
                                value={quantity}
                                onChange={(e) => setQuantity(+e.target.value)}
                            />
                        </div>
                        <div className='w-full'>
                            <TextField
                                id='outlined-number'
                                label='Price'
                                type='number'
                                InputLabelProps={{
                                    shrink: true
                                }}
                                value={price}
                                onChange={(e) => setPrice(+e.target.value)}
                            />
                        </div>

                        <div
                            role='button'
                            tabIndex={0}
                            onClick={onSubmit}
                            onKeyDown={onSubmit}
                            className='w-full h-[50px] flex justify-center items-center text-white bg-red-500 hover:bg-red-300 rounded-md'
                        >
                            Submit
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
