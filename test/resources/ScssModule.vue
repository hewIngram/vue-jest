<template>
  <div>
    <div :class="$style.testA"></div>
    <div :class="[ $style.testA ]"></div>
    <div :class="{[$style.testB]: true }"></div>
    <div :class="[$style.testA, { [$style.testB]: true }]"></div>
    <div :class="$style.thisIsAGlobalClass"></div>
  </div>
</template>

<style module lang="scss">
  @import "./styles/scss/direct-imports";
  @import "~__root/test/resources/styles/scss/direct-imports-moduleNameMapper";
  @import "~__test/resources/styles/scss/direct-imports-multiple-moduleNameMapper";
  @import './styles/scss/scss-color-variables';

  $form-input-bg: $white;

  .testA {
    background-color: red;
  }
  .testB {
    background-color: blue;
  }
  .testC {
    background-color: $form-input-bg;
  }
</style>

<style module lang="scss">
  @import "./styles/scss/direct-imports-second";
</style>
