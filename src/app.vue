<template>
  <div>
    <H1>One</H1>
    <H2>Two</H2>
    <H3>Three</H3>
    <H4>Four</H4>
    <H5>Five</H5>
    <H6>Six</H6>
    <P>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a elit
      dignissim nisl consequat lobortis. Phasellus finibus augue at venenatis
      tincidunt. Donec sem enim, dapibus eget ultricies at, porttitor ac purus.
      Ut ac pharetra mauris. Nullam mauris metus, pulvinar a molestie ac,
      aliquam sed massa. Nullam vestibulum, metus sed efficitur maximus, felis
      ante facilisis augue, eget varius nisi nunc eu dui. Donec nec auctor
      mauris. Curabitur nulla erat, rutrum eget ultrices eu, rutrum nec odio.
      Donec consequat eget quam pulvinar congue. Praesent laoreet in lectus id
      lobortis. Sed auctor semper velit eu sodales. Quisque ut sagittis urna. Ut
      erat quam, iaculis sit amet neque id, consequat fringilla urna. Lorem
      ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales
      dignissim interdum.</P
    >
    <P>
      Nunc vitae arcu facilisis, volutpat tellus a, mollis dui. Nunc fringilla
      lectus sit amet diam pulvinar, a porta justo lobortis. Integer porttitor
      est imperdiet lectus elementum interdum. Nam semper enim et felis tempus
      lacinia. In luctus ipsum vel libero egestas, eu semper est consectetur.
      Sed velit leo, tincidunt dapibus imperdiet sit amet, semper ac felis. Cras
      interdum diam eget nibh aliquet, rhoncus commodo ex pulvinar. Mauris
      tortor metus, elementum ac mollis at, elementum eget magna. Pellentesque
      quis feugiat felis. Pellentesque at sem in ipsum efficitur volutpat.</P
    >
    <Button class="btn-primary">Click me</Button>
    <Label class="lbl-primary" for="myBunghole">Poop</Label>
    <Input id="myBunghole" class="input-primary" />

    <FormControl>
      <TextField
        id="email"
        type="email"
        value="chris@dierkens.dev"
        error="error!"
        label="Email"
      />
    </FormControl>

    <Button class="m-4 btn-secondary btn-outline" @click="open = true"
      >Open Modal</Button
    >
    <Modal :open="open" @on-close="open = false">
      <h3 class="font-bold text-lg">Hello!</h3>
      <p class="py-4">Press ESC key or click the button below to close</p>

      <div class="modal-action">
        <button class="btn btn-primary" autofocus>Close</button>
      </div>
    </Modal>
  </div>
</template>
<script setup>
import { ref } from "vue";

const open = ref(false);
</script>
