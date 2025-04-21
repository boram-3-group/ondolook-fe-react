import ReactDOM from 'react-dom';

type BottomSheetProps = {
  children: React.ReactNode;
};
export const BottomSheet = ({ children }: BottomSheetProps) => {
  return ReactDOM.createPortal(<>{children}</>, document.body);
};
