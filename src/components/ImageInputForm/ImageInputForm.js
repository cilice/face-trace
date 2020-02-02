import React from 'react';
import styles from './ImageInputForm.module.css';

const ImageInputForm = (props) => {
  return (
    <>
      <p>Paste an image link to detect faces in the image.</p>
      <div className={styles.div}>
        <input
          type="text"
          className={styles.input}
          onChange={props.onInputChange}
        />
        <button className={styles.button} onClick={props.onDetectClicked}>
          Detect
        </button>
      </div>
    </>
  );
};

export default ImageInputForm;
