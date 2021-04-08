import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import lodash from 'lodash'

import './firebase'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;

  header {
    background-color: #70bf70;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 20px;
    box-shadow: 0px -3px 9px 3px #888888;
    min-height: 0;
    z-index: 1;
  }

  .list {
    background-color: #e5e5e5;
    padding: 15px;
    flex: 1;
    overflow-y: auto;

    .item {
      height: 70px;
      background-color: white;
      margin-bottom: 15px;
      border-radius: 5px;
      user-select: none;
      display: flex;
      align-items: center;
      padding: 0 12px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      img {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        margin-right: 20px;
      }
      
      .info-box {
        .name {
          margin: 0;
          margin-bottom: 5px;
          font-weight: bold;
        }
        
        .description {
          margin: 0;
          font-style: italic;
        }
      }
    }
  }
`

const ITEMS = lodash.range(20)

const App = () => (
  <StyledDiv>
    <header>
      DEMO PWA
    </header>
    <div className="list">
      {ITEMS.map((item, index) => (
        <div key={index} className="item">
          <img src="https://picsum.photos/300" alt="" />
          <div className="info-box">
            <p className="name">Name</p>
            <p className="description">Description</p>
          </div>
        </div>
      ))}
    </div>
  </StyledDiv>
)

ReactDOM.render(<App />, document.getElementById('application'))
