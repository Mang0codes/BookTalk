import React from 'react'
import { Button } from "@/components/ui/button";


const Search = ({ value, onChange }) => {
  return (
    <div className='flex items-center justify-center p-4'>
      <div className="w-full max-w-md px-4 py-2 rounded-xl backdrop-filter
        backdrop-blur-2xl bg-white/10 border-2 border-white/20 shadow-lg 
        sticky top-0 z-50 text-white flex items-center gap-2">

        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" 
          className="bi bi-search text-white" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 
          3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 
          6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>

        <input
          type="text"
          placeholder="Search books..."
          className="bg-transparent outline-none text-white placeholder-white/70 flex-1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Search