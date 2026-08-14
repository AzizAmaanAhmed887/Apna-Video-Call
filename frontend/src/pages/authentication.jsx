import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';

const defaultTheme = createTheme();

export default function Authentication() {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');

    const [formState, setFormState] = React.useState(0);

    const [open, setOpen] = React.useState(false);


    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    const handleAuth = async () => {
        setError('');
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            } else {
                const result = await handleRegister(name, username, password);
                setMessage(result);
                setOpen(true);
                setFormState(0);
                setPassword('');
            }
        } catch (err) {
            const message = err?.response?.data?.message || 'Unable to authenticate. Please try again.';
            setError(message);
        }
    };


    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(/background.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={8} square>
                    <Box
                        sx={{
                            my: 10,
                            mx: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: 430,
                                p: 4,
                                borderRadius: 4,
                                background: 'rgba(255, 255, 255, 0.08)',
                                boxShadow: '0 32px 80px rgba(0, 0, 0, 0.18)',
                                backdropFilter: 'blur(18px)',
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                            </Box>
                            <Typography component="h1" variant="h5" align="center" sx={{ fontWeight: 700, mb: 1 }}>
                                {formState === 0 ? 'Welcome Back' : 'Create Your Account'}
                            </Typography>
                            <Typography variant="body2" align="center" sx={{ color: 'rgba(255,255,255,0.75)', mb: 3 }}>
                                {formState === 0
                                    ? 'Sign in to join meetings and stay connected with friends.'
                                    : 'Register to start secure calls with your friends and family.'}
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
                                <Button
                                    fullWidth
                                    variant={formState === 0 ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => setFormState(0)}
                                >
                                    Login
                                </Button>
                                <Button
                                    fullWidth
                                    variant={formState === 1 ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={() => setFormState(1)}
                                >
                                    Sign Up
                                </Button>
                            </Box>

                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                {formState === 1 && (
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="fullName"
                                        label="Full Name"
                                        name="name"
                                        value={name}
                                        autoComplete="name"
                                        onChange={(e) => setName(e.target.value)}
                                        autoFocus
                                        InputLabelProps={{ style: { color: 'rgba(255,255,255,0.75)' } }}
                                        InputProps={{ sx: { color: '#fff' } }}
                                    />
                                )}
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    value={username}
                                    autoComplete="username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoFocus={formState === 0}
                                    InputLabelProps={{ style: { color: 'rgba(255,255,255,0.75)' } }}
                                    InputProps={{ sx: { color: '#fff' } }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputLabelProps={{ style: { color: 'rgba(255,255,255,0.75)' } }}
                                    InputProps={{ sx: { color: '#fff' } }}
                                />

                                {error && (
                                    <Typography color="error" sx={{ mt: 1, mb: 1, textAlign: 'center' }}>
                                        {error}
                                    </Typography>
                                )}

                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    sx={{ mt: 2, mb: 1, py: 1.3, fontWeight: 700 }}
                                    onClick={handleAuth}
                                >
                                    {formState === 0 ? 'Login' : 'Register'}
                                </Button>

                                <Typography variant="body2" align="center" sx={{ color: 'rgba(255,255,255,0.75)', mt: 1 }}>
                                    {formState === 0
                                        ? 'New here? Switch to Sign Up to create an account.'
                                        : 'Already have an account? Switch to Login to sign in.'}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar open={open} autoHideDuration={4000} message={message} onClose={() => setOpen(false)} />
        </ThemeProvider>
    );
}