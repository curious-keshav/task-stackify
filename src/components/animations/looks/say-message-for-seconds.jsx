import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const SayMessageForSeconds = ({ message = "Hi", duration = 2, onChange, handleDeleteButton }) => {
    const [msg, setMsg] = useState(message);
    const [sec, setSec] = useState(duration);

    useEffect(() => {
        onChange?.({ message: msg, duration: sec });
    }, [msg, sec]);

    return (
        <div className="relative flex items-center gap-2 bg-amber-500 px-4 py-3 rounded-xl font-medium justify-center">
            <span className="text-sm  text-white">Say</span>
            <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="h-8 rounded-lg px-3 text-sm bg-gray-800 text-white placeholder:text-gray-400"
            />
            <span className="text-sm text-white"> for </span>
            <input
                type="number"
                value={sec}
                onChange={(e) => setSec(Number(e.target.value))}
                className="h-8 w-16 rounded-lg px-3 text-sm bg-gray-800 text-white placeholder:text-gray-400"
            />
            <span className="text-sm text-white">seconds </span>
            <button onClick={handleDeleteButton} className="absolute shadow-sm text-white right-4 text-xs px-1 py-1 bg-gray-800 hover:bg-gray-900 rounded-md font-medium transition duration-150">
                <DeleteIcon fontSize='small' />
            </button>
        </div>
    )
}

export default SayMessageForSeconds
