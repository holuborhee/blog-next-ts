'use client';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export default function SignUp() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="given-name"
          name="firstName"
          required
          fullWidth
          id="firstName"
          label="First Name"
          autoFocus
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          type="email"
          name="email"
          autoComplete="email"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
        />
      </Grid>
    </Grid>      
  );
}