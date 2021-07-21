const app = Vue.createApp({
    data() {
        return {
            loans: [],
            loanName: "",
            cuota: "",
            monto: "",
            accountDest: "",
            percentage: "",
        }
    },

    created() {
        axios.get("/api/loans")
            .then(res => {
                this.loans = res.data
                console.log(this.loans)
            })
    },

    methods: {
        solicitarPrestamo() {
            swal({
                title: "Estas seguro que desea solicitarlo?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    axios.post('/api/loans', { amount: parseInt(this.monto), payments: parseInt(this.cuota), accountDest: this.accountDest, name: this.loanName }).then(res =>  swal("¡Préstamos aceptado!", { icon: "success"})).then(res => window.location.href = "/accounts.html").catch(res => {
                        if(res.response.data == "Faltan datos"){
                            swal({
                                title: "Préstamo rechazado!", 
                                icon: "warning",
                                text: "Faltan ingresar datos."})
                        }else if(res.response.data == "La cuenta destino no existe"){
                            swal({
                                title: "Préstamo rechazado!", 
                                icon: "warning",
                                text: "La cuenta destino no existe."})
                        }else if(res.response.data == "La cuenta destino no te pertenece"){
                            swal({
                                title: "Préstamo rechazado!", 
                                icon: "warning",
                                text: "La cuenta destino no te pertenece."})
                        }else if(res.response.data == "EL monto solicitado excede el presupuesto del mismo"){
                            swal({
                                title: "Préstamo rechazado!", 
                                icon: "warning",
                                text: "EL monto solicitado excede el presupuesto del mismo."})
                        }
                    })
                } else {
                  swal("Solicitud de préstamo cancelada!");
                }
              });
        },

        cerrarSesion(){
            axios.post('/api/logout').then(res => window.location.href="/index.html")
        },
    },

    computed: {
        porcentajeLoan() {
            let calculo1 = (20 / 100) * parseInt(this.monto)
            let calculo = parseInt(this.monto) + calculo1

            return (calculo / this.cuota).toFixed(2);
        },
    }
})

app.mount("#app")