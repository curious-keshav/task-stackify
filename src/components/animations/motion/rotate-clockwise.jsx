import React, { useEffect, useState } from 'react'
import RotateRightIcon from '@mui/icons-material/RotateRight';
import DeleteIcon from '@mui/icons-material/Delete';


const RotateClockwise = ({ degrees = 15, onChange , handleDeleteButton}) => {
    const [angle, setAngle] = useState(degrees);

    useEffect(() => {
        onChange({ degrees: angle });
    }, [angle]);

    return (
        <div className="relative bg-purple-600 px-4 py-3 rounded-xl  font-medium flex flex-col gap-2 justify-center">
            <div className="flex items-center justify-center ">
                <div className="text-sm text-white">Rotate <RotateRightIcon /> By</div>
                <input
                    type="number"
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="h-8  rounded-lg px-3 ml-2 text-sm bg-gray-800 text-white"
                />
                <span className="text-sm text-white ml-1">degree</span>
            </div>
            <div className='flex bg-muted/30 shadow-md p-1 rounded-md w-fit self-center '>
                <div className='h-3 w-1 rounded-lg bg-muted-foreground  mr-2'></div>
                <span className='text-[0.48rem] font-semibold '>Use negative value to rotate in AntiClockwise Direction</span>
            </div>
            <button onClick={handleDeleteButton} className="absolute shadow-sm text-white right-4 text-xs px-1 py-1 bg-gray-800 hover:bg-gray-900 rounded-md font-medium transition duration-150">
                <DeleteIcon fontSize='small' />
            </button>
        </div>
    )
}

export default RotateClockwise
