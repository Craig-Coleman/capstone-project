import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function UserInfo() {

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
                <input id="save" type="submit" value="Save Changes" hidden={true}></input>
            </form>
            <button onClick={handleEditForm}>edit</button>
        </div>
    );
};

export default UserInfo;