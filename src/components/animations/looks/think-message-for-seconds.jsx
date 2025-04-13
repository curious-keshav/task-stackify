import React, { useEffect, useState } from 'react'

const ThinkMessageForSeconds = ({ message = "Hi", duration = 2, onChange }) => {
    const [msg, setMsg] = useState(message);
    const [sec, setSec] = useState(duration);

    useEffect(() => {
        onChange?.({ message: msg, duration: sec });
    }, [msg, sec]);

    return (
        <div className="flex items-center justify-center  gap-2 bg-violet-600 px-4 py-3 rounded-xl font-medium">
            <span className="text-sm w-20 text-white">Think</span>
            <input
                type="text"
                value={msg} 
                onChange={(e) => setMsg(e.target.value)}
                className="h-8  rounded-lg px-3 text-sm bg-gray-800 text-white placeholder:text-gray-400"
            />
            <span className="text-sm text-white"> for </span>
            <input
                type="number"
                value={sec} 
                onChange={(e) => setSec(Number(e.target.value))}
                className="h-8  rounded-lg px-3 text-sm bg-gray-800 text-white placeholder:text-gray-400"
            />
            <span className="text-sm text-white">seconds </span>

        </div>
    )
}

export default ThinkMessageForSeconds
