import { collection, Timestamp, addDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import  { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage,db } from '../firebaseConfig';
import { toast } from 'react-toastify';

export default function AddBlog() {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    image:'',
    createdAt: Timestamp.now().toDate(),
  });

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  }

  const handlePublish = () => {
    if(!formData.title || !formData.description || !formData.image) {
      alert('Please fill all the fields');
      return;
    }

    const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`);
    const uploadImage = uploadBytesResumable(storageRef, formData.image)
    uploadImage.on('state_changed', (snapshot) => {
      const progressPercent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
    },
    (error) => {
      console.log(error);
    },
    () => {
      setFormData({
        title: '',
        description: '',
        image: '',
      });

      getDownloadURL(uploadImage.snapshot.ref)
      .then((url) => {
        const blogRef = collection(db, "Articles" );
        addDoc(blogRef, {
          title: formData.title,
          description: formData.description,
          imageUrl: url,
          createdAt: Timestamp.now().toDate(),
        })
        .then(() => {
          toast('Blog added successfully', {type: "success"});
          setProgress(0);
        })
        .catch((error) => {
          toast("Error adding blog", {type: "error"});
        });

      })
    });
  };
  return (
    <div className='border p-3 mt-3 bg-light' style={{position:"fixed"}}>
      <h2>Create Blog</h2>
      <label htmlFor=''>Title</label>
      <input type='text' name='title' className='form-control' value={formData.title} onChange={(e) => handleChange(e)}/>

      {/* Description */}
      <label htmlFor=''>Description</label>
      <textarea name='description' className='form-control' value={formData.description} onChange={(e) => handleChange(e)}/>

      {/* image */}
      <label htmlFor=''>Image</label>
      <input type='file' name='image' accept='image/*' className='form-control' onChange={(e) => handleImageChange(e)}/>

      {/* Progress */}
    {progress === 0 ? null : (
        <div className="progress">
        <div className="progress-bar progress-bar-stripped mt-2" style={{width: `${progress}%`}}>
          {`uploading image ${progress}%`}%
        </div>
      </div>
    )}

      <button className='form-control btn-primary mt-2' onClick={handlePublish}>Publish</button>
    </div>
  )
}
