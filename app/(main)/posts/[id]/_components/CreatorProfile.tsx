"use client"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import SettingsIcon from '@mui/icons-material/Settings';
import { useEffect, useState } from "react";
import ManagePost from "@/app/(main)/_components/ManagePost";
import React from "react";

export default function CreatorProfile({creator, post}: {creator: IUser, post: IPost}){
    const name = creator.first_name && creator.last_name ? `${creator.first_name} ${creator.last_name}` : creator.username
    const [isPostOwner, setIsPostOwner] = useState<boolean>(false)
    const [isCreatingPost, setIsCreatingPost] = React.useState<boolean>(false)

    useEffect(() => {
        if(localStorage.getItem("profile")) {
            const profile: IUser = JSON.parse(localStorage.getItem("profile")!)
            setIsPostOwner(profile.username === creator.username)
        } else {
            setIsPostOwner(false)
        }
    }, [])
    return (
        <>
            <ManagePost post={post} openDialog={isCreatingPost} setOpenDialog={setIsCreatingPost} />
            <Box sx={{ justifyContent: 'space-between', display: 'flex', mb: 2 }}>
                <Link href={`/users/${creator.username}/posts`}>{name}</Link>
                {isPostOwner && <Button onClick={() => setIsCreatingPost(true)} startIcon={<SettingsIcon />} color="secondary" variant="contained">Manage Post</Button>}
            </Box>
        </>
        
    )
}