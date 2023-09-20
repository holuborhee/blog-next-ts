'use client';
import * as React from 'react';
import TextField from '@mui/material/TextField';


export default function SignIn() {
  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
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
      />
    </>
  );
}