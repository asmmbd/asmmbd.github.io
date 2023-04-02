const firebaseConfig = {
  apiKey: "AIzaSyDdiEIc1e26bHA8GD6_qoy_nKnVYsd084E",
  authDomain: "test-app-43138.firebaseapp.com",
  databaseURL: "https://test-app-43138-default-rtdb.firebaseio.com",
  projectId: "test-app-43138",
  storageBucket: "test-app-43138.appspot.com",
  messagingSenderId: "389574239084",
  appId: "1:389574239084:web:a2947fcd4155795b478949",
};
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
let form = document.querySelector("#form");
let loading = document.querySelector(".loading");
let sentSms = document.querySelector(".sent-message");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  loading.classList.remove("d-none");
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let subject = document.querySelector("#subject").value;
  let message = document.querySelector("#message").value;
  console.log(name, email, subject, message);

  db.collection("messages")
    .add({
      name: name,
      email: email,
      subject: subject,
      message: message,
    })
    .then((docRef) => {
      loading.classList.add("d-none");
      sentSms.classList.remove("d-none");
      setTimeout(() => {
        sentSms.classList.add("d-none");
      }, 3000);
      form.reset();
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
});
