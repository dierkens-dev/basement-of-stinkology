import clsx from "clsx";

export default defineComponent({
  props: {
    class: String,
  },
  setup(props, context) {
    return () => {
      return (
        <h2
          class={clsx(
            props.class,
            "text-5xl font-normal leading-normal mt-0 mb-2",
          )}
        >
          {context.slots.default && context.slots.default()}
        </h2>
      );
    };
  },
});
