import { defaultProps } from "lib/html-attributes.lib";
import FormControl from "./FormControl";
import Label from "./Label";
import Input, { inputProps } from "./Input";
import clsx from "clsx";

export default defineComponent({
  props: {
    ...defaultProps,
    label: {
      type: String,
      default: undefined,
    },
    description: {
      type: String,
      default: undefined,
    },
    error: {
      type: String,
      default: undefined,
    },
    ...inputProps,
  },
  emits: ["input"],
  setup(props, context) {
    return () => {
      console.log({ props, attrs: context.attrs });
      return (
        <FormControl>
          <Label for={props.id}>{props.label}</Label>

          <Input
            class={clsx({ "input-error": props.error })}
            id={props.id}
            type={props.type}
            value={context.attrs.modelValue}
            onInput={(event) =>
              (context.attrs["onUpdate:modelValue"] as any)(
                (event.currentTarget as any).value,
              )
            }
          />

          {props.description && <div class="text-sm">{props.description}</div>}

          {props.error && (
            <div class="text-sm text-error py-2">{props.error}</div>
          )}

          {context.slots.default && context.slots.default()}
        </FormControl>
      );
    };
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(value: string) {
        this.$emit("input", value);
      },
    },
  },
});
