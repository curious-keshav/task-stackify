import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';


const MOVE_Y = ({ value = 10, onChange, handleDeleteButton}) => {
  const [step, setStep] = useState(value);

  useEffect(() => {
    onChange?.({ value: step });
  }, [step]);

  return (
    <>
      <div
        className="relative flex items-center justify-center gap-4 bg-gradient-to-r from-blue-500 to-blue-700 px-5 py-4 rounded-2xl shadow-lg text-white"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Move Y</span>
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            className="h-8  rounded-lg px-3 text-sm bg-gray-800 text-white"
          />
          <span className="text-sm">steps</span>
        </div>

        <button onClick={handleDeleteButton} className="absolute shadow-sm right-4 text-xs px-1 py-1 bg-gray-800 hover:bg-gray-900 rounded-md font-medium transition duration-150">
          <DeleteIcon fontSize='small' />
        </button>
      </div>
    </>
  )
}

export default MOVE_Y
