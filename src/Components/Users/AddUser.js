import React, {useState} from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./AddUser.module.css"
import ErrorModal from '../UI/ErrorModal';
import axios from 'axios';
import { useEffect } from "react";

const AddUser = (props) => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [totalAge, setTotalAge] = useState('');

    const addUserHandler = (event) => {
        event.preventDefault();
        if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0){
            setError({title: 'Invalid input',
            message: 'Please enter a valid name and age (non-empty values).',})
            return;
        }
        if(+enteredAge < 1){
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (> 0).',
              });
            return;
        }
        props.onAddUser(enteredUsername, enteredAge)
        setEnteredUsername('')
        setEnteredAge('')
    }

    const usernameChangeHandler = (event)=>{
        setEnteredUsername(event.target.value)
    }

    const ageChangeHandler = (event)=>{
        setEnteredAge(event.target.value)
    }
    const errorHandler = () => {
        setError(null);
      };


    function axiosTest() {
        // create a promise for the axios request
        const promise = axios.get("https://64591f524eb3f674df875c2e.mockapi.io/users")
    
        // using .then, create a new promise which extracts the data
        const dataPromise = promise.then((response) =>{
            console.log( response.data)
            setUsers(response.data)
        })
        // console.log();
    }
    useEffect(()=>{
        axiosTest()
        setTotalAge(users.reduce((total, a) => total + a.age, 0))
    },[])
    
    return (
        <div>
        {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
        <Card className={classes.input}>
            <form onSubmit={addUserHandler}>
                <label htmlFor="username">User Name</label>
                <input id="username" value={enteredUsername} onChange={usernameChangeHandler} type="text" />
                <label htmlFor="age">Age</label>
                <input id="age" value={enteredAge} type="number" onChange={ageChangeHandler}/>
                <Button type="submit">Add User</Button>
            </form>
        </Card>
        <div>
{users.map(user=>{
    return (
        <div key={user.id}>
          <h2>name: {user.name}</h2>
          <h2>age: {user.age}</h2>
          <h2>id: {user.id}</h2>
          <hr />
        </div>
      );
})}

<h2>{totalAge/users.length}</h2>
        </div>
        </div>
    )
}

export default AddUser;