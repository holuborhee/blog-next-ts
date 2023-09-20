"use client";
import Pagination from "@mui/material/Pagination";
import { useRouter } from 'next/navigation';

export default async function ArticlePagination({pageCount, page}: {pageCount: number, page?: number}){
    const router = useRouter()
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const query = value ? `?page=${value}` : ''
        router.push('/posts'+query)
      };
    return (
        <Pagination page={page} count={pageCount} sx={{mt: 4, mx: "auto"}} onChange={handleChange} />
    )
}