const app = Vue.createApp({
    data() {
        return {
            client: [],
        }
    },

    created() {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const myParam = Object.fromEntries(urlSearchParams.entries());
        axios.get("/api/accounts/" + myParam.id)
        .then(res => {
            this.client = res.data.transactionDTOS;
            this.client.sort((a, b) => a.id - b.id);
        })
        .catch(err => console.log(err))
    },

    methods: {
        formatDate(date){
            return new Date(date).toLocaleDateString('en-gb');
        } 
    },

})

app.mount("#app")