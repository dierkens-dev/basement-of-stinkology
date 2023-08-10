import { clsx } from "clsx";
import type { InputHTMLAttributes } from "vue";
import { SetupContext } from "vue";

type InputFProps = {
  class: string;
  type: string;
  value: string;
};

const InputF = (props: InputFProps, context: SetupContext) => {
  const { class: className, ...rest } = props;
  return <input class={clsx("input input-bordered", className)} {...rest} />;
};

InputF.props = {
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
};

export default InputF;
