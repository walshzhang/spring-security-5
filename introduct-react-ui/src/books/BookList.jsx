import React, {useState, useEffect} from "react";
import './books.css'
import {Link} from 'react-router-dom'
import {useTitle} from "./Hooks";

function BookList() {
  const [books, setBooks] = useState([]);
  const [selected, setSelected] = useState([])

  useTitle('Book List');

  useEffect(() => {
    fetch('http://localhost:8080/api/books')
      .then(response => response.json())
      .then(json => setBooks(json))
  }, []);

  const emptyTable = () => {
    return (
      <tr>
        <td colSpan={3} align={'center'} style={{lineHeight: '40px'}}>No Data</td>
      </tr>);
  }

  const handleSelect = (event, id) => {
    setSelected(
      event.target.checked
        ? [id, ...selected]
        : selected.filter(item => item !== id))
  }

  const handleAllSelect = event => {
    setSelected(
      event.target.checked
        ? books.map(item => item.id)
        : [])
  }

  const handleDelete = id => {
    fetch(`http://localhost:8080/api/books/${id}`, {
      method: 'DELETE'
    }).then(response => setBooks(books.filter(book => book.id !== id)))
      .catch(error => alert(error));
  }

  const fillTable = () => {
    return books.map(
      ({id, title}) => (
        <tr key={id} style={{lineHeight: '36px'}}>
          <td align={"center"} valign={'middle'}>
            <input type={'checkbox'} value={id}
                   checked={selected.some(item => item === id)}
                   onChange={event => handleSelect(event, id)}/>
          </td>
          <td align={"center"} valign={'center'}>
            <Link to={`/details/${id}`}
                  style={{fontSize: '1.2rem', textDecoration: 'none'}}>{title}</Link>
          </td>
          <td align={"center"} valign={'middle'}>
            <Link to={`/edit/${id}`} className={'btn btn-info'} style={{textDecoration: 'none'}}>编辑</Link>
            <button className={'btn btn-danger'} style={{marginLeft: '5px'}} onClick={() => handleDelete(id)}>删除
            </button>
          </td>
        </tr>)
    )
  }

  const batchDelete = () => {
    fetch('http://localhost:8080/api/books', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(selected)
    }).then(response => {
      setBooks(books.filter(book => selected.every(select => book.id !== select)))
      setSelected([])
    }).catch(error => alert(error))
  }

  return (
    <>
      <table style={{borderCollapse: 'collapse'}}>
        <thead style={{lineHeight: '36px', backgroundColor: '#e9ecef'}}>
        <tr>
          <th style={{width: '2%'}}>
            <input type={'checkbox'} checked={selected.length && selected.length === books.length}
                   onChange={event => handleAllSelect(event)}/>
          </th>
          <th style={{width: '20%'}}>标题</th>
          <th style={{width: '10%'}}>操作</th>
        </tr>
        </thead>
        <tbody>
        {books && books.length ? fillTable() : emptyTable()}
        </tbody>
      </table>
      <div style={{marginTop: '15px'}}>
        <Link to={'/add'} className={'btn btn-primary'} style={{textDecoration: 'none'}}>添加</Link>
        <button className={'btn btn-danger'} style={{marginLeft: '5px'}} onClick={() => batchDelete()}>删除</button>
      </div>
    </>)
}

export default BookList;
