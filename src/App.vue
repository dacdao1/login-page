<template>
  <div id="app">
    <article>
      <div class="container" :class="{'sign-up-active' : signUp}">
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-left">
              <h2>Welcome Back!</h2>
              <p>Please login with your personal info</p>
              <button class="invert" id="signIn" @click="signUp = !signUp">Sign In</button>
            </div>
            <div class="overlay-right">
              <h2>Hello, Friend!</h2>
              <p>Please enter your personal details</p>
              <button class="invert" id="signUp" @click="signUp = !signUp">Sign Up</button>
            </div>
          </div>
        </div>


<div v-if="settingPage===false">
  <form class="sign-up" action="#" method="post" @submit.prevent="submitSignUp()">
    <h2>Create login</h2>
    <div v-if="this.enterCorrectPassword===true">
      Use your email for registration
    </div>
    <div v-else style="color: red">Please enter a password</div>
    <input type="email" placeholder="Email" v-model="signUpEmail"/>
    <input type="password" placeholder="Password" v-model="signUpPassword"/>

<div>
  Please select from below
</div>
    <select v-model="selectedUserType">

  <option>Retailer</option>
  <option>Consumer</option>

</select>

    <button type="submit" @click="submitSignUp()">Sign Up</button>
  </form>
</div>

<div v-else-if="settingPage===true">
  <form class="sign-up" action="#">
    <h2>Thank you for signing up to our service. Please wait for an email confirmation. </h2>
  </form>
</div>





<div v-if="this.emailConfirm==true">
  <form  class="sign-in" action="#">
    <h2>Sign In</h2>
    <div v-if="this.correctSignIn==true">Use your account</div>
    <div v-else style="color: red">Please enter the correct email and password</div>
    <input type="email" placeholder="Email" v-model="signInEmail"/>
    <input type="password" placeholder="Password" v-model="signInPassword"/>
    <a href="#">Forgot your password?</a>
    <button type="submit" @click="submitSignIn()">Sign In</button>
  </form>
</div>
<div v-else>
  <form  class="sign-in" action="#">
    <h2>Please enter the confirmation code</h2>


    <input  placeholder="Confirmation Code" v-model="confirmCode"/>

    <button type="submit" @click="submitSignInConfirmation()">Confirm</button>
  </form>
</div>


      </div>
    </article>

  <!-- Youtube Link -->
  <a id="yt_link" href="https://demo.freeingreturns.com">Return to Homepage</a>
</div>


</template>

<script>
import axios from "axios"
import CryptoJS from "crypto-js"
import sgMail from '@sendgrid/mail'
export default {
  name: 'App',
  data: () => {
    return {
      signUp: false,
      credentials: null,
      settingPage: false,
      emailInfo: '',
      signUpEmail: '',
      signUpPassword: '',
      signInEmail: '',
      signInPassword: '',
      enterCorrectEmail: true,
      enterCorrectPassword: true,
      enterNothingCorrect: true,
      hashPass:'',
      correctSignIn: true,
      emailConfirm:true,
      emailConfirmed: 'false',
      randomNumber:'',
      emailCon: false,
      settingP: false,
      selectedUserType: 'Retailer',
      confirmCode:'' ,
      signInEmailHidden: '',
      signInPasswordHidden: '',
      userID: '',
    };
  },
  created() {
     window.addEventListener('beforeunload', this.storeData)
    },
  methods: {

submitSignUp(){
  this.randomNumber = Math.floor(100000 + Math.random() * 900000);
if (this.signUpEmail && this.signUpPassword){axios.post('https://devapi.freeingreturns.com/register', {email: this.signUpEmail,password: this.signUpPassword, emailConfirmation: this.emailCon, settingsPage: this.settingP, confirmationCode: this.randomNumber, userType: this.selectedUserType})
          .then(res => {
          this.settingPage=true;
          sgMail.setApiKey('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');
const msg = {
  to: 'dacdao01@gmail.com',
  from: 'dacdao01@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>' +this.randomNumber,
};
sgMail.send(msg);
          })
          .catch(err => {// catch error
          });}
else if(!this.signUpEmail){this.enterCorrectEmail = false}
else if(!this.signUpPassword){this.enterCorrectPassword= false}
else{this.enterNothingCorrect=false}
},
toSettingPage(){
this.settingPage = true;
},
storeData() {
                    if (window.performance && this.signUpEmail.includes("@")) {
                    axios.post('https://devapi.freeingreturns.com/register', {email: this.signUpEmail})
                              .then(res => {
                              console.log(res.status);
                              })
                              .catch(err => {// catch error
                              });
                  }
                    if (window.performance.navigation.type != 1) {
                      alert("closing the browser")
                    }
          },
submitSignInConfirmation(){

if (this.confirmCode){
  axios.get('https://devapi.freeingreturns.com/register/users')
            .then(res => {
              for(var i = 0; i < res.data.users.length; i++) {
      if (res.data.users[i].id == this.userID && res.data.users[i].confirmationCode == this.confirmCode) {
        axios.post('https://devapi.freeingreturns.com/register', {id: this.userID, emailConfirmation: true})
          break;
      }

  }


            })
            .catch(err => {// catch error
            });
}

},
submitSignIn(){

if (this.signInEmail && this.signInPassword){
  axios.get('https://devapi.freeingreturns.com/register/users')
            .then(res => {
              for(var i = 0; i < res.data.users.length; i++) {
      if (res.data.users[i].email === this.signInEmail && res.data.users[i].password == CryptoJS.MD5(this.signInPassword) && res.data.users[i].emailConfirmation == 1) {

          window.location.href = 'https://setting.freeingreturns.com/';
          break;
      } else if (res.data.users[i].email === this.signInEmail && res.data.users[i].password == CryptoJS.MD5(this.signInPassword) && res.data.users[i].emailConfirmation == 0){
        this.userID = res.data.users[i].id;
        this.emailConfirm = false;
      }

  }


            })
            .catch(err => {// catch error
            });
}

}
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

#app {
  font-family: Tahoma;
  font-size: 1rem;
  color: #222;
  background-color: #092525;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  position: relative;
  width: 768px;
  height: 480px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
    0 10px 10px rgba(0, 0, 0, .2);
  background: linear-gradient(to bottom, #efefef, #ccc);

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform .5s ease-in-out;
    z-index: 100;
  }

  .overlay {
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    background: linear-gradient(to bottom right, white, #0AA8ED);
    color: #fff;
    transform: translateX(0);
    transition: transform .5s ease-in-out;
  }

  @mixin overlays($property) {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 70px 40px;
    width: calc(50% - 80px);
    height: calc(100% - 140px);
    text-align: center;
    transform: translateX($property);
    transition: transform .5s ease-in-out;
  }

  .overlay-left {
    @include overlays(-20%);
  }

  .overlay-right {
    @include overlays(0);
    right: 0;
  }
}

h2 {
  margin: 0;
}

p {
  margin: 20px 0 30px;
}

a {
  color: #222;
  text-decoration: none;
  margin: 15px 0;
  font-size: 1rem;
}

button {
  border-radius: 20px;
  border: 1px solid #0AA8ED;
  background-color: #0AA8ED;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 40px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform .1s ease-in;

  &:active {
    transform: scale(.9);
  }

  &:focus {
    outline: none;
  }
}

button.invert {
  background-color: transparent;
  border-color: #fff;
}

form {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 90px 60px;
  width: calc(50% - 120px);
  height: calc(100% - 180px);
  text-align: center;
  background: linear-gradient(to bottom, #efefef, #ccc);
  transition: all .5s ease-in-out;

  div {
    font-size: 1rem;
  }

  input {
    background-color: #eee;
    border: none;
    padding: 8px 15px;
    margin: 6px 0;
    width: calc(100% - 30px);
    border-radius: 15px;
    border-bottom: 1px solid #ddd;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, .4),
      0 -1px 1px #fff,
      0 1px 0 #fff;
    overflow: hidden;

    &:focus {
      outline: none;
      background-color: #fff;
    }
  }
}

.sign-in {
  left: 0;
  z-index: 2;
}

.sign-up {
  left: 0;
  z-index: 1;
  opacity: 0;
}

.sign-up-active {
  .sign-in {
    transform: translateX(100%);
  }

  .sign-up {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show .5s;
  }

  .overlay-container {
    transform: translateX(-100%);
  }

  .overlay {
    transform: translateX(50%);
  }

  .overlay-left {
    transform: translateX(0);
  }

  .overlay-right {
    transform: translateX(20%);
  }
}

@keyframes show {
  0% {
    opacity: 0;
    z-index: 1;
  }
  49% {
    opacity: 0;
    z-index: 1;
  }
  50% {
    opacity: 1;
    z-index: 10;
  }
}


/* Youtube Link */
#yt_link
{
  position: absolute;
  right: 0;
  left: 0;
  bottom: -200px;
  display: block;
  width: 160px;
  text-align: center;
  color: red;
  font-size: 15px;
  text-decoration: none;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding: 10px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 2px;
  animation: showYtLink 1.5s ease 3s forwards;
}

@keyframes showYtLink
{
  0%{ bottom: -200px; }
  100%{ bottom: 20px; }
}

</style>
