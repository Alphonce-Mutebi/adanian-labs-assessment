import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebaseConfig';
import DeleteBlog from './DeleteBlog';

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    
    // Fetches all blogs from the database
    useEffect(() => {
        const blogsRef = collection(db, "Articles" );
        const q = query(blogsRef, orderBy("createdAt", "desc"));
        onSnapshot(q,(snapshot) => {
            const blogs = snapshot.docs.map((doc) =>({
                id:doc.id,
                ...doc.data(),
            }));
            setBlogs(blogs);
            console.log(blogs);
        });
    }, []);
  return (
    <div>
        {
            // Display blogs from the database if there are any
            blogs.length === 0 ? (
                <p>No blogs yet</p>
            ):(
                blogs.map(({id, title,description, imageUrl, createdAt}) => (
                <div className='border mt-3 p-3 bg-light' key={id}>
                    <div className="row">
                        <div className="col-3">
                            <img src={imageUrl} alt="title" className='img-fluid' />
                        </div>
                        <div className='col-9 ps-3'>
                            <h2>{title}</h2>
                            <p>{createdAt.toDate().toDateString()}</p>
                            <h4>{description}</h4>
                            <DeleteBlog id={id} imageUrl={imageUrl} />
                        </div>
                    </div>
                </div>
                )
            )
        )}
    </div>
  )
}
