import clsx from "clsx";
import { defaultProps } from "~/utils/html-attributes.util";
import FormControl from "./FormControl";
import Input, { inputProps } from "./Input";
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
      type: Array as PropType<string[]> | PropType<string>,
      default: () => [],
    },
    ...inputProps,
  },
  emits: ["update:value", "blur", "input"],
  setup(props, context) {
    return () => {
      function handleOnInput(event: Event) {
        context.emit(
          "update:value",
          (event.currentTarget as HTMLInputElement).value,
        );

        if (props.onInput) {
          props.onInput(event);
        }
      }

      const errors = computed(() => {
        if (Array.isArray(props.errors)) {
          return props.errors;
        }

        if (typeof props.errors === "string" && props.errors.length) {
          return [props.errors];
        }

        return [];
      });

      return (
        <FormControl>
          <Label for={props.id}>{props.label}</Label>

          <Input
            autoFocus={props.autoFocus}
            class={clsx({ "input-error": errors.value.length })}
            id={props.id}
            name={props.name}
            type={props.type}
            value={props.value}
            onInput={handleOnInput}
            onBlur={() => context.emit("blur")}
          />

          {props.description && <div class="text-sm">{props.description}</div>}

          {errors.value.length ? (
            <div class="text-sm text-error py-2">{errors.value.join(" ")}</div>
          ) : null}

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
