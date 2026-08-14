import React, { useState, useContext } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom';
import '../App.css'
import { IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("")

    const { addToUserHistory } = useContext(AuthContext);
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }


    return (
        <>
            <div className="navBar">
                <h2>Apna Video Call</h2>

                <div>
                    <IconButton onClick={() => navigate("/history")} sx={{ color: 'rgba(255, 255, 255, 0.85)', transition: 'all 0.3s ease', '&:hover': { color: '#ffb56b', transform: 'scale(1.1)' } }}>
                        <RestoreIcon />
                    </IconButton>
                    <p>History</p>

                    <button onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/auth")
                    }}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="meetContainer">
                <div className="leftPanel">
                    <h2>Providing Quality Video Call Just Like Quality Education</h2>

                    <div>
                        <TextField 
                            onChange={e => setMeetingCode(e.target.value)} 
                            label="Meeting Code" 
                            variant="outlined" 
                            fullWidth
                            placeholder="Enter meeting code"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'rgba(255, 255, 255, 0.95)',
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.15)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#ffb56b',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#ffb56b',
                                        boxShadow: '0 0 0 3px rgba(255, 152, 57, 0.2)',
                                    },
                                },
                                '& .MuiOutlinedInput-input': {
                                    color: 'rgba(255, 255, 255, 0.95)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    opacity: 1,
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    '&.Mui-focused': {
                                        color: '#ffb56b',
                                    },
                                },
                            }}
                        />
                        <button onClick={handleJoinVideoCall}>Join Meeting</button>
                    </div>
                </div>
                <div className='rightPanel'>
                    <img src='/logo3.png' alt="Meeting illustration" />
                </div>
            </div>
        </>
    )
}

export default withAuth(HomeComponent)