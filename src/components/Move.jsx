import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Move.css'



const PostsTable = () => {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const data = async () => {
      try {
        const res = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`);
        const value = res.data.hits;
        setState(prevData => [...prevData, ...value]);
        setPage(prevPage=>prevPage+1)
      } catch (error) {
        console.error( error);
      }
    };

    const interval = setInterval(data, 10000);
    
      return () => clearInterval(interval);
    

    
  }, [page]);
  return (
    <div className='main'>
   <center>     <h1> Polling app</h1></center>
   <center><p>page count:-{page}</p></center>
        <table >
            <thead>
                <tr>
                    <th>Author</th>
                    <th>Url</th>
                    <th>Created</th>
                    <th>Title</th>

                </tr>
            </thead>
            <tbody>
       {
state.map((e)=>{
    return(
        <tr>
            <td>{e.author}</td>
            <td>{e.url}</td>
            <td>{e.created_at}</td>
            <td>{e.title}</td>
        </tr>
    )
})

       }
       </tbody>
       </table>
    </div>)

  
};

export default PostsTable;