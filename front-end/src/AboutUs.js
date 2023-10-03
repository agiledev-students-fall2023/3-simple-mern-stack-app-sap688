import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'
import loadingIcon from './loading.gif'
// import MessageForm from './MessageForm'
// import AboutUs from './AboutUs'


const AboutUs = () => {
  const [about, setAbout] = useState([])
  const [image, setImage] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
//   const [feedback, setFeedback] = useState('')

  /**
   * A nested function that fetches messages from the back-end server.
   */
  const fetchAbout = () => {
    // setAbout([])
    // setLoaded(false)
    // console.log("fetching: ", about.data);

    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
      .then(response => {
        // axios bundles up all response data in response.data property
        const about = response.data.content
        
        setAbout(about)
        setImage(response.data.image)
       // setAboutInfo(about)
        console.log("ABOUT WAS FETCHED: ", about.data);
        console.log("ABOUT WAS FETCHED: ", about);


      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
  }

//   /**
//    * A nested function used to add a new message to the list of messages
//    * @param {*} message The new message to add to the list
//    */
//   const addMessageToList = message => {
//     const newMessages = [...messages, message] // make an array with all the old values plus the new one
//     setMessages(newMessages) // save the new array
//   }

  // set up loading data from server when the component first loads
  useEffect(() => {
    // fetch messages this once
    
    fetchAbout()
  }, []); // putting a blank array as second argument will cause this function to run only once when component first loads
  // console.log("ABOUT WAS GOTEEN ACIOUX: ");

  return (
    <>
      {/* <h1>About Us!!!!</h1>
      <p>hugitrhgusd</p> */}

      {/* {feedback && <p className="MessageForm-feedback">{feedback}</p>} */}
      {error && <p className="AboutUs-error">{error}</p>}
      {/* {loaded && <p className="AboutUs-content">{about}</p>} */}
      {loaded && <>
        <p className = "AboutUs--content">{about}</p>
        <img src = {image} alt = "photo of SAP" />
        </>
      }
      
{/* 
      {error && <p className="AboutUs-error">{error}</p>}
      {!loaded && <img src={loadingIcon} alt="loading" />}
      {about.map(about => (
        <AboutUs key={about._id} about={about} />
      ))} */}
    </>
  );
}

// make this component available to be imported into a

export default AboutUs;
