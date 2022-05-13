import {useState} from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Home() {

  const [full_name, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Sending')

    let data = {
      full_name,
      email,
      message
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
        setFullName('')
        setEmail('')
        setMessage('')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}
    >
      <TextField
        id="full_name"
        placeholder="Enter your full name"
        label="Full Name"
        variant="outlined"
        value={full_name}
        onChange={(e) => {
          setFullName(e.target.value)
        }}
        required
        type="text"
      />
      <br/>
      <br/>

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
      <br/>
      <br/>

      <TextField
        id="message"
        label="Message"
        placeholder="Enter Message"
        variant="outlined"
        multiline
        minRows={2}
        maxRows={4}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value)
        }}
        required
        type="text"
      />
      <br/>
      <br/>

      <Button type="submit" variant="contained">
        {submitted ? 'To Send' : 'Send'}
      </Button>
    </form>
  )
}

