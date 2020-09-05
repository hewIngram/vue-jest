<template>
  <div :class="[css.testB, $style.testA]">
    <div :class="$style.testC">Test text</div>
    <div class="testD">lorem ipsum</div>
  </div>
</template>

<script>
export default {
  name: 'Button',
}
</script>

<style module src="./ExternalCss.css" />
<style module="css" src="./ExternalNamedCss.css" />
<style>
.testD {
    color: green;
}
</style>
