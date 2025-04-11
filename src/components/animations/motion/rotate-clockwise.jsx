import React, { useEffect, useState } from 'react'
import RotateRightIcon from '@mui/icons-material/RotateRight';

const RotateClockwise = ({ degrees = 15, onChange }) => {
    const [angle, setAngle] = useState(degrees);

    useEffect(() => {
        onChange?.({ degrees: angle });
    }, [angle]);

    return (
        <div className="bg-purple-600 px-4 py-3 rounded-xl  font-medium flex flex-col gap-2">
            <div className="flex items-center ">
                <div className="text-sm text-white">Rotate <RotateRightIcon /> By</div>
                <input
                    type="number"
                    defaultValue={degrees}
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="h-8 w-[6rem] rounded-lg px-3 ml-2 text-sm bg-gray-800 text-white"
                />
                <span className="text-sm text-white ml-1">°</span>
            </div>
            <div className='flex bg-muted/30 shadow-md p-1 rounded-md w-full '>
                <div className='h-3 w-1 rounded-lg bg-muted-foreground  mr-2'></div>
                <span className='text-[0.48rem] font-semibold '>Use negative value to Rotate in AntiClockwise Direction</span>
            </div>
        </div>
    )
}

export default RotateClockwise
