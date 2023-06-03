import React, { useState, useRef, useEffect, useMemo, createRef } from 'react'
import UpperMenu from './UpperMenu';
import { useTestMode } from '../context/TestModeContext';
import Stats from './Stats';

var randomWords = require('random-words');






const TypingBox = () => {

    const inputRef = useRef(null);
    const { testTime } = useTestMode();

    const [countDown, setCountDown] = useState(testTime);
    const [intervalId, setIntervalId] = useState(null);
    const [testStart, setTestStart] = useState(false);
    const [testEnd, setTestEnd] = useState(false);
    const [currectChars, setCurrectCurrs] = useState(0);
    const [incorrectChars, setIncorrectChars] = useState(0);
    const [missedChars, setMissedChars] = useState(0);
    const [extraChars, setExtraChar] = useState(0);
    const [correctWords, sertCorrectWords] = useState(0);

    const [wordArray, setWordArray] = useState(() => {
        return randomWords(50);
    });

    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [graphData, setGraphData] = useState([])



    const wordSpanRef = useMemo(() => {
        return Array(wordArray.length).fill(0).map(i => createRef(null));
    }, [wordArray])


    const startTimer = () => {
        const intervalId = setInterval(timer, 1000);
        setIntervalId(intervalId);

        function timer() {

            // calculate words per minutes 
            setCountDown((latestCountDown) => {
                setCurrectCurrs((correctChars) => {
                    setGraphData((graphData) => {
                        return [...graphData, [
                            testTime - latestCountDown + 1,
                            (correctChars / 5) / ((testTime - latestCountDown + 1) / 60)
                        ]]
                    })
                    return correctChars
                })

                if (latestCountDown === 1) {
                    setTestEnd(true);
                    clearInterval(intervalId); // clearInterval is a inbuild method 
                    return 0;
                }
                return latestCountDown - 1;
            });
        }
    }


    const resetTest = () => {
        clearInterval(intervalId);
        setCountDown(testTime)
        setCurrCharIndex(0)
        setCurrCharIndex(0)
        setTestStart(false)
        setTestEnd(false);
        setWordArray(randomWords(50));
        resetWordSpanRefClassName();
        focousInput();
    }

    const resetWordSpanRefClassName = () => {
        wordSpanRef.map(i => (
            Array.from(i.current.childNodes).map(j => (
                j.className = ''
            ))
        ))
        wordSpanRef[0].current.childNodes[0].className = 'current';
    }

    // handle user input
    const handleUserInput = (e) => {


        // for start timer 
        if (!testStart) {
            startTimer();
            setTestStart(true);
        }
        const allCurrChars = wordSpanRef[currWordIndex].current?.childNodes;

        if (e.keyCode === 32) {
            // logic for space 
            let correctCharInWords = wordSpanRef[currCharIndex].current.querySelectorAll('.correct');

            if (correctCharInWords.length === allCurrChars.length) {
                sertCorrectWords(correctWords + 1);
            }
            if (allCurrChars.length <= currCharIndex) {
                // remove cursure from last place in a word 
                allCurrChars[currCharIndex - 1].classList.remove('current-right')
            } else {
                // remove cursor from last place in a word 
                setMissedChars(missedChars + (allCurrChars.length - currCharIndex));
                allCurrChars[currCharIndex].classList.remove('current')
            }


            wordSpanRef[currWordIndex + 1].current.childNodes[0].className = 'current'
            setCurrWordIndex(currWordIndex + 1);
            setCurrCharIndex(0)

            return;
        }


        if (e.keyCode === 8) {
            // logic for backSpace 
            if (currCharIndex !== 0) {

                if (allCurrChars.length === currCharIndex) {

                    if (allCurrChars[currCharIndex - 1].className.includes('extra')) {
                        allCurrChars[currCharIndex - 1].remove();
                        allCurrChars[currCharIndex - 2].className += ' current-right';
                    } else {
                        allCurrChars[currCharIndex - 1].className = 'current'
                    }

                    setCurrCharIndex(currCharIndex - 1);
                    return;
                }

                allCurrChars[currCharIndex].className = '';
                allCurrChars[currCharIndex - 1].className = 'current';
                setCurrCharIndex(currCharIndex - 1);
            }
            return;
        }


        if (!testEnd && currCharIndex === allCurrChars?.length) {

            let newSpan = document.createElement('span');
            newSpan.innerText = e.key;
            newSpan.className = 'incorrect extra current-right';
            allCurrChars[currCharIndex - 1].classList.remove('current-right')
            wordSpanRef[currWordIndex].current.append(newSpan);
            setCurrCharIndex(currCharIndex + 1);
            setExtraChar(extraChars + 1)
            return;
        }


        if (!testEnd && e.key === allCurrChars[currCharIndex].innerText) {
            allCurrChars[currCharIndex].className = 'correct'
            setCurrectCurrs(currectChars + 1);
        } else if (!testEnd) {
            allCurrChars[currCharIndex].className = 'incorrect';
            setIncorrectChars(incorrectChars + 1);
        }

        if (!testEnd && currCharIndex + 1 === allCurrChars.length) {
            allCurrChars[currCharIndex].className += ' current-right'
        } else if (!testEnd) {
            allCurrChars[currCharIndex + 1].className = 'current'
        }

        setCurrCharIndex(currCharIndex + 1);
        // }
        // return;
    }

    const calculateWPM = () => {
        return Math.round((currectChars / 5) / (testTime / 60));
    }
    const callcualteAcc = () => {
        return Math.round((correctWords / currWordIndex) * 100);
    }

    const focousInput = () => {
        inputRef.current.focus();
    }


    useEffect(() => {
        resetTest();
        setCountDown(testTime)
    }, [testTime])

    useEffect(() => {
        focousInput();
        // startTimer();
        wordSpanRef[0].current.childNodes[0].className = 'current';
    }, [])

    return (
        <div>
            <UpperMenu countDown={countDown} />
            {(testEnd) ? (<Stats
                wpm={calculateWPM()}
                accuracy={callcualteAcc()}
                correctChars={currectChars}
                incorrectChars={incorrectChars}
                extraChars={extraChars}
                graphData = {graphData}
            />
            ) : (<div className="typing-box" onClick={focousInput}>
                <div className="words">
                    {
                        wordArray.map((word, index) => (
                            <span className='word' ref={wordSpanRef[index]}>
                                {word.split('').map(char => (
                                    <span>{char}</span>
                                ))}
                            </span>
                        ))
                    }
                </div>
            </div>)}
            <input
                type="text"
                className='hidden-input'
                ref={inputRef}
                onKeyDown={handleUserInput}
            />
        </div>
    )
}

export default TypingBox