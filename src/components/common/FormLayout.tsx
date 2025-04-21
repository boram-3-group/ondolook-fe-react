type FormLayoutProps = {
  title: string;
  children: React.ReactNode;
  description?: string;
};

export const FormLayout = ({ title, children, description }: FormLayoutProps) => {
  return (
    <div className="mx-5">
      <div className="text-Display whitespace-pre-line mt-[40px] mb-[16px]">{title}</div>
      <div
        className={`text-Body2 text-grayScale-60 whitespace-pre-line ${
          description ? 'mb-[40px]' : 'mb-[56px]'
        }`}
      >
        {description && description}
      </div>
      <div>{children}</div>
    </div>
  );
};
