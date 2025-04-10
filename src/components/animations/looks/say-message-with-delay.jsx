import React from 'react'

const SayMessageWithDelay = () => {
    return (
        <div className="flex items-center gap-2 bg-amber-500 px-4 py-3 rounded-xl font-medium">
            <span className="text-sm  text-white">Say</span>
            <input
                type="text"
                defaultValue="Hey"
                className="h-8 w-[3.6rem] rounded-lg px-3 text-sm bg-gray-800 text-white placeholder:text-gray-400"
            />
            <span className="text-sm text-white"> after </span>
            <input
                type="number"
                defaultValue={0}
                className="h-8 w-8 rounded-lg px-3 text-sm bg-gray-800 text-white placeholder:text-gray-400"
            />
            <span className="text-sm text-white">delay </span>

        </div>
    )
}

export default SayMessageWithDelay
