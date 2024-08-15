//components
import DisplayItem from './display-item'
//icons
import { IoPeople } from 'react-icons/io5'
import { FiShoppingBag } from 'react-icons/fi'
import { FaChartLine, FaEye } from 'react-icons/fa'
import { MdAttachMoney } from 'react-icons/md'

import Chart from './chart'

export default function Dashboard(rs: any) {
    return (
        <div className='grid grid-cols-8 grid-rows-2 w-full h-[45%] gap-3 '>
            {rs?.rs && (
                <>
                    <div className='col-span-2 row-span-1'>
                        <DisplayItem
                            color='green'
                            Icon={MdAttachMoney}
                            data={{
                                title: 'Total Sales',
                                data1: rs.rs[1][0]?.total,
                                data2: rs.rs[0][0]?.total || 1
                            }}
                        />
                    </div>
                    <div className='col-span-2 row-span-1'>
                        <DisplayItem
                            color='red'
                            Icon={FiShoppingBag}
                            data={{
                                title: 'Total Order',
                                data1: rs.rs[3][0]?.total,
                                data2: rs.rs[2][0]?.total || 1
                            }}
                        />
                    </div>
                    <div className='col-span-4 row-span-2'>
                        <Chart
                            color='red'
                            Icon={FaChartLine}
                            data={{
                                data1: rs.rs[8],
                                data2: rs.rs[9],
                                data3: rs.rs[10],
                                data4: rs.rs[11]
                            }}
                        />
                    </div>
                    <div className='col-span-2 row-span-1'>
                        <DisplayItem
                            color='yellow'
                            Icon={IoPeople}
                            data={{
                                title: 'New Customer',
                                data1: rs.rs[4][0]?.total,
                                data2: rs.rs[5][0]?.total || 1
                            }}
                        />
                    </div>
                    <div className='col-span-2 row-span-1'>
                        <DisplayItem
                            color='red'
                            Icon={FaEye}
                            data={{
                                title: 'Impressions',
                                data1: rs.rs[7][0]?.total,
                                data2: rs.rs[6][0]?.total || 1
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    )
}
