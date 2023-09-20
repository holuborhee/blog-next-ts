import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from 'next/link';

interface PostCardProps {
  post: IPost
}

export default function PostCard(props: PostCardProps) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component={Link} href={`/posts/${post.id}`}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title.substring(0,30)}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.created_at}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.body.substring(0, 90)}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={'https://source.unsplash.com/random?wallpapers'}
            alt="Post image"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
