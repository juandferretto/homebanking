const app = Vue.createApp({
    data(){
        return{
            cuentaDest: "",
            monto: "",
            descripcion: "",
            cuentaOrigen: "",
            nameClient: "",
            accounts: [],
            cuentaPropia: true,
            terceros: true,
            cuentaPropiaIsTrue: false,
            tranferenciaATerceros: false,
            destCuenta: true,
            fondosInsuficientes: false
        }
    },

    created(){
        axios.get("/api/clients/current")
        .then(res => {
            this.nameClient = res.data.firstName + "  " + res.data.lastName
            this.accounts = res.data.accounts
        })
    },

    methods: {
        enviarTransferencia(){
            swal({
                title: "Estas seguro que desea realizarla?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  axios.post('/api/transactions', "amount=" + this.monto + "&description=" + this.descripcion + "&accountDest=" + this.cuentaDest + "&accountOrigin=" + this.cuentaOrigen).then(res =>  swal("Transferencia realizada!", {
                    icon: "success",})).then(res => window.location.href="accounts.html").catch(res => {
                    if(res.response.data == "Fondos insuficientes"){
                      this.fondosInsuficientes = true
                      swal({
                        title: "Transferencia rechazada!", 
                        icon: "warning",
                        text: "Fondos insuficientes"})
                    }else if(res.response.data == "La cuenta de origen y la cuenta destino son iguales"){
                      swal({
                        title: "Transferencia rechazada!", 
                        icon: "warning",
                        text: "La cuenta de origen y la cuenta destino son iguales"})
                    }else if(res.response.data == "La cuenta destino no existe"){
                      swal({
                        title: "Transferencia rechazada!", 
                        icon: "warning",
                        text: "La cuenta destino no existe"})
                    }else if(res.response.data == "Falta ingresar cuenta de origen o destino"){
                      swal({
                        title: "Transferencia rechazada!", 
                        icon: "warning",
                        text: "Falta ingresar cuenta de origen o destino"})
                    }else if(res.response.data == "Falta ingresar monto o descripción"){
                      swal({
                        title: "Transferencia rechazada!", 
                        icon: "warning",
                        text: "Falta ingresar monto o descripción "})
                    }
                  })
                } else {
                  swal("Transferencia cancelada!");
                }
              });
        },

        transferencia1(){
            this.cuentaPropiaIsTrue = true
            this.cuentaPropia = false
            this.terceros = false
            this.destCuenta = false
        },

        transferenciaTerceros(){
            this.terceros = false
            this.destCuenta = false
            this.tranferenciaATerceros = true
            this.cuentaPropia = false
        },

        cerrarSesion(){
          axios.post('/api/logout').then(res => window.location.href="/index.html")
      },
    }
})

app.mount("#app")