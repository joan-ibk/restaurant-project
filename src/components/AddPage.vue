<!-- eslint-disable-next-line vue/multi-word-component-names -->
<template>
    <Header />
    <h1>Hello User, Welcome on Add Resturant Page</h1>
<form class="add">
<input type="text" name="name" placeholder="Enter Name" v-model="restaurant.name"/>
<input type="text" name="address" placeholder="Enter Address"  v-model="restaurant.address"/>
<input type="text" name="contact" placeholder="Enter Contact" v-model="restaurant.contact"/>
<button type="button" v-on:click="addRestaurant">Add new Restaurant </button>

</form>
</template>

<script>
import Header from "./Header.vue";
import axios from 'axios'
 /* eslint-disable */
export default{
    name:'AddPage',
    components: {
        Header
    },
    data()
    {
        return{
            restaurant:{
                name:'',
                address:'',
                contact:'',
            }
        }
    },
    methods:{
       async addRestaurant()
        {
            console.warn(this.restaurant)
            const result = await axios.post("http://localhost:3000/resturant",{
                name:this.restaurant.name,
                address:this.restaurant.address,
                contact:this.restaurant.contact,
            });
            if(result.status==201)
            {
                this.$router.push({name:'Home'});
            }
            console.warn("result",result)
        }
    },
    mounted()
    {
        let user= localStorage.getItem('user-info');
        if(!user)
    {
        this.$router.push({name:'SignUp'})
    }
    }
}

</script>