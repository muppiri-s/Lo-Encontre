import React from "react"
import { useState } from "react"

function Notification() {
  const [status, setStatus] = useState(null)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  const FORM_URL = `http://localhost:3001/logo`

  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = new FormData(event.target)

    try {
      const response = await fetch(FORM_URL, {
        method: "post",
        body: data,
        headers: {
          accept: "application/json",
        },
      })

      setEmail("")
      const json = await response.json()

      if (json.status === "success") {
        setStatus("SUCCESS")
        return
      }
    } catch (err) {
      setStatus("ERROR")
      console.log(err)
    }
  }

  const handleEmailChange = (event) => {
    const { value } = event.target
    setEmail(value)
  }

  const handleNameChange = (event) => {
    const { value } = event.target
    setName(value)
  }

  return (
    <div className="box">
      {status === "SUCCESS" && (
        <p>
          Thank you for subscribing!
        </p>
      )}
      {status === "ERROR" && (
        <p>
          Oops, something went wrong...
          Please,{" "}
          <button onClick={() => setStatus(null)}>try again.</button>
        </p>
      )}
      {status === null && (
        <form onSubmit={handleSubmit} className="sub_form">
          <h2>Subscribe to our news letter</h2>
          <input
            aria-label="Your first name"
            name="fields[first_name]"
            placeholder="First name"
            type="text"
            onChange={handleNameChange}
            value={name}
          />
          <input
            aria-label="Your email address"
            name="email_address"
            placeholder="Email address"
            required
            type="email"
            onChange={handleEmailChange}
            value={email}
          />
          <button className="btn">Subscribe</button>
        </form>
      )}
    </div>
  );
};

export default Notification;