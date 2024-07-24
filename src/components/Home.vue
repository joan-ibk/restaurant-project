eslint-disable-next-line vue/multi-word-component-names
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
  import axios from 'axios';
  
  /* eslint-disable */
  export default {
    name: 'Home',
    data() {
      return {
        name: '',
        resturant: [],
      }
    },
    components: {
      Header
    },
    methods: {
      async deleteRestaurant(id) {
        try {
          const result = await axios.delete('http://localhost:3000/resturant/' + id);
          console.warn(result);
          if (result.status === 200) {
            this.loadData();
          }
        } catch (error) {
          console.error('Error deleting restaurant:', error);
        }
      },
      async loadData() {
        try {
          const user = localStorage.getItem('user-info');
          if (!user) {
            this.$router.push({ name: 'SignUp' });
            return;
          }
  
          this.name = JSON.parse(user).name;
  
          const result = await axios.get("http://localhost:3000/resturant");
          console.log('Data received from API:', result.data);
  
          this.resturant = result.data.map(item => {
            // Parse the ID as an integer and validate
            const id = parseInt(item.id, 10);
            if (isNaN(id)) {
              console.error('Invalid ID:', item.id);
              return null;
            }
            return {
              id: id,
              name: item.name || '',
              contact: item.contact || '',
              address: item.address || ''
            };
          }).filter(item => item !== null); // Filter out invalid entries
        } catch (error) {
          console.error('Error loading data:', error);
        }
      }
    },
    async mounted() {
      this.loadData();
    }
  }
  </script>
  
  <style>
  td {
    width: 160px;
    height: 40px;
  }
  </style>
  

   <!-- <template>
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
  import axios from 'axios';
  
  export default {
    name: 'Home',
    data() {
      return {
        name: '',
        resturant: [],
      }
    },
    components: {
      Header
    },
    methods: {
      async deleteRestaurant(id) {
        try {
          const result = await axios.delete(`http://localhost:3000/resturant/${id}`);
          console.warn(result);
          if (result.status === 200) {
            this.loadData();
          }
        } catch (error) {
          console.error('Error deleting restaurant:', error);
        }
      },
      async loadData() {
        try {
          const user = localStorage.getItem('user-info');
          if (!user) {
            this.$router.push({ name: 'SignUp' });
            return;
          }
  
          this.name = JSON.parse(user).name;
  
          const result = await axios.get("http://localhost:3000/resturant");
          console.log('Data received from API:', result.data);
  
          // Directly assign data assuming backend has been corrected
          this.resturant = result.data;
        } catch (error) {
          console.error('Error loading data:', error);
        }
      }
    },
    async mounted() {
      this.loadData();
    }
  }
  </script>
  
  <style>
  td {
    width: 160px;
    height: 40px;
  }
  </style>
   -->