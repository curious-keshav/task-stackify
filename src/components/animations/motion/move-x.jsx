import React, { useEffect, useState } from 'react'
import { COMPONENTS } from '../../../utility/components';

const MOVE_X = ({ value = 10, onChange }) => {
    const [step, setStep] = useState(value);

    useEffect(() => {
        onChange?.({ value: step });
    }, [step]);

    return (
        <div
            className={` flex items-center justify-center gap-2 bg-blue-600 px-4 py-3 rounded-xl font-medium`}
        >
            <span className="text-sm text-white">Move X</span>
            <input
                type="number"
                value={step}
                onChange={(e) => setStep(Number(e.target.value))}
                className="h-8 rounded-lg px-3 text-sm bg-gray-800 text-white placeholder:text-gray-400"
            />
            <span className="text-sm text-white">steps</span>
        </div>
    )
}

export default MOVE_X
