import * as React from 'react';
import Grid from "@mui/material/Grid"
import Pagination from "@mui/material/Pagination"
import AllPosts from '../_components/AllPosts';

import ArticlePagination from './_components/ArticlePagination';

async function getData(page: number | undefined) {
  const query = page ? `?page=${page}` : ''
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${query}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const { count, results } = await res.json();
 
  return { noOfPages: Math.ceil(count/6), results }
}

export default async function Blog({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = (searchParams?.page && +searchParams.page) as number | undefined
  const { noOfPages, results } = await getData(page)

  return (
    <main>
      <Grid container spacing={4} sx={{my: 2}}>
        <AllPosts posts={results} />
      </Grid>
      
      <ArticlePagination page={page} pageCount={noOfPages} />
    </main>
  )
}