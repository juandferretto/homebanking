const app = Vue.createApp({
    data(){
        return{
            cards: [],
            nameClient:"",
            creacionTarjeta: true,
            solicitudTarjeta: false,
            tarjetaTipo: "",
            colorTarjeta: "",
        }
    },

    created(){
        axios.get("/api/clients/current")
        .then(res => {
            this.cards = res.data.cards;
            this.nameClient = res.data.firstName + "  " + res.data.lastName
        })
    },

    methods: {
        formatDate(date){
            return new Date(date).toLocaleDateString('en-gb');
        },

        abrirCrearTarjeta(){
            this.creacionTarjeta = false;
            this.solicitudTarjeta = true;
        },

        crearTarjeta(){
            axios.post('api/clients/current/cards', "cardsType=" + this.tarjetaTipo + "&cardsColor=" + this.colorTarjeta, {
                headers:{'content-type':'application/x-www-form-urlencoded'}
              }).then(res => window.location.href="/cards.html")
        },

        cancelarTarjeta(){
            this.creacionTarjeta = true;
            this.solicitudTarjeta = false
        },

        cerrarSesion(){
            axios.post('/api/logout').then(res => window.location.href="/index.html")
        },

        eliminarTarjeta(card){
            axios.delete('api/cards/' + card.id).then(res => window.location.href="/cards.html")
        }



    },
})

app.mount("#app");
