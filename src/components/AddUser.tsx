import React, {useState} from 'react';

interface User {
    firstName?: string
    lastName?: string
}

export const AddUser = (props) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [isForm, setForm] = useState<Boolean>(false);

    const toggleForm = () => {
        setForm(!isForm);
    }

    const handleChange = event => {
        const inputName = event.target.name;
        if (inputName == 'firstName')
            setFirstName(event.target.value)
        else if (inputName == 'lastName')
            setLastName(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault();
        const user: User = {
            firstName: firstName,
            lastName: lastName
        };
        props.onUserSubmit(user);
        setFirstName("");
        setLastName("");
    }

    return (!isForm ?
        <button onClick={toggleForm}>Add User</button>
        :
        <div>
            Enter Data for new user:
            <form>
                <input type="text" name="firstName" value={firstName} onChange={handleChange}/>
                <input type="text" name="lastName" value={lastName} onChange={handleChange}/>
                <button onClick={handleSubmit}>Add</button>
                <button onClick={toggleForm}>Cancel</button>
            </form>
        </div>)
}