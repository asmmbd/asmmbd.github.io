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
const installPopup = document.getElementById("installPopup");
const installButton = document.getElementById("installButton");
const cancelButton = document.getElementById("cancelButton");

// ইভেন্ট লিসেনার যোগ করুন
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // শুধুমাত্র প্রথম ভিজিটে পপআপ দেখান
  if (!localStorage.getItem("installPromptShown")) {
    installPopup.style.display = "flex";
    localStorage.setItem("installPromptShown", true);
  }
});

// ইনস্টল বাটনে ক্লিক করলে
installButton.addEventListener("click", () => {
  installPopup.style.display = "none";
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === "accepted") {
      console.log("অ্যাপ ইনস্টল করা হয়েছে");
    } else {
      console.log("অ্যাপ ইনস্টল বাতিল করা হয়েছে");
    }
    deferredPrompt = null;
  });
});

// ক্যান্সেল বাটনে ক্লিক করলে
cancelButton.addEventListener("click", () => {
  installPopup.style.display = "none";
});
