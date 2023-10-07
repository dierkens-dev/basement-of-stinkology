<template>
  <AuthCard>
    <AuthCardBody>
      <form method="post">
        <AuthCardTitle>Sign Up</AuthCardTitle>

        <TextField name="email" type="email" label="Email" />
        <TextField name="password" type="password" label="Password" />

        <AuthCardActions>
          <SubmitButton>Sign Up</SubmitButton>

          <AuthCardLinks>
            <NuxtLink class="link hover:link-primary" to="/sign-in">
              Sign In
            </NuxtLink>
            or
            <NuxtLink class="link hover:link-primary" to="/password-reset">
              Reset Password
            </NuxtLink>
          </AuthCardLinks>
        </AuthCardActions>
      </form>
    </AuthCardBody>
  </AuthCard>
</template>
