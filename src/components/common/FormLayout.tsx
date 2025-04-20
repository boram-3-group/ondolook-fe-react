type FormLayoutProps = {
  title: string;
  children: React.ReactNode;
  description?: string;
};

export const FormLayout = ({ title, children, description }: FormLayoutProps) => {
  return (
    <div className="mx-5">
      <div>헤더</div>
      <div className="text-Display whitespace-pre-line">{title}</div>
      {description ? <div className="text-Body2 whitespace-pre-line">{description}</div> : ''}
      <div>{children}</div>
    </div>
  );
};
