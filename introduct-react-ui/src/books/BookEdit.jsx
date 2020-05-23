import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'

function BookEdit() {
  const {id} = useParams()
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)

  useEffect(() => {
    fetch(`http://localhost:8080/books/${id}`)
      .then(response => response.json())
      .then(({title, price}) => {
        setTitle(title);
        setPrice(price)
      })
      .catch(error => alert(error))
  }, [id])

  const handleEdit = () => {
    fetch(`http://localhost:8080/books/${id}`, {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({id, title, price})
    }).then(history.push('/list'))
      .catch(error => alert(error))
  }

  return (
    <form>
      <input className={'form-control'}
             type={'text'} value={title}
             onChange={event => setTitle(event.target.value)}/>
      <input className={'form-control'}
             type={'number'} value={price}
             onChange={event => setPrice(event.target.value)}/>
      <button className={'btn btn-primary'}
              onClick={() => handleEdit()}>更新</button>
    </form>
  )
}

export default BookEdit;
