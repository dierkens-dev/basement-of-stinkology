<template>
  <div>
    <!-- <AuthCard>
      <AuthCardBody>
        <ValidatedForm validator={validator} method="post">
          <AuthCardTitle>Sign In</AuthCardTitle>

          <TextField name="email" type="email" label="Email" />
          <TextField name="password" type="password" label="Password" />

          {message ? (
            <P className="alert alert-error shadow-lg mb-3">{message}</P>
          ) : null}

          <AuthCardActions>
            <SubmitButton
              isLoading={navigation.state !== "idle"}
              disabled={navigation.state !== "idle"}
            >
              {navigation.state === "submitting" ? "Signing In..." : "Sign In"}
            </SubmitButton>

            <AuthCardLinks>
              <Link className="link hover:link-primary" to="/sign-up">
                Sign Up
              </Link>
              or
              <Link className="link hover:link-primary" to="/password-reset">
                Reset Password
              </Link>
            </AuthCardLinks>
          </AuthCardActions>
        </ValidatedForm>
      </AuthCardBody>
    </AuthCard> -->
    <p>Sign-In Options:</p>
    <button @click="signIn('github')">Github</button>
    <!-- NOTE: Here we hard-coded username and password, on your own page this should probably be connected to two inputs for username + password -->
    <Button
      @click="signIn('credentials', { username: 'test', password: 'hunter2' })"
    >
      Username and Password
    </Button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

const { signIn, getSession, data, status } = useAuth();
const session = await getSession();
</script>
