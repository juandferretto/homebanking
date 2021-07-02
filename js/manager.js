const app = Vue.createApp({
    data() {
        return {
            clients: [],
            firstName: "",
            lastName: "",
            email: "",
            restResponse: "",
        }
    },

    created() {
        axios.get('/rest/clients')
                .then(response => {
                    this.clients = response.data["_embedded"].clients;
                })
                .catch(e => {
                    console.log(e);
                })
    },

    methods: {
        
        postClient(){
            
            axios.post('/rest/clients', {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
            })
            location.reload();
        },
         
        deleteClient(client){
            axios.delete(client._links.self.href)
            location.reload();
        }
            
    },
});

app.mount("#app");


