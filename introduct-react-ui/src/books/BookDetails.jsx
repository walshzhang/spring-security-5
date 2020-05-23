import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'

function BookDetails() {
  const [book, setBook] = useState({});
  const {id} = useParams()
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8080/api/books/${id}`)
      .then(response => response.json())
      .then(json => setBook(json))
  });

  return (
    <>
      <p>标题：{book.title}</p>
      <p>价格：{book.price}</p>

      <p>
        <button className={'btn btn-info'} onClick={() => history.push('/list')} >返回列表</button>
      </p>
    </>
  )
}

export default BookDetails;
