const app = Vue.createApp({
    data(){
        return{
            client: [],
            loans: [],
            nameClient:"",
        }
    },
    
    created(){
        axios.get('/api/clients/current')
        .then(res => {
            this.client = res.data.accounts;
            console.log(this.client)
            this.loans = res.data.clientLoanDTOS;
            this.nameClient = res.data.firstName + "  " + res.data.lastName
        })
        .catch(err => console.log(err))

    },

    methods:{
        cerrarSesion(){
            axios.post('/api/logout').then(res => window.location.href="/index.html")
        }
    },

    computed: {
        totalBalance(){
            let cant = 0;
            this.client.forEach(client => {
                cant += client.balance
            })
            return cant;
        }
    },

})

app.mount("#app");