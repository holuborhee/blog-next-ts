'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { usePathname, useRouter } from 'next/navigation'
import { Alert, AlertTitle, Snackbar } from '@mui/material';


async function postMethod(url: string, data: Partial<IUser>): Promise<Array<String> | Boolean>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}/`, { method: 'POST', headers: {
    "Content-Type": "application/json",
  }, body: JSON.stringify(data) });

  if (!res.ok && res.status === 400) {
    const error = await res.json();
    return Object.keys(error).reduce((arr: Array<String>, key) => {
      return [...arr, ...error[key].map((val:string) => `${key}: ${val}`)]
    }, [])
  } else if(res.status === 200){
    const tokens = await res.json()
    localStorage.setItem('tokens', JSON.stringify(tokens))
  }

  return res.ok
}


type AuthPage = '/login' | '/register'
const authPagesTitle: Record<AuthPage, string> = {
    "/login": "Sign in",
    "/register": "Sign up"
}

function RedirectLink({ currentPage }: { currentPage: AuthPage}){
  return (
      <Link href={currentPage === '/login' ? '/register' : '/login' } variant="body2">
          {
              currentPage === '/login' ? "Don't have an account? Sign Up" : 'Already have an account? Sign in'
          }
      </Link>
  )  
}

export default function Authlayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
  
  const router = useRouter()
  const currentPath: AuthPage = usePathname() as AuthPage

  const [errors, setErrors] = React.useState<String[]>([])
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)

  const registerUser = (formData: FormData) => {
    const user: Omit<IUser, 'id'> = {
      first_name: formData.get('firstName') as string,
      last_name: formData.get('lastName') as string,
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }
    return postMethod('register', user);
  }

  const loginUser = (formData: FormData) => {
    const user: Pick<IUser, 'username' | 'password'> = {
      username: formData.get('username') as string,
      password: formData.get('password') as string
    }
    return postMethod('token', user);
  }
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([])
    setIsSubmitting(true)
    const data = new FormData(event.currentTarget);

    const fn = { "/login": loginUser,  "/register": registerUser };
    const resData = await fn[currentPath](data)
    if(typeof resData !== 'boolean'){
      const errorResponse = resData as String[];
      setErrors(errorResponse)
    }else if(resData) {
      setIsSuccess(resData)
      const isLogin = currentPath === '/login'
      const toPage = isLogin ? "/posts" : "/login"
      router.push(toPage)
    }
    setIsSubmitting(false)
  };

  return (
      <Container component="main" maxWidth="xs">
        <Snackbar open={isSuccess} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Operation successfull, redirecting to next page
          </Alert>
        </Snackbar>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {authPagesTitle[currentPath]}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {
              !!errors.length && (
                <Alert severity="error" sx={{mb: 4}}>
                  <AlertTitle>Form Validation error</AlertTitle>
                  {
                    errors.map(err=><p><strong>{err}</strong></p>)
                  }
                </Alert>
              )
            }
          
            {children}
            <Button
              type="submit"
              disabled={isSubmitting}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {authPagesTitle[currentPath]}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RedirectLink currentPage={currentPath} />
              </Grid>
            </Grid>
          </Box>
        </Box>
    </Container>
  )
}