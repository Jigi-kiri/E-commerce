import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, FormControl, FormLabel, Input, Typography } from "@mui/material";

interface RegisterProps {
    firstName: string;
    lastName: string;
    userEmail: string;
    userPassword: string;
}

const initialData: RegisterProps = {
    firstName: "",
    lastName: "",
    userEmail: "",
    userPassword: "",
}
const Register: React.FC = () => {
    const navigate = useNavigate();
    const [userInput, setUserInput] = React.useState<RegisterProps>(initialData);

    const changeHandler = (e: any) => {
        const { name, value } = e.target;
        setUserInput({ ...userInput, [name]: value });
    };

    const submitHandler = (e: any) => {
        e.preventDefault();
        createUserWithEmailAndPassword(
            auth,
            userInput.userEmail,
            userInput.userPassword
        )
            .then((res) => {
                navigate("/");
                if (userInput.userEmail && userInput.userPassword) {
                    toast.success("Successfully registered, Please login!");
                }
            })
            .catch((error) => {
                let errorCode = error.code.split("auth/")[1];
                if (errorCode) {
                    toast.warn(errorCode);
                }
            });
    };

    return (

        <div className="registerform">
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
                    <Typography variant="body2">Register</Typography>
                </div>
                <FormControl >
                    <FormLabel>First Name</FormLabel>
                    <Input
                        fullWidth
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        value={userInput.firstName}
                        onChange={changeHandler}
                        required
                    />
                </FormControl>
                <FormControl >
                    <FormLabel>Last Name</FormLabel>
                    <Input
                        fullWidth
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={userInput.lastName}
                        onChange={changeHandler}
                        required
                    />
                </FormControl>
                <FormControl >
                    <FormLabel>Email</FormLabel>
                    <Input
                        fullWidth
                        name="userEmail"
                        type="email"
                        placeholder="johndoe@email.com"
                        value={userInput.userEmail}
                        onChange={changeHandler}
                        required
                    />
                </FormControl>
                <FormControl >
                    <FormLabel>Email</FormLabel>
                    <Input
                        fullWidth
                        type="password"
                        placeholder="Password"
                        name="userPassword"
                        value={userInput.userPassword}
                        onChange={changeHandler}
                        required
                    />
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1 }}
                    type="submit"
                    onClick={(value) => submitHandler(value)}
                >
                    Signup
                </Button>
            </Box>
            <ToastContainer />
            <span>Already have an account?</span>
            <span> </span>
            <span>
                <Link className="signbtn" to="/login">
                    Signin
                </Link>
            </span>
        </div>
    );
};

export default Register;
