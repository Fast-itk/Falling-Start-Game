import {css, Global, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import {IPosition} from '../interfaces/interfaces'


export const globalStyles = (
    <Global
        styles={css`
            body {
                padding: 0;
                margin: 0;
                background: url('/bg.jpg') center no-repeat;
                background-size: cover;
                min-height: 100%;
                font-family: Helvetica, Arial, sans-serif;
                font-size: 24px;
            }
            html {
                min-height: 100%;
                padding: 0;
                margin: 0;
                overflow: hidden;
            }
        `}
    />
)

const btnStyle = css`
    color: #fff;
    padding: 12px 30px;
    border: none;
    border-radius: 5px;
    font-size: 22px;
    cursor: pointer;
    transition: .5s;
    outline: none;
`

export const Layout = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
`

export const StartButton = styled.button`
    ${btnStyle};
    background-color: rgba(71, 194, 111, .8);
    &:hover {
        background-color: rgba(71, 194, 111, 1);
    }
`

export const AgainButton = styled.button`
    ${btnStyle};
    background-color: rgba(0, 206, 209, .8);
    &:hover {
        background-color: rgba(0, 206, 209, 1);
    }
`


export const Playground = styled.div`
    width: 950px;
    position: absolute;
    left:50%;
    margin-left: -475px;
    display: flex;
`

export const Star = styled.div<IPosition>`
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('/star.png') center no-repeat;
    background-size: contain;
    font-size: 50px;
    position: absolute;
    color: #000;
    cursor: pointer;
    bottom: ${(props => props.bottom)}px;
    left: ${(props => props.left)}px;
`

export const Score = styled.h2`
    position: absolute;
    top: 50px;
    left: 30px;
`

export const Progress = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: tomato;
    border-radius: 5px;
    z-index: 10;
    opacity: .8;
`





