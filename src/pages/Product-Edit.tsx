//React
import { useState, useEffect } from 'react'
import Navbar from '../components/common/navbar'
import Sidebar from '../components/common/sidebar'
import { useParams } from 'react-router-dom'
//Icons
import addButton from '../assets/add.png'
import { FaRegTrashAlt } from 'react-icons/fa'
import { IoArrowBack } from 'react-icons/io5'

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
import Swal from 'sweetalert2'
//api
import { uploadImage, apiGetProductById, apiUpdateProduct } from '../apis/productApi'
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
export default function EditProduct() {
    const { pid } = useParams()
    console.log(typeof pid)
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
    const [image, setImage] = useState<Array<string>>([])

    //image
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [selectedFiles, setSelectedFiles] = useState<Array<File>>([])
    //fetch product
    const fetchProduct = async () => {
        const rs = await apiGetProductById(pid)
        console.log('rs', rs)
        if (rs) {
            setTitle(rs?.data?.res?.title)
            setDescription(rs?.data?.res?.description)
            setCategory(rs?.data?.res?.category)
            setBrand(rs?.data?.res?.brand)
            setColor(rs?.data?.res?.color)
            setInternal(rs?.data?.res?.internal)
            setQuantity(rs?.data?.res?.quantity)
            setPrice(rs?.data?.res?.price)
            setImage(rs?.data?.res?.image)
        }
    }
    //fetch brand and category list
    const fetchBrandAndCategory = async () => {
        const [brand, category] = await Promise.all([apiGetBrand(), apiGetCategory()])
        if (brand && category) {
            setListBrand(brand?.data?.res)
            setListCategory(category?.data?.res)
        }
    }
    useEffect(() => {
        fetchProduct()
        fetchBrandAndCategory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const onSubmit = async () => {
        //check empty
        if (
            selectedFiles?.length + image?.length === 0 ||
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

        Swal.fire({
            title: 'Are you sure?',
            text: 'Please confirm that you want to change it!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(async (result) => {
            if (result.isConfirmed) {
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
                const arrrs = image.concat(arrayImg)
                try {
                    await apiUpdateProduct(pid, {
                        title,
                        description,
                        image: arrrs,
                        category,
                        brand,
                        color,
                        internal,
                        quantity,
                        price
                    })

                    toast.success('The product information has been successfully updated.', { autoClose: 2000 })

                    setIsLoading(false)
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                } catch (error) {
                    setIsLoading(false)
                    toast.error('Failed')
                    return
                }
                Swal.fire({
                    title: 'Yayyy!',
                    text: 'The product information has been successfully updated.',
                    icon: 'success'
                })
            }
        })
    }
    const handleBack = () => {
        window.history.back()
    }
    const handlePick = (e: any) => {
        const files = e.target.files

        if (selectedFiles?.length + image?.length >= 4) {
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
        <div className=' w-screen h-auto min-h-screen bg-main-bg font-main grid grid-cols-6'>
            {isLoading && (
                <div className=' fixed top-0 z-50 w-full h-[10px]'>
                    <LinearProgress color='primary' />
                </div>
            )}
            <Sidebar />
            <div className=' col-span-5 w-full h-full min-h-[60px] px-5 py-2 bg-main-bg '>
                <Navbar />
            </div>
            <div className=' col-span-5 w-full h-full px-5 bg-main-bg text-login-main flex flex-col justify-center items-center'>
                <div className='h-[5%] w-1/2 font-bold text-[30px] flex flex-row justify-between'>
                    <button onClick={handleBack}>
                        <IoArrowBack />
                    </button>
                    <span>Edit Product</span>
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
                                {image?.map((img, index) => (
                                    <div
                                        key={index}
                                        onMouseEnter={() => setHoverIndex(index)}
                                        onMouseLeave={() => setHoverIndex(null)}
                                        className='relative'
                                    >
                                        <img src={img.image} alt='' className='w-[100px] h-[100px]' />
                                        {hoverIndex === index && (
                                            <div
                                                className='absolute top-[40%] left-[40%] w-[25px] h-[25px] flex justify-center items-center'
                                                role='button'
                                                tabIndex={0}
                                                onClick={() => {
                                                    setImage((prevFiles) => prevFiles.filter((_, i) => i !== index))
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        setImage((prevFiles) => prevFiles.filter((_, i) => i !== index))
                                                    }
                                                }}
                                            >
                                                <FaRegTrashAlt className='text-[30px] text-red-500' />
                                            </div>
                                        )}
                                    </div>
                                ))}
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
                                value={color}
                                onChange={(e, value) => handleSetColor(value)}
                                multiple
                                limitTags={2}
                                id='multiple-limit-tags'
                                options={colors}
                                getOptionLabel={(item) => item.label}
                                renderInput={(params) => {
                                    console.log(params)
                                    return <TextField {...params} label='Color' placeholder='Colors' />
                                }}
                                sx={{ width: '100%' }}
                            />
                        </div>

                        <div className='w-full'>
                            <Autocomplete
                                value={internal}
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
                        <div className='w-full flex items-center gap-3'>
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
                            <span>USD</span>
                        </div>

                        <div
                            role='button'
                            tabIndex={0}
                            onClick={onSubmit}
                            onKeyDown={onSubmit}
                            className='w-full h-[50px] flex justify-center items-center bg-red-500 hover:bg-red-300 rounded-md'
                        >
                            Confirm
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
