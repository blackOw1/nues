import classes from 'styles/ui/Button.module.css';

const Button = (props) => {
  let buttonClasses = `${classes.button} ${props.className || ''}`;
  const hasMoreThanOneChild = props.children.length > 1;

  if (hasMoreThanOneChild) buttonClasses = `${buttonClasses} ${classes['button-contents']}`;

  return (
    <button {...props} className={buttonClasses}>
      {props.children}
    </button>
  );
};

export default Button;
