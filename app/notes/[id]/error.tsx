'use client';
import css from './Error.module.css';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <div>
      <p>Could not fetch note details.</p>
      <p>{error.message}</p>

      <button className={css.button} onClick={reset}>
        Try again
      </button>
    </div>
  );
};

export default Error;
