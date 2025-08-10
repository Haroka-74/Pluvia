import axios from 'axios';
import { useState, useEffect } from 'react';

const Model = ({ setModelOpen, city, temperature }) => {

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [aiResponse, setAIResponse] = useState('');

    useEffect(() => {
        setShow(true);
    }, []);

    useEffect(() => {
        setShow(true);

        const getAIRecommendation = async () => {
            setLoading(true);

            try {
                const response = await axios.post(`https://openrouter.ai/api/v1/chat/completions`,
                    {
                    model: 'gpt-4o-mini',
                    messages:
                    [
                        {
                            role: 'system',
                            content: 'You are a fashion assistant who provides outfit recommendations.'
                        },
                        {
                            role: 'user',
                            content: `Give me a short, clear outfit recommendation for someone in ${city} where the temperature is ${temperature}°C. Use only plain text with line breaks (\\n) for new lines. Do NOT use any markdown like asterisks, bold, or bullet points. Keep it simple.`
                        }
                    ],
                    max_tokens: 150,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                        }
                    }
                );

                if(response.data.choices && response.data.choices.length > 0) {
                    setAIResponse(response.data.choices[0].message.content.trim());
                } else {
                    setAIResponse('Sorry, I could not get a recommendation at this time.');
                }
            } catch(error) {
                setAIResponse('Error fetching recommendation. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        getAIRecommendation();

    }, [city, temperature]);

    const handleClose = () => {
        setShow(false);

        setTimeout(() => {
            setModelOpen(false);
        }, 300);
    };

    return (
        <div className = {`model-overlay ${show ? 'show' : ''}`}>
            <div className = {`model-window ${show ? 'show' : ''}`}>
                <button className = 'close-btn' onClick = {handleClose}> X </button>
                <h2> {city}, {temperature}°C </h2>
                {loading ? ( <p> Loading... </p> ) : ( <p> {aiResponse} </p> )}
            </div>
        </div>
    );
};

export default Model;