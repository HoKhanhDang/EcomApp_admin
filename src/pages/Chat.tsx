//components
import Navbar from '../components/common/navbar'
import Sidebar from '../components/common/sidebar'
import Agent from '../components/chat/AgentChat'

export default function Chat() {
    return (
        <div className=' w-screen h-screen font-main grid grid-cols-6 grid-rows-12'>
            <Sidebar />
            <div className=' col-span-5 row-span-1 w-full h-full px-5 py-2 bg-main-bg '>
                <Navbar />
            </div>
            <div className=' col-span-5 row-span-11 w-full h-full px-5 bg-main-bg flex flex-col gap-2 pb-[20px]'>
                <Agent />
            </div>
        </div>
    )
}
