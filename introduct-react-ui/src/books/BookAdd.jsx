import React from 'react'
import {useInput, useTitle} from "./Hooks";
import {useHistory} from 'react-router-dom'

function BookAdd() {
  const [title, setTitle] = useInput('');
  const [price, setPrice] = useInput(0);

  useTitle('Add Book');
  const history = useHistory();

  const addBook = e => {
    e.preventDefault();

    const data = {
      method: 'POST',
      body: JSON.stringify({title, price}),
      headers: {
        'content-type': 'application/json'
      }
    };

    fetch('http://localhost:8080/books', data)
      .then(response => history.push('/list'))
      .catch(error => console.log(error));
  };

  return (
    <form>
      <input className={'form-control'} type={'text'} placeholder={'输入标题'} value={title} onChange={setTitle}/>
      <input className={'form-control'} type={'number'} placeholder={'输入价格'} value={price} onChange={setPrice}/>
      <button className={'btn btn-primary'} onClick={event => addBook(event)}>添加</button>
    </form>
  )
}

export default BookAdd;
