import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUserInfo } from './usersSlice';

function UserInfo() {

    const dispatch = useDispatch();

    const user = useSelector(state => state.users.entities)

    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);

    function handleChangeFirstName(firstName) {
        setFirstName(firstName);
    };

    function handleChangeLastName(lastName) {
        setLastName(lastName);
    };

    function handleChangeEmail(email) {
        setEmail(email);
    };

    function handleEditForm() {
        const inputs = Array.from(document.getElementsByClassName("input"));
        inputs.forEach(input => {
            input.readOnly = false;
        });
        const saveButton = document.getElementById("save");
        saveButton.hidden = false;
    };

    function handleSubmit(event) {
        event.preventDefault();
        const newUserInfo = {
            id: user.id,
            first_name: firstName,
            last_name: lastName,
            email: email
        };
        dispatch(editUserInfo(newUserInfo));
        const saveButton = document.getElementById("save");
        saveButton.hidden = true;
    }

    return(
        <div>
            <h1>Your Profile Information</h1>
            <form onSubmit={event => handleSubmit(event)}>
                <label>First Name  </label>
                    <input 
                        className="input" 
                        type="text" 
                        readOnly={true}
                        onChange={event => handleChangeFirstName(event.target.value)} 
                        value={firstName}
                    ></input>
                <label>Last Name  </label>
                    <input 
                        className="input" 
                        type="text" 
                        readOnly={true}
                        onChange={event => handleChangeLastName(event.target.value)}
                        value={lastName}
                        ></input>
                <label>Email  </label>
                    <input 
                        className="input" 
                        type="text" 
                        readOnly={true}
                        onChange={event => handleChangeEmail(event.target.value)}
                        value={email}
                        ></input>
                <input 
                    id="save" 
                    type="submit" 
                    value="Save Changes" 
                    hidden={true}></input>
            </form>
            <button onClick={handleEditForm}>edit</button>
        </div>
    );
};

export default UserInfo;