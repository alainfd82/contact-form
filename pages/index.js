import {useState} from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import {Card, CardContent, Typography} from "@mui/material";
import dynamic from "next/dynamic";
import {createEmptyValue} from "react-rte/lib/RichTextEditor";

const Editor = dynamic(() => import("react-rte"), {
  ssr: false,
});

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState(createEmptyValue());
  const [, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Sending')

    let data = {
      name,
      email,
      subject,
      message: message.toString()
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
        setMessage(createEmptyValue())
      }
    })
  }

  return (
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
                size="small"
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
                size="small"
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
                size="small"
              />

              <Editor
                value={message}
                onChange={setMessage}
                placeholder="Place your message here..."
              />

              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon/>}
                //disabled={message === ''}
                fullWidth={false}
              >
                Send
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

