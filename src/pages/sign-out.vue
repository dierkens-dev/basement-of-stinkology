<script setup lang="ts">
const { signOut } = useAuth();
const { query } = useRoute();

const callbackUrl =
  typeof query.callbackUrl === "string"
    ? `/sign-in?callbackUrl=${query.callbackUrl}`
    : "/sign-in";

signOut({
  callbackUrl,
});
</script>
