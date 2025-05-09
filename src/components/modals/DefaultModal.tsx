export const DefaultModal = ({
  title,
  message,
  firstText,
  secondText,
  onFirstClick,
  onSecondClick,
}: {
  title: string;
  message: string;
  firstText: string;
  secondText: string;
  onFirstClick: () => void;
  onSecondClick: () => void;
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{message}</p>
      <button onClick={onFirstClick}>{firstText}</button>
      <button onClick={onSecondClick}>{secondText}</button>
    </div>
  );
};
