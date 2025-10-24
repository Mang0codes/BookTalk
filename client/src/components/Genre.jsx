import React from 'react'
import { Link } from "react-router-dom";

const Genre = ({name}) => {
  return (
    <Link
    to={`/filter/${encodeURIComponent(name)}`}>
    <button className='bg-white/20 cursor-pointer text-white rounded-xl px-2 py-1 w-auto border-2
     border-white/10 hover:bg-white/10 hover:border-white/20'>{name}</button>
    </Link>
  )
}

export default Genre