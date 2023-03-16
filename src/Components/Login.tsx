import * as React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../firebase";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, FormControl, FormLabel, Input, Typography } from "@mui/material";
import Link from '@mui/material/Link';
import { Stack } from "@mui/system";

interface UserProps {
    email: string;
    password: string;
}

const initialData: UserProps = {
    email: "",
    password: "",
}
const Login: React.FC = () => {
    const navigate = useNavigate();
    const [loginInput, setLoginInput] = React.useState<UserProps>(initialData);

    //Change Handler
    const loginChangeHandler = (e: any) => {
        const { name, value } = e.target;
        setLoginInput({ ...loginInput, [name]: value });
    };

    //Submit Handler
    const loginSubmitHandler = (e: any) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, loginInput.email, loginInput.password)
            .then((userCredential: any) => {
                localStorage.setItem("token", userCredential._tokenResponse.idToken);
                navigate("/");
                localStorage.setItem("res", "success");
            })
            .catch((error) => {
                let errorCode = error.code.split("auth/")[1];
                if (errorCode) {
                    toast.warn(errorCode);
                }
            });
    };


    return (
        <Box
            sx={{
                width: 300,
                mx: 'auto', // margin left & right
                my: 4, // margin top & botom
                py: 3, // padding top & bottom
                px: 2, // padding left & right
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRadius: 'sm',
                boxShadow: 'md',
            }}
        >
            <div>
                <Typography variant="h4" component="h1">
                    <b>Welcome!</b>
                </Typography>
                <Typography variant="body2">Sign in to continue.</Typography>
            </div>
            <Stack spacing={2}>

                <FormControl >
                    <FormLabel>Email</FormLabel>
                    <Input
                        fullWidth
                        name="email"
                        type="email"
                        placeholder="johndoe@email.com"
                        value={loginInput.email}
                        onChange={loginChangeHandler}
                        required
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        fullWidth
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={loginInput.password}
                        onChange={loginChangeHandler}
                        required
                    />
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1 }}
                    type="submit"
                    onClick={(value) => loginSubmitHandler(value)}
                >
                    Log in
                </Button>
                <Typography
                    fontSize="sm"
                    sx={{ alignSelf: 'center' }}
                >
                    Don&apos;t have an account?
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            navigate("/register")
                        }}>Sign up</Link>
                </Typography>
            </Stack>
            <ToastContainer />
        </Box>
    );
};

export default Login;
