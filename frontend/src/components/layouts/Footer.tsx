import React from 'react'
import Divider from '@material-ui/core/Divider'

const Footer: React.FC = () => {
  return (
    <>
      <Divider/>
      <div>
        <ul>
          <li>利用規約</li>
          <li>プライバシー</li>
          <li>お問い合わせ</li>
        </ul>
      </div>
    </>
  )
}

export default Footer