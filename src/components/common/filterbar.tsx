import React, { useEffect, useState, useCallback, memo, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Select from 'react-select'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { setTotalPages, setProducts, setCurrentPage } from '../../redux/product/productSlide'
//MUI
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

//constant
import { colors, contantsSort, limitPage } from '../../ultils/constant'
//api
import { apiGetProduct } from '../../apis/productApi'
import { apiGetCategory } from '../../apis/categoryApi'

const FilterBar = memo(function FilterBar() {
    const [selectedSort, setSelectedSort] = useState<any>(null)
    const [selectedCategory, setSelectedCategory] = useState<any>(null)
    const [params] = useSearchParams()
    const { products } = useSelector((state) => state.admin)
    const { currentPage } = useSelector((state) => state.product)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null)
    const handleSelectColor = useCallback(
        (e: any) => {
            if (e === null) {
                params.delete('color')
                navigate(`?${params.toString()}`)
                return
            }
            params.delete('color')
            e.forEach((item: any) => {
                params.append('color', item.label)
            })
            navigate(`?${params.toString()}`)
        },
        [params, navigate]
    )

    const handleSearch = useCallback(
        (e: any) => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current)
            }

            debounceTimeout.current = setTimeout(() => {
                if (e.target.value === '') {
                    params.delete('search')
                    navigate(`?${params.toString()}`)
                    return
                }

                params.set('search', e.target.value)
                navigate(`?${params.toString()}`)
            }, 300)
        },
        [params, navigate]
    )

    const handleSelectCategory = useCallback(
        (e: any) => {
            if (e?.label === undefined) {
                params.delete('category')
                navigate(`?${params.toString()}`)
                return
            }
            params.set('category', e?.label)
            navigate(`?${params.toString()}`)
        },
        [params, navigate]
    )

    const fetchCategory = useCallback(async () => {
        const res = await apiGetCategory()
        setSelectedCategory(res.data.res.map((item: any) => ({ value: item._id, label: item.title })))
    }, [])

    const fetchData = useCallback(async () => {
        const length = products?.length
        if (length == 0) {
            dispatch(setTotalPages(1))
            return
        } else {
            const firstPaging = await apiGetProduct({
                category: params.get('category'),
                title: params.get('search'),
                brand: params.getAll('brand'),
                color: params.getAll('color'),
                'price[gte]': params.get('price[gte]'),
                'price[lte]': params.get('price[lte]'),
                sort: params.get('sort')
            })
            const lengthF = firstPaging?.data.res.length
            dispatch(setTotalPages(Math.ceil(parseFloat(lengthF / limitPage))))
            const paging = await apiGetProduct({
                page: currentPage,
                limit: limitPage,
                category: params.get('category'),
                title: params.get('search'),
                brand: params.getAll('brand'),
                color: params.getAll('color'),
                'price[gte]': params.get('price[gte]'),
                'price[lte]': params.get('price[lte]'),
                sort: params.get('sort')
            })

            dispatch(setProducts(paging?.data.res))
        }
    }, [products, params, currentPage, dispatch])
    useEffect(() => {
        fetchData()
        dispatch(setCurrentPage(1))
    }, [products])

    useEffect(() => {
        fetchCategory()
        fetchData()
    }, [])
    useEffect(() => {
        fetchData()
    }, [dispatch])
    useEffect(() => {
        dispatch(setCurrentPage(1))
    }, [params.toString()])
    useEffect(() => {
        fetchData()
    }, [currentPage, params.toString()])
    useEffect(() => {
        if (selectedSort) {
            params.delete('sort')
            if (selectedSort.value === undefined) {
                params.append('sort', selectedSort)
                navigate(`?${params.toString()}`)
                return
            } else {
                params.append('sort', selectedSort.value)
                navigate(`?${params.toString()}`)
            }
        } else {
            params.delete('sort')
            navigate(`?${params.toString()}`)
        }
    }, [selectedSort])
    return (
        <div className=' w-full h-[10%] bg-white flex flex-row justify-between px-5 rounded-t-md'>
            <div className=' w-[80%] h-full p-4 rounded-b-md flex flex-row items-center gap-2'>
                <input
                    onChange={(e) => handleSearch(e)}
                    type='text'
                    placeholder='Search'
                    className='border px-3 rounded-md w-1/3 h-[50px]'
                />

                <Autocomplete
                    onChange={(e, value) => handleSelectColor(value)}
                    multiple
                    limitTags={2}
                    id='multiple-limit-tags'
                    options={colors}
                    getOptionLabel={(item) => item.label}
                    renderInput={(params) => {
                        return (
                            <TextField
                                {...params}
                                label='Color'
                                placeholder='Colors'
                                sx={{ '& .MuiInputBase-root': { height: '50px' } }}
                            />
                        )
                    }}
                />
            </div>
            <div className=' w-[30%] h-full bg-white rounded-b-md flex flex-row gap-2 justify-end items-center'>
                <div className='h-full w-auto flex items-center'>
                    <Select
                        styles={{
                            control: (base) => ({
                                ...base,
                                height: '50px',
                                minHeight: '50px'
                            })
                        }}
                        isMulti={false}
                        isClearable={true}
                        onChange={(e) => setSelectedSort(e)}
                        options={contantsSort}
                        placeholder={'Options'}
                    />
                </div>
                <div className='h-full w-auto flex items-center'>
                    <Select
                        styles={{
                            control: (base) => ({
                                ...base,
                                height: '50px',
                                minHeight: '50px'
                            })
                        }}
                        isMulti={false}
                        isClearable={true}
                        onChange={(e) => handleSelectCategory(e)}
                        options={selectedCategory}
                        placeholder={'Category'}
                    />
                </div>
            </div>
        </div>
    )
})

export default FilterBar
