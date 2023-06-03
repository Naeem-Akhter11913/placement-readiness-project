import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContxt';
import {auth} from '../FirebaseConfig'
import { toast } from 'react-toastify';
import ErrorMaping from '../Utils/ErrorMaping';


const SingupForm = ({handleClose}) => {
    const [email,setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('')
    const {theme} = useTheme();


    const handleSubmit = () =>{
        if(!email || !confirmPassword){
            // alert('fill all details')
            toast.warning('fill the all details please', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return;
        }
        if(password !== confirmPassword){
            // alert('password does not match')
            toast.warning('password does not match', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return;
        }
        
        auth.createUserWithEmailAndPassword(email,password).then((res)=>{
            // alert('user create')
            toast.success('user create', {
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
        }).catch((err)=>{
            // alert('No, able to create user , try again',err);
            toast.error(ErrorMaping[err.code] ||'some error accure', {
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
        <Box
            p={3}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}
        >
            <TextField
                variant="outlined"
                type='email'
                label='Enter Email'
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: theme.textColor
                    }
                }
                }
                InputProps={{
                    style:{
                        color: theme.textColor
                    }
                }}
            />
            <TextField
                variant='outlined'
                type='password'
                label='Enter password'
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: theme.textColor
                    }
                }
                }
                InputProps={{
                    style:{
                        color: theme.textColor
                    }
                }}
            />
            <TextField
                variant='outlined'
                type='password'
                label='Confirm password'
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: theme.textColor
                    }
                }
                }
                InputProps={{
                    style:{
                        color: theme.textColor
                    }
                }}
            />
            <Button
            variant='contained'
            size='large'
            style={{background: theme.textColor, color: theme.background}}
            onClick={handleSubmit}
            >
                Signup
            </Button>
        </Box>
    )
}

export default SingupForm