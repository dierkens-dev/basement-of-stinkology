export default defineComponent({
  setup(_, context) {
    return () => {
      return (
        <div class="card w-full max-w-lg m-auto bg-base-100 shadow-xl">
          {context.slots.default && context.slots.default()}
        </div>
      );
    };
  },
});
