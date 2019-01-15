import React from 'react'
import styled from 'styled-components'
import { Link } from './Framework'

const FooterStyled = styled.footer`
  position: fixed;
  bottom: 0;
  text-align: center;
  width: 100%;
  padding: 20px 0;
  font-size: 14px;
  color: rgba(200, 200, 255, 0.7);
  pointer-events: none;
`

const VersionInfo = styled.div`
  display: inline-block;
  border-radius: 30px;
  padding: 5px 10px;
  background: #333659;
  pointer-events: auto;
`

function Footer() {
  return (
    <FooterStyled>
      <VersionInfo>
        v2.0 –{' '}
        <Link href="https://github.com/atomiks/reddit-user-analyser">
          View on GitHub
        </Link>
      </VersionInfo>
    </FooterStyled>
  )
}

export default Footer
