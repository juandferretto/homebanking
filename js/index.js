
const app = Vue.createApp({
  data(){
    return{
      email: "",
      password: "",
      errorPassword: false,
      firstName: "",
      lastName: "",
      email_record: "",
      password_record: ""
    }
  },

  methods: {
    iniciarSesion(){
      axios.post('/api/login', "email=" + this.email + "&password=" + this.password, {
        headers:{'content-type':'application/x-www-form-urlencoded'}
      }).then(res => window.location.href="/accounts.html").catch(err => this.errorPassword = true)
    },

    registrarse(){
      axios.post('/api/clients',"firstName=" + this.firstName + "&lastName=" + this.lastName + "&email=" + this.email_record + "&password=" + this.password_record , { headers:{'content-type':'application/x-www-form-urlencoded'}}).then().then(response => window.location.href="/index.html")
    }
  }
})

app.mount("#app")

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});