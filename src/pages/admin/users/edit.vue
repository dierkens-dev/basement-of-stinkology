<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { FetchError } from "ofetch";
import { useForm } from "vee-validate";
import { componentBindsConfig } from "~/features/forms";
import {
  AdminUsersPatchErrors,
  adminUsersPatchBodySchema,
} from "~/server/api/admin/users/-[id].patch.schema";
import { RoleLevel } from "~/services/prisma.client";
import { escapeDialog } from "~/utils/escapeDialog";

const { query } = useRoute();
const id = query.id;
const { data: user } = await useFetch(`/api/users/${id}`);

const validationSchema = toTypedSchema(adminUsersPatchBodySchema);

const {
  defineComponentBinds,
  handleSubmit,
  isSubmitting,
  setErrors,
  setValues,
} = useForm({
  validationSchema,
  // Already loaded
  initialValues: {
    role: user.value?.role,
    name: user.value?.name ?? undefined,
  },
});

// First time loading
watch(user, async (values) => {
  setValues({
    name: values?.name ?? undefined,
    role: values?.role,
  });
});

const role = defineComponentBinds("role", componentBindsConfig);
const name = defineComponentBinds("name", componentBindsConfig);

const formErrors = ref<null | AdminUsersPatchErrors["formErrors"]>(null);

const onSubmit = handleSubmit(async (values) => {
  formErrors.value = [];

  try {
    await $fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      body: values,
    });

    await navigateTo({
      path: "/admin/users",
    });

    await refreshNuxtData("admin-users");
  } catch (error) {
    if (error instanceof FetchError) {
      const errors = readFetchError<AdminUsersPatchErrors>(error);

      formErrors.value = errors?.formErrors || null;
      setErrors(errors?.fieldErrors || {});

      return;
    }

    throw error;
  }
});
const { path } = useRoute();
</script>

<template>
  <dialog
    class="modal modal-open modal-top sm:modal-middle"
    open
    @keydown.esc="escapeDialog(path)"
  >
    <div v-if="user" class="modal-box prose">
      <h2>Edit {{ user?.email }}</h2>

      <form autocomplete="off" novalidate @submit="onSubmit">
        <TextField
          v-bind="name"
          label="Name"
          name="name"
          type="text"
          auto-focus
        />

        <Select v-bind="role" label="Role" name="role">
          <option
            v-for="roleOption in Object.keys(RoleLevel)"
            :key="roleOption"
            :selected="role.value === roleOption"
          >
            {{ roleOption }}
          </option>
        </Select>

        <P
          v-for="error in formErrors"
          :key="error"
          class="alert alert-error shadow-lg mb-3"
          >{{ error }}</P
        >

        <div class="modal-action">
          <SubmitButton :is-loading="isSubmitting" :disabled="isSubmitting">
            Save
          </SubmitButton>
        </div>
      </form>
    </div>
    <div v-else class="modal-box">
      <div class="loading loading-bars loading-lg"></div>
    </div>

    <div class="modal-backdrop bg-black bg-opacity-30">
      <NuxtLink to="/admin/users">Close Modal</NuxtLink>
    </div>
  </dialog>
</template>
