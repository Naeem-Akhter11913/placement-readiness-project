import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContxt';
import { auth } from '../FirebaseConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorMaping from '../Utils/ErrorMaping';


const LoginForm = ({handleClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { theme } = useTheme()


    const handleSubmit1 = () => {
        if (!email || !password) {
            
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

        auth.signInWithEmailAndPassword(email, password).then((res) => {
            toast.success('logged in', {
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
        }).catch((err) => {
            // alert('envalid credentials');
            toast.error(ErrorMaping[err.code]||'some error accure', {
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
                    style: {
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
                    style: {
                        color: theme.textColor
                    }
                }}
            />
            <Button
                variant='contained'
                size='large'
                style={{ background: theme.textColor, color: theme.background }}
                onClick={handleSubmit1}
            >
                Login
            </Button>
        </Box>
    )
}

export default LoginForm