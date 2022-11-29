import classes from 'styles/ui/Card.module.css';

const Card = (props) => {
  return (
    <div {...props} className={`${classes.card} ${props.className || ''}`}>
      {props.children}
    </div>
  );
};

export default Card;
