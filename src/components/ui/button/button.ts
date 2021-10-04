import { compile } from 'handlebars';
import BaseComponent from '../../base-component';
import template from './button.tpl';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  caption: string;
  events?: Record<string, Function>;
  disabled?: boolean;
  isIcon?: boolean;
  className?: string;
};

function getClassName(
  isIcon: boolean | undefined,
  className: string | undefined,
  defaultClass: string = '',
): string | undefined {
  const classes: string[] = [];
  if (isIcon) classes.push('material-icons');

  if (className) {
    classes.push(className);
  } else {
    classes.push(defaultClass);
  }

  if (classes.length > 0) {
    return classes.join(' ');
  }
  return undefined;
}

export default class Button extends BaseComponent {
  constructor(props: ButtonProps) {
    super('template', {
      ...props,
      isIcon: props.isIcon || false,
      className: getClassName(
        props.isIcon,
        props.className,
      ),
      type: props.type || 'button',
    });
  }

  render() {
    const tpl = compile(template);
    return tpl(this.props);
  }
}
