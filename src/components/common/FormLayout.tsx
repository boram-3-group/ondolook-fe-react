type FormLayoutProps = {
  title: string;
  children: React.ReactNode;
  description?: string;
};

export const FormLayout = ({ title, children, description }: FormLayoutProps) => {
  return (
    <div className="mx-5">
      <div className="text-Display whitespace-pre-line mt-[40px] mb-[52px]">{title}</div>
      {description ? <div className="text-Body2 whitespace-pre-line">{description}</div> : ''}
      <div>{children}</div>
    </div>
  );
};
