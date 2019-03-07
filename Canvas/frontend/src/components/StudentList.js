import React from 'react';

const StudentList = ({ students }) => {
    const renderedList = students.map(student => {
        // return <h1 key = {student.email} > {student.name} </h1>
        return (
           
           <div>
              <tr>
                <td data-label="Image">{student.image_path}</td>
                <td data-label="Name">{student.name}</td>
                <td data-label="Email">{student.email}</td>
              </tr>
             </div>
           
         
        )
    })
    return <div className = "list"> {renderedList} </div>
}

export default StudentList;