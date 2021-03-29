
import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const Login = () => {

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    });

    const [loggedInUser , setLoggedInUser] = useContext(userContext);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(result => {
                const { displayName, email, photoURL } = result.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signedInUser)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleFbSingIn = () => {
        firebase.auth().signInWithPopup(fbProvider)
            .then((result) => {
                // /** @type {firebase.auth.OAuthCredential} */
                const credential = result.credential;

                // The signed-in user info.
                const user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const accessToken = credential.accessToken;

                // ...
                console.log('Facebook User', user);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(result => {
                const signOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: ''
                }

                setUser(signOutUser)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleChange = (event) => {
        let isFiledValid = true;
        if (event.target.name === 'email') {
            isFiledValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            isFiledValid = /\d{1}/.test(event.target.value) && event.target.value.length >= 8;
        }
        if (isFiledValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo)
        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo)
                    updateUserName(user.name)
                    history.replace(from);

                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.name = res.user.displayName;
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }
        e.preventDefault()
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name,
        })
            .then(() => {
                console.log('User name update successfully');
            })
            .catch(error => {
                console.log(error);
            });
    }


    // // login Component javaScript
    // const x = document.getElementById("login");
    // const y = document.getElementById("register");
    // const z = document.getElementById("btn");
    // console.log(x, y, z);

    // function register() {
    //     x.style.left = "-400px";
    //     y.style.left = "50px";
    //     z.style.left = "110px";

    // }

    // function login() {
    //     x.style.left = "50px";
    //     y.style.left = "450px";
    //     z.style.left = "0px";

    // }

    return (
        <div style={{ textAlign: 'center' }}>

            {
                user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
                    <button onClick={handleSignIn}>Sign in</button>
            }
            <br />
            <button onClick={handleFbSingIn}>Sign in with Facebook</button>
            {
                user.isSignedIn &&
                <div classNameName="">
                    <h2>Welcome {user.name}</h2>
                    <p>Your Email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }


            <h1>Our Won Authentication</h1>

            <form onSubmit={handleSubmit}>
                <input onChange={() => setNewUser(!newUser)} type="checkbox" id="newUer" />
                <label htmlFor="newUer">New user sign up</label>
                <br />
                {
                    newUser &&
                    <input type="text" onBlur={handleChange} name="name" placeholder="Full Name" />
                }
                <br />
                <input type="email" onBlur={handleChange} name="email" placeholder="Your Email" required />
                <br />
                <input type="password" onBlur={handleChange} name="password" placeholder="Password" required />
                <br />
                <input type="submit" value={newUser ? 'Sign UP' : 'sign In'} />
            </form>

            <p style={{ color: 'red' }}>{user.error}</p>

            {
                user.success &&
                <p style={{ color: 'green' }}>User {newUser ? 'created' : 'login'} Successfully</p>
            }


            {/* <div className="hero">
                <div className="place">
                    <div className="btnbox">

                        <div id="btn"></div>

                        <button type="button" className="toggle-btn" onClick={login}>Log In</button>

                        <button type="button" className="toggle-btn" onClick={register}>Register</button>
                    </div>
                    <div className="social-icons">
                        <img src="facebook.png" alt="Facebook" />
                        <img src="twitter.png" alt="Twitter" />
                        <img src="google-plus.png" alt="Google" />


                    </div>

                    <form id="login" className="input-group">
                        <input type="email" className="input-field" placeholder="Email" />
                        <input type="Password" className="input-field" placeholder="Password" />
                        <input type="checkbox" className="checkbox" /><span>Rememder Password</span>
                        <button type="submit" className="submit-btn">Log in</button>
                    </form>

                    <form id="register" className="input-group">
                        <input type="email" className="input-field" placeholder="Email" />
                        <input type="Password" className="input-field" placeholder="Password" />
                        <input type="text" className="input-field" placeholder="Name" />
                        <input type="checkbox" className="checkbox" /><span>I agree to the terms & conditions</span>
                        <button type="submit" className="submit-btn">Register</button>
                    </form>

                </div>

            </div> */}

        </div>
    );
};

export default Login;