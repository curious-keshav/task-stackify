import { Laptop } from '@mui/icons-material'
import { useEffect, useState } from 'react'

const ScreenWarning = () => {
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false)

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobileOrTablet(window.innerWidth < 1024)
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)

        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    if (!isMobileOrTablet) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 text-white px-4">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 shadow-2xl max-w-md animate-fade-in">
                <div className="flex justify-center mb-4">
                    <Laptop className="w-12 h-12 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Hold on! 📵</h2>
                <p className="text-lg mb-4">
                    The <span className="text-blue-400 font-semibold">Task Stackify App</span> is best viewed on a laptop or desktop.
                </p>
                <p className="text-sm text-gray-300">
                    Some features and layouts might not work properly on smaller screens.
                    Please switch to a larger device to continue your experience.
                </p>
            </div>
        </div>
    )
}

export default ScreenWarning
