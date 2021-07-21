const app = Vue.createApp({
    data(){
        return{
            client: [],
            loans: [],
            nameClient:"",
            accounts: [],
            isActive: [],
            tipoCuenta: false,
            crearAccountFinal: false,
            crearAccount: true,
            cuentaTipo: "",
            nameAdmin: "",
            cuotas: [],
            nombrePrestamo: "",
            montoPrestamo: "",
            porcentajePrestamo: "",
        }
    },
    
    created(){
        axios.get('/api/clients/current')
        .then(res => {
            this.client = res.data.accounts;
            this.client.sort((a, b) => b.balance - a.balance)
            this.loans = res.data.clientLoanDTOS;
            this.nameClient = res.data.firstName + "  " + res.data.lastName
            this.accounts = res.data.accounts
            this.isActive = this.accounts.filter(account => account.active == true)
            this.nameAdmin = res.data.firstName
        })
        .catch(err => console.log(err))
    },

    methods:{
        cerrarSesion(){
            axios.post('/api/logout').then(res => window.location.href="/index.html")
        },

        crearCuenta(){
           this.tipoCuenta = true
           this.crearAccountFinal = true
           this.crearAccount = false

        },

        crearLaCuenta(){
            axios.post('api/clients/current/accounts', "accountType=" + this.cuentaTipo).then(res => window.location.reload()).catch(res => console.log(res))
        },

        eliminarCuenta(account){
            axios.post('api/accounts/' + account.id).then(res => window.location.href="accounts.html").catch(res => res)
        },

        crearPrestamo(){
            axios.post('api/loansCreate', { name: this.nombrePrestamo, maxAmount: this.montoPrestamo, porcentaje: this.porcentajePrestamo, payments: this.cuotas}).catch(res => console.log(res))
        }

    },
})

app.mount("#app");