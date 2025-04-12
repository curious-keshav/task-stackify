import React from 'react'

const RepeatAction = () => {
    return (
        <div className=" text-sm bg-green-500 px-4 py-3 rounded-xl font-semibold text-center text-white space-x-2">
            <span>Repeat</span>
            <input
                disabled
                type="number"
                defaultValue={0}
                className="h-8 w-24 rounded-lg px-3 text-sm bg-gray-800 text-white placeholder:text-gray-400"
            />
            <span>times</span>
        </div>
    )
}

export default RepeatAction
