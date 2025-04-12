import React, { useEffect, useState } from 'react'

const MOVE_Y = ({ value = 10, onChange }) => {
  const [step, setStep] = useState(value);

  useEffect(() => {
    onChange?.({ value: step });
  }, [step]);

  return (
    <div 
    draggable
    className="flex items-center justify-between gap-2 bg-blue-600 px-4 py-3 rounded-xl font-medium">
      <span className="text-sm w-20 text-white">Move Y</span>
      <input
        type="number"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
        className="h-8 w-24 rounded-lg px-3 text-sm bg-gray-800 text-white"
      />
      <span className="text-sm text-white">steps</span>
    </div>
  )
}

export default MOVE_Y
