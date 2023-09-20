import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  type RichTextEditorRef,
} from "mui-tiptap";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import { Snackbar } from '@mui/material';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function ManagePost({ post, openDialog=false, setOpenDialog}: {post?: IPost, openDialog: boolean, setOpenDialog: (val: boolean) => void}) {
    const router = useRouter()
    const rteRef = useRef<RichTextEditorRef>(null);
    useEffect(() => {
        if(openDialog) setOpen(true)
    }, [openDialog])
    const [open, setOpen] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleClose = () => {
        setOpen(false);
        setOpenDialog(false)
    };


    const persistPostToServer = async (post: Partial<IPost>) => {
        const method = post.id ? 'PATCH' : 'POST';
        if(localStorage.getItem('tokens')) {
            const { access } = JSON.parse(localStorage.getItem('tokens')!)
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${post.id ? post.id + '/' : ''}`, { method, headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access}`
            }, body: JSON.stringify(post) });
            if(res.ok){
                const { id } = await res.json()
                handleClose()
                router.push(`/posts/${id}`)
            } else {
                if(res.status === 401 || res.status === 403){
                    localStorage.removeItem('tokens')
                    localStorage.removeItem('profile')
                    router.push('/login') 
                } else {
                    setIsError(true)
                    setErrorMessage("Something went wrong with your post")
                }
            }
        }
        
    }


    const handleSavePost = () => {
        const formElem = document.querySelector("#form") as HTMLFormElement;
        const formData = new FormData(formElem)
        const title = formData.get("title") as string
        const body = rteRef.current?.editor?.getHTML() as string
        if(!title || !body){
            setIsError(true)
            setErrorMessage("You must have title and body")
        } else {
            persistPostToServer({title, body})
        }
    }
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Snackbar open={isError} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Manage Post
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSavePost}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box
            id="form"
            component="form"
            sx={{ mx: 'auto', width: '80%' }}
            noValidate
            autoComplete="off"
        >
            <TextField id="title" name="title" sx={{width:"100%", my: 6}} label="Title of Post" defaultValue={post?.title} variant="standard" />

            <RichTextEditor
                ref={rteRef}
                extensions={[StarterKit]} // Or any Tiptap extensions you wish!
                content={post?.body} // Initial content for the editor
                // Optionally include `renderControls` for a menu-bar atop the editor:
                renderControls={() => (
                <MenuControlsContainer>
                    <MenuSelectHeading />
                    <MenuDivider />
                    <MenuButtonBold />
                    <MenuButtonItalic />
                    {/* Add more controls of your choosing here */}
                </MenuControlsContainer>
                )}
            />
        </Box>
        
      </Dialog>
    )
}