import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, Modal, Tab, Tabs } from '@mui/material';
import LoginForm from './LoginForm';
import SingupForm from './SingupForm';
import { useTheme } from '../context/ThemeContxt';
import GoogleButton from 'react-google-button'
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { auth } from '../FirebaseConfig';
import { toast } from 'react-toastify';
import ErrorMaping from '../Utils/ErrorMaping';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';


const AccountCircle = () => {


    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(0)
    const {theme} = useTheme();


    const navigate = useNavigate();
    // const user = auth.onAuthStateChanged
    const [user] = useAuthState(auth);
    
    const handleModalOpen = () => {
        if(user){
            // navigate to the user page 
            navigate('/user')
        }else{
            setOpen(true)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleValueChange = (e,v) =>{
        setValue(v)
    }

    const logout = () =>{
        auth.signOut().then((res)=>{
            toast.success('logged out', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
        }).catch((err) =>{
            toast.error('not able to logout', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
        })
    }

    // google signin 
    const googleProvider = new GoogleAuthProvider();
    const handleGoogleSignin = () =>{
        signInWithPopup(auth,googleProvider).then((res)=>{
            toast.success('logged in successfull', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                handleClose()
        }).catch((err) =>{
            toast.warning(ErrorMaping[err.code] ||'logged in', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        })
    }


    return (
        <div>
            <AccountCircleIcon onClick={handleModalOpen} />
                { user && <LogoutIcon onClick = {logout}/> }
            <Modal
                open={open}
                onClose={handleClose}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div style={{ width: '400px', textAlign: 'center' }}>
                    <AppBar position='static' style={{background: 'transparent'}}>
                        <Tabs
                            value={value}
                            onChange={handleValueChange}
                            variant='fullWidth'
                        >


                            <Tab label='login' style={{color: theme.textColor}}>
                                
                            </Tab>
                            <Tab label='singup' style={{color: theme.textColor}}>
                                
                            </Tab>


                        </Tabs>
                    </AppBar>
                    {value === 0 && <LoginForm handleClose = {handleClose}/>}
                    {value === 1 && <SingupForm handleClose = {handleClose}/>}
                    <Box>
                        <span>OR
                        </span>
                            <GoogleButton
                            style={{width: '100%', marginTop: '12px'}}
                            onClick={handleGoogleSignin}
                            />
                    </Box>
                </div>
            </Modal>

        </div>
    )
}

export default AccountCircle