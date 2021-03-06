import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import getConfig from 'next/config';
import axios from 'axios';
import { CardTitle } from "reactstrap";
import Navbar from "../../components/Navbar.js";
import ReactMarkdown from 'react-markdown';
import LoginModal from "../../components/LoginModal.js";

const BookName = () => {
    const router = useRouter();
    const { id } = router.query; // Destructuring our router object
    
    const [book, changebook] = useState({title: '', content: null});

    const addBook = (temp) => {
      
      const title = temp.title;
      const content = temp.content;
      const cover = temp.url;
      console.log(1);
      changebook({title, content})
    }

    useEffect(() => {
      axios.get(`https://deadtired.herokuapp.com/books/${id}`)
      .then((response) => {
        console.log(response)
        addBook(response.data)

      })
      .catch((error) => {
        console.log(error)
        console.log('fata')
      })
    }, [])

    

    return (
      <>
      <Navbar />
      <LoginModal/>
        <h2>
          {book.title}
        </h2>
        <div>
          <ReactMarkdown source={book.content}/>
          {/* {book.content} */}
        </div>
      </>
    );
  }; 

  export default BookName;