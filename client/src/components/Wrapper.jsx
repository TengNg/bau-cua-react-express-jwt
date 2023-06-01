import React from 'react'

export default function Wrapper({ children }) {
  return (
        <div className='w-[100%] h-[100vh] bg-gray-400 flex--center flex-col gap-4 relative'>
            {children}
        </div>
  )
}
