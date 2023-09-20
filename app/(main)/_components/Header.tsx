import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useEffect } from 'react';
import ManagePost from './ManagePost';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

export default function Header(props: HeaderProps) {
  const { sections, title } = props;
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false)
  const [isCreatingPost, setIsCreatingPost] = React.useState<boolean>(false)
  const [username, setUsername] = React.useState<string>("")

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('tokens'))
    if(localStorage.getItem('profile')){
      const profile = JSON.parse(localStorage.getItem('profile')!)
      setUsername(profile.username)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('profile');
    localStorage.removeItem('tokens');
    router.push('/login')
  }

  return (
    <React.Fragment>
      <ManagePost openDialog={isCreatingPost} setOpenDialog={setIsCreatingPost} />
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        { isLoggedIn && (
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Link sx={{ display: 'flex' }} href={`/users/${username}/posts`}>
              <PersonOutlineIcon /> <strong>{username}</strong>
            </Link>
            <Button variant='outlined' size='small' color='error' onClick={() => logout()}>Logout <LogoutIcon /></Button>
          </Box>
        
        )}
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        {
          isLoggedIn ? (
            <Button size="small" variant='contained' onClick={() => setIsCreatingPost(true)}>
              Create A Post
            </Button>
          ) : (
            <Button href="/register" variant="outlined" size="small">
              Sign up
            </Button>
          )
        }
        
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href="/posts"
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}
