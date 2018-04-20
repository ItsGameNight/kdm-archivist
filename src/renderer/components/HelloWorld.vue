<template>
  <div>
    <p> {{ message }} </p>
    <router-link to="./landing">Go to Landing Page</router-link>
  </div>
</template>

<script>
  export default {
    name: 'hello-page',
    data () {
      return {
        message: 'Hello World!'
      }
    }
  }
</script>

<style scoped>
p {
  color: green;
}
</style>
