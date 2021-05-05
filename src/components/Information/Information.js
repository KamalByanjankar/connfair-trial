import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Information.css';
import SearchIcon from '@material-ui/icons/Search';
import PopUp from '../PopUp/PopUp';

const base_URL = "https://jsonplaceholder.typicode.com/users";

function Information() {
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("")
    const [popUp, setPopUp] = useState(false)
    const [userId, setUserId] = useState(0)
    const [query, setQuery] = useState("")


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

    //add delay of 500ms after search
    useEffect(() => {
        const timeOutId = setTimeout(() => setSearchInput(query), 500);
        return () => clearTimeout(timeOutId);
      }, [query]);


    //refreshing the page
    const refreshPage = () => {
        window.location.reload()
    }

    //toggle dialog box
    const togglePopUp = (id) => {
        setPopUp(!popUp)
        setUserId(id)
    }

    //delete user from table
    const deleteUserHandler = (id) => {
        console.log("Inside delete user handler ", id)
        const newUserList = users.filter((user) => user.id !== id)
        setUsers(newUserList)
        togglePopUp()
    }

    //Search in the table
    const handleSearch = (e) => {
        e.preventDefault();
    }

    

    return (
        <div className="information">
        
            <button onClick={refreshPage}>Refresh</button>

            <form onSubmit = {handleSearch} className="information__search">
                <input 
                    className="information__searchInput"
                    type="text" 
                    value={query}
                    autoFocus
                    onChange={(e) => setQuery(e.target.value)}
                />
                <SearchIcon onClick={handleSearch} className="information__searchIcon" />
            </form>
            
            
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
                        users
                        .filter(value => {
                            return(
                                value.name.toLowerCase().includes(searchInput.toLowerCase())
                            )
                        })
                        .map((user, i) => {
                            return(
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address.street}</td>
                                    <td>{user.address.suite}</td>
                                    <td>{user.address.city}</td>
                                    <td>{user.company.name}</td>
                                    <td>
                                        <button 
                                            onClick={()=> togglePopUp(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    {/* <td     
                                        onClick={() => {
                                            const confirmBox = window.confirm("Do you really want to delete the user?")

                                            if (confirmBox === true){
                                                deleteUserHandler(user.id)
                                            }
                                        }}
                                        >
                                        Delete
                                    </td> */}
                                </tr> 
                            )
                        })
                    }  
                </tbody>      
            </table> 
            {
                popUp ? <PopUp deleteUser={() => deleteUserHandler(userId)} toggle={togglePopUp} /> : null
            }
        </div>
    )
}

export default Information