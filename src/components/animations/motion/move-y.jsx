import React from 'react'

const MoveY = () => {
    return (
        <div className="flex items-center justify-between gap-2 bg-blue-600 px-4 py-3 rounded-xl font-medium">
            <span className="text-sm w-20 text-white">Move Y</span>
            <input
                type="number"
                defaultValue={4}
                className="h-8 w-24 rounded-lg px-3 text-sm bg-gray-800 text-white"
            />
            <span className="text-sm text-white">steps</span>
        </div>
    )
}

export default MoveY
