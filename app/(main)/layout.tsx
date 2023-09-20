"use client";
import Container from "@mui/material/Container"
import Header from "./_components/Header"
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'


const sections = [
    { title: 'Technology', url: '#' },
    { title: 'Design', url: '#' },
    { title: 'Culture', url: '#' },
    { title: 'Business', url: '#' },
    { title: 'Politics', url: '#' },
    { title: 'Opinion', url: '#' },
    { title: 'Science', url: '#' },
    { title: 'Health', url: '#' },
    { title: 'Style', url: '#' },
    { title: 'Travel', url: '#' },
  ];
  
export default function MainLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const router = useRouter()
    useEffect(() => {
      async function fetchAuthProfile() {
        if(localStorage.getItem('tokens') && !localStorage.getItem('profile')) {
          const { access } = JSON.parse(localStorage.getItem('tokens')!)
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/`, {
            headers: {Authorization: `Bearer ${access}`}
          })
          if(res.ok) {
            const profile = await res.json()
            localStorage.setItem('profile', JSON.stringify(profile))
          } else {
            localStorage.removeItem('tokens')
            router.push('/login')
          }
        }
      }
  
      fetchAuthProfile()
    }, [router])
    return (
        <>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="Blog" sections={sections} />
          {children}
        </Container>
        </>
    )
}