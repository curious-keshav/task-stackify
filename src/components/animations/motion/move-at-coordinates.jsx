import React, { useEffect, useState } from 'react'

const MoveAtCoordinates = ({ x = 0, y = 0, onChange }) => {

    const [pos, setPos] = useState({ x, y });

    useEffect(() => {
        onChange?.(pos);
    }, [pos]);

    return (
        <div className="bg-rose-500 px-4 py-3 rounded-xl font-medium space-y-3">
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
            </div>

        </div>
    )
}

export default MoveAtCoordinates
