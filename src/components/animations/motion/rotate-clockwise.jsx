import React from 'react'
import RotateRightIcon from '@mui/icons-material/RotateRight';

const RotateClockwise = () => {
    return (
        <div className="bg-purple-600 px-4 py-3 rounded-xl  font-medium">
            <div className="flex items-center ">
                <div className="text-sm text-white">Rotate <RotateRightIcon /> By</div>
                <input
                    type="number"
                    defaultValue={4}
                    className="h-8 w-[6rem] rounded-lg px-3 ml-2 text-sm bg-gray-800 text-white"
                />
                <span className="text-sm text-white ml-1">°</span>
            </div>
        </div>
    )
}

export default RotateClockwise
