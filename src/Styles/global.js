import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    *{
        box-sizing: border-box;
    }

    body{
        background: ${({theme}) =>theme.background};
        color: ${({theme}) => theme.textColor};
        margin: 0;
        padding: 0;
        transition: all .25s linear
    }

    .canvas{
        display: grid;
        min-height: 100vh;
        grid-auto-flow: row;
        grid-template-row: auto 1fr auto;
        gap: 0.5rem;
        padding: 2rem;
        width:100vw;
        align-items: center;
        text-align: center;
    }

    .typing-box{
        display: block;
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
        overflow: hidden;
    }
    .words{
        display: flex;
        font-size: 25px;
        flex-wrap: wrap;
        font-weight: 100;
        color: ${({theme}) => theme.typeBoxText};
    }
    .word{
        margin-right: 7px;
    }

    .hidden-input{
        opacity: 0;
    }

    .current{
        border-left: 1px solid;
        animation: blinking 2s infinite;
        animation-timing-function: ease;

        @keyFrames blinking{
            0% {border-left-color: white}
            25% {border-left-color: black}
            50% {border-left-color: white}
            75% {border-left-color: black}
            100% {border-left-color: white}
        }        
    }
    .current-right{
        border-right: 1px solid;
        animation: blinkingRight 2s infinite;
        animation-timing-function: ease;

        @keyFrames blinkingRight{
            0% {border-right-color: white}
            25% {border-right-color: black}
            50% {border-right-color: white}
            75% {border-right-color: black}
            100% {border-right-color: white}
        }        
    }

    .correct{
        color: ${({theme}) => theme.textColor };
    }
    .incorrect{
        color: red;
    }



    .upper-menu{
        display: flex;
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
        font-size: 1.4rem;
        justify-content: space-between;
        padding: 0.5rem;
    }
    .nodes{
        display: flex;
        gap: .5rem
    }
    .time-modes:hover{
        color: green;
        cursor: pointer;
    }


    .footer{
        width: 1000px;
        display: flex;
        justify-content: space-between;
        margin-left: auto;
        margin-right: auto;
    }



    .stats-box{
        display: flex;
        width: 1000px;
        height: auto;
        margin-left: auto;
        margin-right: auto;
    }

    .left-stats{
        width: 30%;
        padding: 30px;
    }
    .right-stats{
        width: 70%;
    }
    .title{
        font-size: 20px;
        color: ${({theme}) => theme.typeBoxText };
    }
    .subtilte{
        font-size: 30px;
    }



    // ########################
    .header{
        width: 1000px;
        display: flex;
        justify-content: space-between;
        margin-left: auto;
        margin-right: auto;
    }


    .user-profile{
        width: 1000px;
        margin: auto;
        display: flex;
        height: 15rem;
        background: ${({theme}) =>theme.typeBoxText};
        border-radius: 20px;
        padding: 1rem;
        justify-content: center;
        align-text: center
    }
    .user{
        width: 50%;
        display: flex;
        margin-top: 30px;
        margin-bottom: 30px;
        font-size: 1.5rem;
        padding: 1rem;
        border-right: 1px solid
    }

    .info{
        width: 60%;
        padding: 1rem;
        margin-top: 1rem;
    }

    .picture{
        width: 40%;
    }
    .total-tests{
        width: 50%;
        font-size: 3rem;
        display: flex;
        align-items: center;
        justify-content: center
    }

    .table , .graph-user-page{
        margin: auto;
        width: 1000px;
    }

    .center-of-screen{
        display: flex;
        min-height: 100vh;
        align-items: center;
        justify-content: center
    }


    // footer styling 
    .link{
        display: flex;
        gap: 1rem;
    }
    .link a{
        color: ${({theme}) => theme.typeBoxText };
    }
    .logo img{
        color: ${({theme}) => theme.typeBoxText };
    }
`
export default GlobalStyle;