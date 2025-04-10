import React from 'react'
import RotateLeftIcon from '@mui/icons-material/RotateLeft';


const RotateAnticlockwise = () => {
    return (
        <div className="bg-purple-600 px-4 py-3 rounded-xl  font-medium">
            <div className="flex items-center ">
                <div className="text-sm text-white">Rotate <RotateLeftIcon /> By</div>
                <input
                    type="number"
                    defaultValue={4}
                    className="h-8 w-[5.9rem] rounded-lg px-3 ml-2 text-sm bg-gray-800 text-white"
                />
                <span className="text-sm text-white ml-1">°</span>
            </div>
        </div>
    )
}

export default RotateAnticlockwise
