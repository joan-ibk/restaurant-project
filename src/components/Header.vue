<!-- eslint-disable-next-line vue/multi-word-component-names -->
<template>
    <div class="nav">
        <router-link to ="/">Home</router-link>
        <router-link to ="/add">Add Resturant</router-link>
        
        <a v-on:click="logout" href="#">LogOut</a>
    </div>
</template>
<script>
 /* eslint-disable */
export default{
    name:'Header',
    methods:{
        logout()
        {
           localStorage.clear();
           this.$router.push({name:'LoginPage'})
        }
    }
}
</script>
<style>
.nav{
    background-color: #333;
    overflow: hidden;
}
.nav a{
    float: left;
    color:#f2f2f2f2;
    padding: 14px 14px;
    text-align: center;
    font-size: 17px;
    text-decoration: none;
    margin-right: 5px;
}
.nav a:hover{
    background-color: #ddd;
    color: #333;
}
</style>