type CheckBoxProps = {
  checked: boolean;
  onChange: () => void;
  label?: string;
};

export const CheckBox = ({ checked, onChange, label }: CheckBoxProps) => {
  return (
    <>
      <label>
        <input type="checkbox" checked={checked} onChange={onChange}></input>
        {label}
      </label>
    </>
  );
};
