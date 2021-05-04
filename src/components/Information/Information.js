import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Information.css';

const base_URL = "https://jsonplaceholder.typicode.com/users";

function Information() {
    const [users, setUsers] = useState([]);

    //fetch data using axios from an API
    useEffect(() => {
        async function getDataFromAPI() {
            await axios.get(`${base_URL}`)
            .then(response => {
                // console.log(response.data)
                setUsers(response.data)
            })
            .catch(error => {
                alert(error.message)
            })
        }
        
        getDataFromAPI()
    }, [])

    const popUpHandler = (id) => {
        alert('clicked')
    }

    return (
        <div className="information">
            <h1>List</h1>

            <button>Refresh</button>
            
            <table>
                <thead>
                    <tr>
                        <th rowSpan="2">Name</th>
                        <th rowSpan="2">Email</th>
                        <th colSpan="3">Address</th>
                        <th rowSpan="2">Company Name</th>
                        <th rowSpan="2">Action</th>
                            
                    </tr>
                    <tr>
                        <td>Street</td>
                        <td>Suite</td>
                        <td>City</td>
                    </tr>               
                </thead>  

                <tbody>
                    {
                        users.map((user, i) => {
                            return(
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address.street}</td>
                                    <td>{user.address.suite}</td>
                                    <td>{user.address.city}</td>
                                    <td>{user.company.name}</td>
                                    <td>
                                        <button onClick={() => popUpHandler(user.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr> 
                            )
                        })
                    }
                   
                       
                </tbody>      
            </table>

        </div>
    )
}

export default Information
