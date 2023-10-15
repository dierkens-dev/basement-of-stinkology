export const AuthCardLinks = defineComponent({
  setup(_, context) {
    return () => {
      return (
        <div class="flex gap-1">
          {context.slots.default && context.slots.default()}
        </div>
      );
    };
  },
});
