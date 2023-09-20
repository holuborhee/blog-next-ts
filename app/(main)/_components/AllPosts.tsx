import Box from "@mui/material/Box";
import PostCard from "./PostCard";
import Grid from "@mui/material/Grid";

export default function AllPosts({ posts }: { posts: ReadonlyArray<IPost>}) {
    return posts.map((post) => (<PostCard key={post.id} post={post} />))
}