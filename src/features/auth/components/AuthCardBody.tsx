export const AuthCardBody = defineComponent({
  setup(_, context) {
    return () => {
      return (
        <div class="card-body">
          {context.slots.default && context.slots.default()}
        </div>
      );
    };
  },
});
