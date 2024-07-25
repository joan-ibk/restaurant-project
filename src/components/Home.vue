  <!-- eslint-disable-next-line vue/multi-word-component-names -->
<template>
  <Header />
  <h1>Hello {{ name }}, Welcome on Home Page</h1>
  <table border="1">
    <tr>
      <td>Id</td>
      <td>Name</td>
      <td>Contact</td>
      <td>Address</td>
      <td>Actions</td>
    </tr>
    <tr v-for="item in resturant" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.contact }}</td>
      <td>{{ item.address }}</td>
      <td>
        <router-link :to="'/update/' + item.id">Update</router-link>
        <button v-on:click="deleteRestaurant(item.id)">Delete</button>
      </td>
    </tr>
  </table>
</template>

<script>
import Header from "./Header.vue";
import axios from "axios";

/* eslint-disable */
export default {
  name: "Home",
  data() {
    return {
      name: "",
      resturant: [],
    };
  },
  components: {
    Header,
  },
  methods: {
    async deleteRestaurant(id) {
      const result = await axios.delete("http://localhost:3000/resturant/" + id);
      console.warn(result);
      if (result.status === 200) {
        this.loadData();
      }
    },
    async loadData() {
      let user = localStorage.getItem("user-info");
      if (!user) {
        this.$router.push({ name: "SignUp" });
        return;
      }

      this.name = JSON.parse(user).name;

      const result = await axios.get("http://localhost:3000/resturant");
      console.log(result.data);

      this.resturant = result.data;
    },
  },
  async mounted() {
    this.loadData();
  },
};
</script>

<style>
td {
  width: 160px;
  height: 40px;
}
</style>
