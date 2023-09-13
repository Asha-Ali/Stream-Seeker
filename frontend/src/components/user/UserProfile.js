import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../Navbar/Navbar"
import "../user/UserProfile.css"

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState([])
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { userId } = useParams();
    const [showDetails, setShowDetails] = useState(false) 
    const [showError, setShowError] = useState(false) 
    const [editing, setEditing] = useState(false);
    const [subscriptions, setSubscriptions] = useState("");

    useEffect( () => {
        if(!token) {
            setShowError(true);
        }

        if(token) {
            fetch(`/users/${userId}`, {
                headers: {'Authorization': `Bearer ${token}`}
            })
            .then (response => response.json())
            .then( async data => {
                window.localStorage.setItem("token", token);
                setToken(window.localStorage.getItem("token"));
                setUserInfo(data);
                setSubscriptions(data.subscriptions)
                setShowDetails(true);
            })
        } 
    }, [])     

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        const updatedData = {
        subscriptions: subscriptions
        };

        fetch(`/users/${userId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
        })
        .then((response) => response.json())
        .then((data) => {
            setUserInfo(data.user);
            setToken(data.token)
            setEditing(false);
        });
    };

    return(
        <>
        <Navbar/>
        { showDetails && (
        <div className='info-div'>
            <h2 className='heading'>Your Profile</h2>
            <div className='details-div'>
            <div>
                <div className='email-div'>
                    <p className='email-label' data-cy="email">Email: </p>
                    <p className='email'>{userInfo.email}</p>
                </div>
                <div className='name-div'>
                    <p className='name-label' data-cy="name">Name:</p>
                    <p className='name'>{userInfo.name}</p>
                </div>
                { editing ? (
                    <>
                    <div className='subscriptions-div'>
                        <label className='subscriptions-label' htmlFor="subscriptions">Subscriptions:</label>
                        <input
                        type="text"
                        className='subscriptions'
                        id="subscriptions"
                        value={subscriptions}
                        onChange={(e) => setSubscriptions(e.target.value)}
                        />
                    </div>
                        <br />
                        <button className='save' onClick={handleSave}>Save</button>
                    </>
                ) : (
                    <>
                        <div className='subscriptions-div'>
                            <p className='subscriptions-label' data-cy="subscriptions">Subscriptions:</p>
                            <p className='subscriptions'>{subscriptions}</p>
                        </div>
                        <button className='edit' onClick={handleEdit}>Edit</button>
                    </>
                )}
            </div>
            </div>
        </div>
        )}
        { showError && (
            <div className='error-message'>
                <p>Sorry, you need to be logged in to see your profile</p>
                <a href='/login'>Go to Login</a>
            </div>
        )}
        </>
        ) 
}

export default UserProfile;