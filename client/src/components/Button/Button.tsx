import './Button.css';

type ButtonProps = {
  title: string;
};

function Button({ title }: ButtonProps) {
  return <button className="add-btn">{title}</button>;
}

export default Button;
