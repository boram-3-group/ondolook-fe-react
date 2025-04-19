type FormLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export const FormLayout = ({ title, children }: FormLayoutProps) => {
  return (
    <div>
      <div>헤더</div>
      <div>{title}</div>
      <div>{children}</div>
    </div>
  );
};
