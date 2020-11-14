import React, { useState, useRef, useEffect } from 'react';
import copy from 'clipboard-copy';
import data from './data';

function App() {
  const [count, setCount] = useState(1);
  const [text, setText] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [copier, setCopy] = useState(null);
  const [error, setError] = useState(null)
  const textarea = useRef();

  useEffect(() => {
    if (copier === '') {
      copyText();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copier]);

  const handleSubmit = async (e) => {
    setCopySuccess(false);
    setCopy(null);
    if (error) {
      setError(null);
    }
    e.preventDefault();
    copyText();
    let amount = parseInt(count);
    if (count <= 0) {
      amount = 1;
    }
    if (count > 8) {
      amount = 8;
    }
    setText(data.slice(0, amount));
  };

  const onChange = (e) => {
    setCopySuccess(false);
    setCount(e.target.value);
    setCopy(null);
    setText([]);
  }

  const copyLorem = () => {
    if (!textarea.current) {
      return setError("You have to Generate a Lorem ispum first")
    }
    copy(copier);
    setCopySuccess(true);
  };


  const copyText = () => {
    let toCopy = '';
    text.forEach(e => toCopy = toCopy +'\n'+e);
    setCopy(toCopy);
  }

  return (
    <section className='section-center'>
      <h3>tired of boring lorem ipsum?</h3>
      <form className='lorem-form' onSubmit={handleSubmit}>
        <label htmlFor='amount'>paragraphs:</label>
        <input
          type='number'
          name='amount'
          id='amount'
          max='8'
          min='1'
          value={count}
          onChange={onChange}
        />
        <button className='btn'>generate</button>
      </form>
      <h4>Up to eight (8) paragraphs</h4>
      <article className='lorem-text'>
        <button onClick={() => { copyLorem() }}>
          Copy to Clipboard
        </button>
        {error && <p className='errorMessage'>{ error }</p>}
        {
            copySuccess &&
            <div style={{"color": "green"}}>
              Success!
            </div>
          }
          {text.map((item, index) => {
            return <p key={index}>{item}</p>;
          })}
        {copier && <textarea ref={textarea} value={copier} readOnly>{ copier }</textarea>}

      </article>
    </section>
  );
}
export default App;
