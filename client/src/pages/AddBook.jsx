import React, { useState } from 'react'
import Header from '../components/Header'
import TextareaAutosize from 'react-textarea-autosize';
import bg from '../assets/imgs/bgimg2.jpg'
import { useNavigate } from "react-router-dom";


const AddBook = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const navigate = useNavigate();

  const handleImgChange = (e) =>{
    setImgFile(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !year || !category || !imgFile) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("publishedYear", year);
      formData.append("category", category);
      formData.append("image", imgFile);

      const token = localStorage.getItem("token"); // If you're using JWT auth

      const res = await fetch("http://localhost:3000/book/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        alert("Book added successfully!");
        setTitle("");
        setDescription("");
        setYear("");
        setCategory("");
        setImgFile(null);
        navigate("/");
      } else {
        alert(data.message || "Something went wrong");
      }

    } catch (error) {
      console.error(error);
      alert("Error while adding book");
    }
  }


  return (
    <div style={{ backgroundImage: `url(${bg})` }} className='bg-cover bg-fixed '>
      <div>
        <Header />
      </div>  
      <div className='flex justify-center items-center h-screen'>
      <div className='w-full min-w-xl sm:w-96 p-4 px-10 rounded-xl backdrop-filter
               backdrop-blur-2xl bg-white/10 border-2 border-white/20 shadow-lg 
              top-0 z-50 text-white h-auto'>
      <div className='text-center text-3xl libertinus-sans-bold pb-6'>Add Book</div>

      <form className='space-y-6' onSubmit={handleSubmit}>
        <div>
        <label className='libertinus-sans-bold'>Title</label><br/>
        <input className='w-full h-10 border-b-2 focus:outline-none' 
        type='text' placeholder='The Hunger Games'></input>
      </div>
      <div>
        <label className='libertinus-sans-bold'>Description</label><br/>
        <TextareaAutosize minRows={3}
    maxRows={5}
    className='w-full h-32 border-b-2 bg-transparent focus:outline-none overflow-y-auto p-2 resize-none scrollbar-white-20'
    placeholder='Write a short description...'
  ></TextareaAutosize>
      </div>
      <div>
        <label className='libertinus-sans-bold'>Published Year</label><br/>
        <input className='w-full h-10 border-b-2 focus:outline-none'
        type='text' placeholder='2025'></input>
      </div>
      <div>
        <label className='libertinus-sans-bold'>Select Category</label><br/>
        <select className='w-full h-10 border-b-2 bg-white/20 focus:outline-none'
        type='text' placeholder='2025'>
          <option className='text-black'>Mystery</option>
          <option className='text-black'>Drama</option>
          <option className='text-black'>Romance</option>
          <option className='text-black'>Horror</option>
          <option className='text-black'>Thriller</option>
          <option className='text-black'>Sci-fic</option>
          <option className='text-black'>Self-help</option>
        </select>
      </div>
      <div>
        <label className="block mb-2 libertinus-sans-bold">Upload Cover</label>
          <label className="libertinus-sans-bold w-full cursor-pointer flex justify-center items-center px-4 py-2 border border-dashed border-gray-400 rounded-lg hover:bg-white/10 text-center">
              {imgFile ? (
                <div>Image Uploaded</div>) : (
                <div>Upload Image</div>
              )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImgChange}
              className="hidden"
            />
            
          </label>
      </div>
      <div className='flex libertinus-sans-bold justify-center items-center'>
        <button type="submit"
        className='px-6 py-3 my-2 font-semibold border-2 rounded-xl hover:bg-white/10 transition duration-300'>ADD BOOK</button>
      </div>

      </form>
    </div>
    </div>
    </div>
  )
}

export default AddBook;