export async function escapeDialog(path: string) {
  const parentPath = path.substring(0, path.lastIndexOf("/"));
  await navigateTo({
    path: parentPath,
  });
}
