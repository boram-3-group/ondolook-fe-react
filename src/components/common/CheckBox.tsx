import { Button } from './Button';

type CheckBoxProps = {
  checked: boolean;
  onChange: () => void;
  label?: string;
  link?: boolean;
};

export const CheckBox = ({ checked, onChange, label, link }: CheckBoxProps) => {
  return (
    <>
      <div className="flex">
        <input type="checkbox" checked={checked} onChange={onChange}></input>
        <p>{label}</p>
        {link ? (
          <Button intent="link" size="medium" type="submit">
            내용보기
          </Button>
        ) : (
          ''
        )}
      </div>
    </>
  );
};
