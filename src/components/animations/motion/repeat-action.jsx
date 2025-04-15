import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';


const RepeatAction = ({ count = 3, onChange, handleDeleteButton }) => {
    const [repeat, setRepeat] = useState(count);

    useEffect(() => {
        onChange?.({ count: repeat });
    }, [repeat]);

    return (
        <>
            <div className="relative items-center text-sm bg-green-500 px-4 py-3 rounded-xl font-semibold text-center text-white space-x-2 flex justify-center">
                <span>Repeat</span>
                <input
                    type="number"
                    value={repeat}
                    onChange={(e) => setRepeat(Number(e.target.value))}
                    className="h-8 rounded-lg px-3 text-sm bg-gray-800 text-white placeholder:text-gray-400"
                />
                <span>times</span>
                <button onClick={handleDeleteButton} className="absolute shadow-sm right-4 text-xs px-1 py-1 bg-gray-800 hover:bg-gray-900 rounded-md font-medium transition duration-150">
                    <DeleteIcon fontSize='small' />
                </button>
            </div>
        </>
    )
}

export default RepeatAction
