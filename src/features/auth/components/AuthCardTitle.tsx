import H1 from "~/components/typography/H1";

export const AuthCardTitle = defineComponent({
  setup(_, context) {
    return () => {
      return (
        <H1 class="card-title mb-3">
          {context.slots.default && context.slots.default()}
        </H1>
      );
    };
  },
});
