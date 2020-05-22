import React from 'react'

function BookEdit() {
  return (
    <form>
      <input className={'form-control'} type={'text'} placeholder={'输入标题'}/>
      <input className={'form-control'} type={'number'} placeholder={'输入价格'}/>
      <button className={'btn btn-primary'}>添加</button>
    </form>
  )
}

export default BookEdit;
