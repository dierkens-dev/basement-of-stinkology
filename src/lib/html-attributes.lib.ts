import type { HTMLAttributes } from "vue";

export const defaultProps = {
  class: {
    type: String as PropType<HTMLAttributes["class"]>,
    default: undefined,
  },
  id: {
    type: String as PropType<HTMLAttributes["id"]>,
    default: undefined,
  },
};
