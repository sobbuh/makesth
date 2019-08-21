import addToMailchimp from 'gatsby-plugin-mailchimp'
import React from "react"

export default class EmailForm extends React.Component {
    // Since `addToMailchimp` returns a promise, you
    // can handle the response in two different ways:
  
    // Note that you need to send an email & optionally, listFields
    // these values can be pulled from React state, form fields,
    // or wherever.  (Personally, I recommend storing in state).
  
    // 1. via `.then`
    _handleSubmit = e => {
      e.preventDefault();
      addToMailchimp(e) // listFields are optional if you are only capturing the email address.
      .then(data => {
        // I recommend setting data to React state
        // but you can do whatever you want (including ignoring this `then()` altogether)
        console.log(data)
      })
      .catch(() => {
        // unnecessary because Mailchimp only ever
        // returns a 200 status code
        // see below for how to handle errors
      })
    }
  
    render () {
      return (
        <form onSubmit={this._handleSubmit()}>
          <label>
            Your Email Address
            <input type="text" name="email" />
        </label>
         <input type="submit" value="Submit" />
        </form>
      )
    }
  }
  