import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import useRandomItem from './hook';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: lightgray;
`;

const StyledHeader = styled.h1`
    color: purple;
    margin-bottom: 20px;
`;
const StyledInput = styled.input`
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    margin-bottom: 20px;
    &:focus {
        outline: none;
        border: 2px solid #f4c542;
    }
`;
const StyledText = styled.p`
    text-align: center;
    text-transform: uppercase;
    color: black;
    margin-bottom: 10px;
    span {
        display: block;
        font-weight: bold;
        border: 1px solid purple;
        padding: 4px;
        text-align: center;
        background-color: white;
        margin: 4px;
    }
`;

const SpeedTest = () => {
    const [word, regenerateWord] = useRandomItem(['devmentor.pl', 'abc', 'JavaScript']);
    const [inputValue, setInputValue] = useState('');
    const [time, setTime] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const timeRef = useRef(null);

    const startTimer = () => {
        if (timeRef.current === null) {
            timeRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
    };

    const stopTimer = () => {
        if (timeRef.current !== null) {
            clearInterval(timeRef.current);
            timeRef.current = null;
        }
    };
    useEffect(() => {
        regenerateWord();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (word && inputValue !== word.slice(0, inputValue.length)) {
            stopTimer();
            setInputValue('');
            setTime(0);
            startTimer();
        } else if (word && inputValue === word) {
            setCharCount((prevCount) => prevCount + inputValue.length);
            setInputValue('');
            regenerateWord();
        }
    }, [inputValue, word, regenerateWord]);

    const handleFocus = () => {
        startTimer();
    };
    const handleBlur = () => {
        stopTimer();
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <StyledContainer>
            <StyledHeader>{word}</StyledHeader>
            <StyledInput
                value={inputValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <StyledText>
                Time in sec:<span>{time}</span>
            </StyledText>
            <StyledText>
                You typed <span>{charCount} </span> characters correctly
            </StyledText>
        </StyledContainer>
    );
};

export default SpeedTest;