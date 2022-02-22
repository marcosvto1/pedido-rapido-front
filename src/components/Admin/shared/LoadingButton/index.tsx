import classNames from "classnames";

export interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled: boolean;
}

const CustomButton = ({ loading, onClick, disabled, type, children, ...rest }: CustomButtonProps) => {
  return <button
    className={classNames("btn", "btn-primary", {
      loading: loading
    })}
    type={type}
    disabled={disabled}
    onClick={onClick}
    {...rest}
  >{children}</button>
}

export default CustomButton;