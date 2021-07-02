const app = Vue.createApp({
    data(){
        return{
            cards: [],
            debit: [],
            credit: [],
        }
    },

    created(){
        axios.get("/api/clients/current")
        .then(res => {
            this.cards = res.data.cards;
            this.debit = this.cards.filter(card => card.type === "DEBIT")
            this.credit = this.cards.filter(card => card.type === "CREDIT")
            
        })
    },

    methods: {
        formatDate(date){
            return new Date(date).toLocaleDateString('en-gb');
        } 
    },
})

app.mount("#app");