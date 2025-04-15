import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';


const MoveAtCoordinates = ({ x = 0, y = 0, onChange , handleDeleteButton}) => {

    const [pos, setPos] = useState({ x, y });

    useEffect(() => {
        onChange?.(pos);
    }, [pos]);

    return (
        <>
            <div className="relative bg-rose-500 px-4 py-3 rounded-xl font-medium space-y-3">
                <div className="flex justify-center items-center gap-2">
                    <span className="text-sm font-medium text-white">Move Object At</span>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-white ">X   :</span>
                        <input
                            type="number"
                            value={pos.x}
                            onChange={(e) => setPos((p) => ({ ...p, x: Number(e.target.value) }))}
                            className="h-8 w-36 rounded-lg px-3 text-sm bg-gray-800 text-white"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-white">Y   :</span>
                        <input
                            type="number"
                            value={pos.y}
                            onChange={(e) => setPos((p) => ({ ...p, y: Number(e.target.value) }))}
                            className="h-8 w-36 rounded-lg px-3 text-sm bg-gray-800 text-white"
                        />
                    </div>
                    <button onClick={handleDeleteButton} className="absolute shadow-sm text-white right-4 text-xs px-1 py-1 bg-gray-800 hover:bg-gray-900 rounded-md font-medium transition duration-150">
                        <DeleteIcon fontSize='small' />
                    </button>
                </div>
            </div>
        </>
    )
}

export default MoveAtCoordinates
