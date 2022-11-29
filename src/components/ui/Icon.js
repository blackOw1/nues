import icons from 'assets/feather-sprite.svg';
import classes from 'styles/ui/Icon.module.css';

const Icon = (props) => {
  const { className } = props;
  const icon = (props.icon === 'filters' && 'bar-chart') || props.icon;

  return (
    <svg className={`${classes.icon} ${className || ''}`}>
      <use href={`${icons}#${icon}`} />
    </svg>
  );
};

export default Icon;
