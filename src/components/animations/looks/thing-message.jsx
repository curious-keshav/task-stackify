import React from 'react'

const ThinkMessage = () => {
    return (
        <div className="flex items-center gap-2 bg-violet-600 px-4 py-3 rounded-xl font-medium">
            <span className="text-sm  text-white">Think</span>
            <input
                type="text"
                defaultValue="Hello"
                className="h-8 w-24 rounded-lg px-3 text-sm bg-gray-800 text-white placeholder:text-gray-400"
            />
        </div>
    )
}

export default ThinkMessage
