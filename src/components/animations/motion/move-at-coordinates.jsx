import React from 'react'

const MoveAtCoordinates = () => {
    return (
        <div className="bg-rose-500 px-4 py-3 rounded-xl font-medium space-y-3">
            <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-medium text-white">Move Object At</span>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-white ">X   :</span>
                    <input
                        type="number"
                        defaultValue={4}
                        className="h-8 w-24 rounded-lg px-3 text-sm bg-gray-800 text-white"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-white">Y   :</span>
                    <input
                        type="number"
                        defaultValue={9}
                        className="h-8 w-24 rounded-lg px-3 text-sm bg-gray-800 text-white"
                    />
                </div>
            </div>

        </div>
    )
}

export default MoveAtCoordinates
