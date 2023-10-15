export const AuthCardActions = defineComponent({
  setup(_, context) {
    return () => {
      return (
        <div class="card-actions mb-3 justify-between flex-row-reverse">
          {context.slots.default && context.slots.default()}
        </div>
      );
    };
  },
});
