import React, { useState ,useEffect} from 'react'
import APIService from '../components/APIService'
function Form(props) {
     
    const [assigned_to, setassigned_to] = useState('');
    const [status, setstatus] = useState('');
    const [due_date, setdue_date] = useState('');
    const [priority, setpriority] = useState('');
    const [comments, setcomments] = useState('');


    useEffect(()=>{
        setassigned_to(props.article.assigned_to || '');
        setstatus(props.article.status || '');
        setdue_date(props.article.due_date || '');
        setpriority(props.article.priority || '');
        setcomments(props.article.comments || '');
    },[props.article])

    const updateArticle = () => {
        APIService.UpdateArticle(props.article.id, {
            assigned_to, // New field
            status,      // New field
            due_date: due_date.slice(0, 10), // Format as yyyy-MM-dd
            priority,    // New field
            comments     // New field
        })
        .then(resp => props.updatedData(resp))
        .catch(error => console.log(error));
    };
   
    const insertArticle=()=>{
        APIService.insertArticle({assigned_to, // New field
            status,      // New field
            due_date,    // New field
            priority,    // New field
            comments })
        .then(resp=>props.insertedArticle(resp))
        .catch(error=>console.log(error))
    }

   


  return (
     <div>
        {
            props.article ?(
                <div className='mb-3'>
                    <label htmlFor='assigned_to' className='form-label'>Assigned To</label>
                    <input
                        type='text'
                        className='form-control'
                        value={assigned_to}
                        onChange={(e) => setassigned_to(e.target.value)}
                    />

                    <label htmlFor='status' className='form-label'>Status</label>
                    <input
                        type='text'
                        className='form-control'
                        value={status}
                        onChange={(e) => setstatus(e.target.value)}
                    />

                    <label htmlFor='due_date' className='form-label'>Due Date</label>
                    <input
                        type='date'
                        className='form-control'
                        value={due_date}
                        onChange={(e) => setdue_date(e.target.value)}
                    />

                    <label htmlFor='priority' className='form-label'>Priority</label>
                    <input
                        type='text'
                        className='form-control'
                        value={priority}
                        onChange={(e) => setpriority(e.target.value)}
                    />

                    <label htmlFor='comments' className='form-label'>Comments</label>
                    <textarea
                        className='form-control'
                        value={comments}
                        onChange={(e) => setcomments(e.target.value)}
                        placeholder='Enter any comments'
                    />
                {
                    props.article.id ?<button 
                    onClick={updateArticle}
                    className='btn btn-success mt-3'
                     >Update</button>
                     :
                     <button 
                    onClick={insertArticle}
                    className='btn btn-success mt-3'
                     >ADD</button>
                     

                     
                }
                 

                   
                </div>
            ):null
        }
     </div>
  )
}

export default Form
