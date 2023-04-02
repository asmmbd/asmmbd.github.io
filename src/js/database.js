let message_tabs = document.querySelector(".message-tabs");
let tabContent = document.querySelector(".tab-content");
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


function getdata() {
        db.collection("messages")
          .get()
          .then((data) => {
            let users = data.docs.map((item) => {
              return { ...item.data(), id: item.id };
            });
            console.log(users);
            for (let user of users) {
              console.log(user.email);

              message_tabs.innerHTML += `
                <li class="list-group-item list-group-item-info">
                  <i class="bi bi-x me-2 text-danger" onclick='deletedata("${user.id}")'></i><span onclick='showdata("${user.email}","${user.name}","${user.subject}","${user.message}")'>${user.email}</span>
                </li>
              `;
            }
          });
      }
      getdata();
      function showdata(email, name, sub, sms) {
        console.log(email, name, sub, sms);
        tabContent.innerHTML = `
              <div class="">
                <h1>${name}</h1>
                <h4>${email}</h4>
                <h5>${sub}</h5>
                <p>${sms}</p>
              </div>
        `;
      }
      function deletedata(id) {
        console.log(id);
        db.collection("messages")
          .doc(id)
          .delete()
          .then(() => {
            alert("Data Deleted");
            location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
