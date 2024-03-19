"use client";

import { Box, Button, Grid, LinearProgress, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import styles from "@/app/page.module.css";
import { Login } from "@mui/icons-material";
import { signIn } from "next-auth/react";

interface Credentials {
  username: string;
  password: string;
}

export default function LoginPage(){
  const noSpecialChars = /^[a-zA-Z0-9_]+$/;

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const usernameRef: any = useRef();
  const passwordRef: any = useRef();
 
  const login = async(data: Credentials) => {

    const response = await signIn("credentials", {
      redirect: false,
      ...data
    });

    if(response?.error){
      console.log("Error: ", response.error);
    }
  }

  const handleSubmit = () => {
    setIsLoading(true);

    const eUsername = usernameRef.current.value ?? null;
    const ePassword = passwordRef.current.value ?? null;

    if(!eUsername && !ePassword){
      setErrors({
        username: "Required field...",
        password: "Required field...",
      });

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    }

    setErrors({
      username: "",
      password: "",
    });

    const creds: Credentials = {
      username: eUsername,
      password: ePassword
    }

    login(creds);
  }

  const handleInputChange = (type: string, event: any) => {
    const inputValue = event.target.value;

    switch (type) {
      case "username":
        if(inputValue.length > 0){
          if(!noSpecialChars.test(inputValue)){
            setErrors((prev)=>{
              const newState = {...prev};
              newState.username = "letters, numbers, or underscore only...";

              return newState;
            });

            return;
          }
        }
        
        if(inputValue.length < 8){
          setErrors((prev)=>{
            const newState = {...prev};
            newState.username = "minimum of 8 characters...";
            return newState;
          });

          return;
        }
        
        setErrors((prev)=>{
          const newState = {...prev};
          newState.username = "";
          return newState;
        });
      break;
    
      default:
        if(inputValue.length < 8){
          setErrors((prev)=>{
            const newState = {...prev};
            newState.password = "minimum of 8 characters...";
            return newState;
          });

          return;
        }
        
        setErrors((prev)=>{
          const newState = {...prev};
          newState.password = "";
          return newState;
        });
      break;
    }
  }

  return (
    <div className={styles.login_page}>
      <Grid 
        container 
        spacing={2} 
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} textAlign="center">
          <img src="/img/b_logo.png" className={styles.login_logo}/>
        </Grid>
        <Grid item lg={5} md={6} sm={8} xs={12}>
          <Typography variant="h4" align="center">Welcome to Store Manager</Typography>
          {isLoading && <LinearProgress />}
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                inputRef={usernameRef}
                label="Username"
                margin="normal"
                fullWidth
                autoFocus
                error={errors.username?true:false}
                helperText={errors.username}
                onChange={(e)=>handleInputChange("username", e)}
              />
              <TextField
                required
                inputRef={passwordRef}
                label="Password"
                type={showPassword?"input":"password"}
                margin="normal"
                fullWidth
                error={errors.password?true:false}
                helperText={errors.password}
                onChange={(e)=>handleInputChange("password", e)}
              />
              <Button
                variant="contained"
                onClick={handleSubmit}
                endIcon={<Login />}
                style={{ marginTop: "10px" }}
                disabled={isLoading}
              >
                Login
              </Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}