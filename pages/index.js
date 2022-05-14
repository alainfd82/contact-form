import {useState} from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {Card, CardContent, Typography} from "@mui/material";
import {EditorState, convertToRaw} from 'draft-js'
import {stateToHTML} from "draft-js-export-html";
import RichTextEditor from "../components/RixhTextEditor";

const initialState = JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()));

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('');
  const [, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Sending')

    let message_content = message
    if (message_content !== '')
      message_content = stateToHTML(message_content.getCurrentContent());

    let data = {
      name,
      email,
      subject,
      message: message_content
    }

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      console.log('Response received')
      if (res.status === 200) {
        console.log('Response succeeded!')
        setSubmitted(true)
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      }
    })
  }

  return (
    <React.Fragment>
      <CssBaseline/>
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardContent>
            <form onSubmit={handleSubmit}
            >
              <Stack spacing={2}>
                <Typography align="center" variant="h5">Contact Us</Typography>

                <TextField
                  id="name"
                  placeholder="Enter your full name"
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                  required
                  type="text"
                />

                <TextField
                  id="email"
                  label="Email"
                  placeholder="Enter email address"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  //error={this.state.emailError}
                  required
                  type="email"
                />

                <TextField
                  id="subject"
                  label="Subject"
                  placeholder="Enter email address"
                  variant="outlined"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  //error={this.state.emailError}
                  required
                />

                <div>
                  <RichTextEditor
                    label={"Start typing your message here... "}
                    initialValue={message}
                    onChange={data => setMessage(data)}
                    placeholder={"Write a message to " + name}
                  />
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon/>}
                  disabled={message === ''}
                  fullWidth={false}
                >
                  Send
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
}

