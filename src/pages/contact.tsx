import { HeadFC } from "gatsby";
import React from "react";
import styled from "styled-components";


const FormStyles = styled.form`
margin: 0 auto 2rem auto;
width: 70%;
font-size: 2rem;
h2 {
    font-size: 5rem;
    color: #b3184d;
    text-align: center;
}

fieldset {
    display: grid;
    row-gap: 1rem;
}

textarea {
    resize: none;
}

input,textarea {
    font-family: FrenchFont;
}
label {
    font-size:3rem;
    @media(max-width:700px){
        text-align: center;
    }
}
button {
    text-transform: uppercase;
    font-weight: bold;
    color: #b3184d;
    border: #b3184d solid 1px;
    background-color:white;
    cursor: pointer;
    &:hover{
    color: #551A8B;
    border-color: #551A8B;
    }

}
`
const Error = styled.span`
    font-family: FrenchFont;
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
    color: red;
`
const Message = styled.span`
    font-family: FrenchFont;
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
    color: green;
`

function Contact() {
    const [formState, setFormState] = React.useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [error, setError] = React.useState('');

    const changeState = (event: React.ChangeEvent) => {
        setFormState({ ...formState, [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value });
    }

    const sendForm = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        const res = await fetch(
            `https://pastry-s.netlify.app/.netlify/functions/sendForm`,
            
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState),
            }
        )

        const text = JSON.parse(await res.text());
        if (res.status >= 400 && res.status < 600) {
            setLoading(false);
            setError(text.message);

        } else {
            setLoading(false);
            setMessage(text.message);
            setFormState({
                name: '',
                email: '',
                phone: '',
                message: ''
            })
            setTimeout(()=>{
                setMessage('');
            },3000)
        }
    }



    return (
        <FormStyles onSubmit={sendForm}>
            <h2>Send Us a message</h2>
            {error &&
                <Error>{error}</Error>
            }
            {message &&
                <Message>{message}</Message>
            }
            <fieldset disabled={loading}>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" required onChange={changeState} value={formState.name} />
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" required onChange={changeState} value={formState.email}/>
                <label htmlFor="phone">Phone: </label>
                <input type="tel" name="phone" id="phone" required onChange={changeState} value={formState.phone} />
                <label htmlFor="message">Your message: </label>
                <textarea name="message" id="message" cols={30} rows={10} required onChange={changeState} value={formState.message}></textarea>
                <button type="submit">{loading ? 'Sending...' : 'Send'}</button>
            </fieldset>
        </FormStyles>
    )
}


export default Contact;
export const Head: HeadFC = () => <title>Contact page</title>
