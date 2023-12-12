export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const drawerInput = document.querySelector("#main-nav-drawer");

    if (drawerInput && "checked" in drawerInput) {
      drawerInput.checked = false;
    }
  }
});
