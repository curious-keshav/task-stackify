import React, { useEffect, useState } from 'react'

const RepeatAction = ({ count = 3, onChange }) => {
    const [repeat, setRepeat] = useState(count);

    useEffect(() => {
        onChange?.({ count: repeat });
    }, [repeat]);

    return (
        <div className=" items-center text-sm bg-green-500 px-4 py-3 rounded-xl font-semibold text-center text-white space-x-2 flex justify-center">
            <span>Repeat</span>
            <input
                type="number"
                value={repeat}
                onChange={(e) => setRepeat(Number(e.target.value))}
                className="h-8 rounded-lg px-3 text-sm bg-gray-800 text-white placeholder:text-gray-400"
            />
            <span>times</span>
        </div>
    )
}

export default RepeatAction
