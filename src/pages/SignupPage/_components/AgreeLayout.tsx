type ArticlesProps = {
  articleTitle: string;
  articleText: string;
};

type AgreeLayoutProps = {
  title: string;
  subTitle: string;
  children?: React.ReactNode;
  description?: string;
  Articles: ArticlesProps[];
};

export const AgreeLayout = ({
  title,
  subTitle,
  description,
  Articles,
  children,
}: AgreeLayoutProps) => {
  return (
    <div className="mx-5 max-h-[95vh] overflow-y-auto mt-[28px]">
      <p className="text-Display">{title}</p>

      <div className="w-full my-[12px] ">
        <hr className="border-t border-grayScale-30" />
      </div>

      <p className="text-Title2 mt-[12px] text-grayScale-80 mb-1">{subTitle}</p>

      {description && <p className="text-Body1 text-grayScale-70 mb-[28px]">{description}</p>}

      <div className="flex flex-col gap-[28px]">
        {Articles.map((article, idx) => (
          <div key={idx} className="flex flex-col gap-[6px]">
            <div className="text-Title1 text-grayScale-80">{article.articleTitle}</div>
            <div className="text-Body1 text-grayScale-70 whitespace-pre-line">
              {article.articleText}
            </div>
          </div>
        ))}
      </div>

      {children}
    </div>
  );
};
