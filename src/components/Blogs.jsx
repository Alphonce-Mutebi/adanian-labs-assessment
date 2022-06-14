import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth,db } from '../firebaseConfig';
import DeleteBlog from './DeleteBlog';
import { useAuthState } from "react-firebase-hooks/auth";
import LikeBlog from "./LikeBlog";
import { Link } from "react-router-dom";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [user] = useAuthState(auth);
    
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
                blogs.map(({id,
                    title,
                    description,
                    imageUrl,
                    createdAt,
                    createdBy,
                    userId,
                    likes,
                    comments,}) => (
                <div className='border mt-3 p-3 bg-light' key={id}>
                    <div className="row">
                        <div className="col-3">
                            <Link to={`/blog/${id}`}>
                                <img src={imageUrl} alt="title" className='img-fluid' />
                            </Link>
                        </div>

                    <div className="col-9 ps-3">
                    <div className="row">
                        <div className="col-6">
                        {createdBy && (
                            <span className="badge bg-primary">{createdBy}</span>
                        )}
                        </div>
                        <div className="col-6 d-flex flex-row-reverse">
                        {user && user.uid === userId && (
                            <DeleteBlog id={id} imageUrl={imageUrl} />
                        )}
                        </div>
                    </div>
                    <h3>{title}</h3>
                    <p>{createdAt.toDate().toDateString()}</p>
                    <h5>{description}</h5>

                    <div className="d-flex flex-row-reverse">
                        {user && <LikeBlog id={id} likes={likes} />}
                        <div className="pe-2">
                        <p>{likes?.length} likes</p>
                        </div>
                        {comments && comments.length > 0 && (
                        <div className="pe-2">
                            <p>{comments?.length} comments</p>
                        </div>
                        )}
                    </div>
                    </div>
                    </div>
                </div>
                )
            )
        )}
    </div>
  )
}
