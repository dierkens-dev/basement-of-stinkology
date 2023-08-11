import { clsx } from "clsx";
import type { InputHTMLAttributes } from "vue";
import { SetupContext } from "vue";

type InputProps = {
  class: string;
  type?: string;
  value?: string;
  id?: string;
};

const Input = (props: InputProps, context: SetupContext) => {
  const { class: className, ...rest } = props;
  return <input class={clsx("input input-bordered", className)} {...rest} />;
};

Input.props = {
  class: {
    type: String,
    default: undefined,
  },
  type: {
    type: String as PropType<InputHTMLAttributes["type"]>,
    default: undefined,
  },
  value: {
    type: String as PropType<InputHTMLAttributes["value"]>,
    default: undefined,
  },
  id: {
    type: String,
    default: undefined,
  },
};

export default Input;
