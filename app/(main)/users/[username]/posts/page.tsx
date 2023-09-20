import AllPosts from "@/app/(main)/_components/AllPosts";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

async function getData(username: string) {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}/articles/`)
    const articles: ReadonlyArray<IPost> = (await res.json()).data;

    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${articles[0].user}/`)
    const user: IUser = await res.json();
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return { articles, user }
}

export default async function Page({ params }: { 
    params: { username: string}
}) {
    const { articles, user } = await getData(params.username)
    const name = user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username
    return (
        <Grid
            item
            xs={12}>
            <Typography variant="h3" gutterBottom>
                Posts by {name}
            </Typography>
            <Divider />
            <Grid container spacing={4} sx={{ my: 2}}>
                <AllPosts posts={articles} />
            </Grid>
        </Grid>
    )

}