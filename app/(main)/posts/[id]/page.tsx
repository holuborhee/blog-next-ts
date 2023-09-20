import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import CreatorProfile from "./_components/CreatorProfile";
import ManagePost from "../../_components/ManagePost";
import React from "react";



async function getData(articleId: string) {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${articleId}/`)
    const article = await res.json() as IPost

    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${article.user}/`)
    const user = await res.json() as IUser
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return { user, article }
}

export default async function Page(
    { params }: { 
        params: { id: string}
    }
) {
    const { user, article }: { user: IUser, article: IPost} = await getData(params.id);
    

    return (
        <Grid container spacing={5} sx={{ mt: 3 }}>
            
            <Grid
                item
                xs={12}
                md={10}
                sx={{ mx: "auto" }}
            >
                <Typography variant="h2" gutterBottom>
                    {article.title}
                </Typography>
                <CreatorProfile creator={user} post={article} />
                <Divider />
                <div dangerouslySetInnerHTML={{ __html: article.body }} />
            </Grid>
        </Grid>
    )
}