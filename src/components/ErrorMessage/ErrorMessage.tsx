import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className={css.container}>
      <p className={css.text}>{message}</p>
    </div>
  );
};

export default ErrorMessage;