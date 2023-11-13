export default defineComponent({
  setup(_, context) {
    return () => {
      return (
        <h1 class="card-title mb-3 text-2xl">
          {context.slots.default && context.slots.default()}
        </h1>
      );
    };
  },
});
