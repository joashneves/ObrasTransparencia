import React from 'react';
import styles from './LoadingBar.module.css'; 

const LoadingBar = () => {
  return (
    <div className={styles.loadingbarcontainer}>
      <div className={styles.loadingbar}></div>
    </div>
  );
};

export default LoadingBar;