import clsx from "clsx";
import type { SelectHTMLAttributes } from "vue";
import { defaultProps } from "~/utils/html-attributes.util";
import FormControl from "./FormControl";
import {} from "./Input";
import Label from "./Label";

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
    errors: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
    onChange: {
      type: Function as PropType<SelectHTMLAttributes["onChange"]>,
      default: undefined,
    },
    name: {
      type: String as PropType<SelectHTMLAttributes["name"]>,
      default: undefined,
    },
    value: {
      type: String as PropType<SelectHTMLAttributes["value"]>,
      default: undefined,
    },
    onBlur: {
      type: Function as PropType<SelectHTMLAttributes["onBlur"]>,
      default: undefined,
    },
  },
  emits: ["update:value", "blur", "input"],
  setup(props, context) {
    return () => {
      function handleOnChange(event: Event) {
        context.emit(
          "update:value",
          (event.currentTarget as SelectHTMLAttributes).value,
        );

        if (props.onChange) {
          props.onChange(event);
        }
      }

      return (
        <FormControl>
          <Label for={props.id}>{props.label}</Label>

          <select
            autofocus={props.autoFocus}
            class={clsx("select select-bordered", {
              "input-error": props.errors.length,
            })}
            id={props.id}
            name={props.name}
            value={props.value}
            onChange={handleOnChange}
            onBlur={() => context.emit("blur")}
          >
            {context.slots.default && context.slots.default()}
          </select>

          {props.description && <div class="text-sm">{props.description}</div>}

          {props.errors.length ? (
            <div class="text-sm text-error py-2">{props.errors.join(" ")}</div>
          ) : null}
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
