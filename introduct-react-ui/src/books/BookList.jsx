import React, {useState, useEffect} from "react";
import './books.css'
import {Link} from 'react-router-dom'
import {useTitle} from "./Hooks";

function BookList() {
  const [books, setBooks] = useState([]);
  const [ids, setIds] = useState([])

  useTitle('Book List');

  useEffect(() => {
    fetch('http://localhost:8080/books')
      .then(response => response.json())
      .then(json => setBooks(json))
  }, []);

  const emptyTable = () => {
    return (
      <tr>
        <td colSpan={3} align={'center'} style={{lineHeight: '40px'}}>No Data</td>
      </tr>);
  }

  const fillTable = () => {
    return books.map(
      ({id, title}) => (
        <tr key={id} style={{lineHeight: '36px'}}>
          <td align={"center"} valign={'middle'}><input type={'checkbox'}/></td>
          <td align={"center"} valign={'center'}>
            <Link to={`/details/${id}`}
                  style={{fontSize: '1.2rem', textDecoration: 'none'}}>{title}</Link>
          </td>
          <td align={"center"} valign={'middle'}>
            <Link to={`/edit/${id}`} className={'btn btn-info'} style={{textDecoration: 'none'}}>编辑</Link>
            <button className={'btn btn-danger'} style={{marginLeft: '5px'}}>删除</button>
          </td>
        </tr>)
    )
  }

  const batchDelete = () => {

  }

  return (
    <>
      <table style={{borderCollapse: 'collapse'}}>
        <thead style={{lineHeight: '36px', backgroundColor: '#e9ecef'}}>
        <tr>
          <th style={{width: '2%'}}><input type={'checkbox'}/></th>
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
        <button className={'btn btn-danger'} style={{marginLeft: '5px'}} onClick={batchDelete}>删除</button>
      </div>
    </>)
}

export default BookList;
