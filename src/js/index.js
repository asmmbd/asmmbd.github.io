let time = document.querySelector('#demo');
let date = document.querySelector('#demonew');

function showTime() {
  let current = new Date();

  time.innerHTML = current.toLocaleTimeString()
  date.innerHTML = current.toDateString()

}
setInterval(showTime, 1000)
    
         window.onscroll = function() {myFunction()};

               // Get the navbar
               var navbar = document.getElementById("navbar");

               // Get the offset position of the navbar
               var sticky = navbar.offsetTop;

               // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
               function myFunction() {
               if (window.pageYOffset >= sticky) {
                  navbar.classList.add("sticky-top")
               } else {
                  navbar.classList.remove("sticky-top");
               }
               }
      


if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.log("SW registered");
      console.log(registration);
    })
    .catch((error) => {
      console.log("SW registered failed");
      console.log(error);
    });
}

let deferredPrompt;
const addBtn = document.querySelector(".add-button");
const addBtnDiv = document.querySelector(".add-btn-div");

window.addEventListener("beforeinstallprompt", (e) => {
  
  e.preventDefault();
  deferredPrompt = e;

  

  addBtn.addEventListener("click", () => {
    
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
        addBtnDiv.style.display = 'none'
      } else {
        console.log("User dismissed the A2HS prompt");
        addBtnDiv.style.display = 'block'
      }
      deferredPrompt = null;
    });
   
  });
});
