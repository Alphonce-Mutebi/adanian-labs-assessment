import React from 'react'

export default function AddBlog() {
  return (
    <div className='border p-3 mt-3 bg-light' style={{position:"fixed"}}>
      <h2>Create Blog</h2>
      <label htmlFor=''>Title</label>
      <input type='text' name='title' className='form-control' />

      {/* Description */}
      <label htmlFor=''>Description</label>
      <textarea name='description' className='form-control' />

      {/* image */}
      <label htmlFor=''>Image</label>
      <input type='file' name='image' accept='image/*' className='form-control'/>

      <div className="progress">
        <div className="progress-bar progress-bar-stripped mt-2" style={{width: "50%"}}>
          50%
        </div>
      </div>
      <button className='form-control btn-primary mt-2'>Publish</button>
    </div>
  )
}
