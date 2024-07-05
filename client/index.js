import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCWHzJ5m3FB_Gpq73Nz7ufVuKB8oTab3FE",
  authDomain: "wavely-d2557.firebaseapp.com",
  projectId: "wavely-d2557",
  storageBucket: "wavely-d2557.appspot.com",
  messagingSenderId: "840405144319",
  appId: "1:840405144319:web:ba355c227755168245f2ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

document.addEventListener('DOMContentLoaded', () => {
  const googleLogin = document.getElementById('google-login-btn');

  if (googleLogin) {
    googleLogin.addEventListener("click", function() {
      console.log('Google login button clicked');
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          console.log(user);
          window.location.href = "../logged.html";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(`Error ${errorCode}: ${errorMessage}`);
        });
    });
  } else {
    console.error('Google login button not found');
  }

  function updateUserProfile(user) {
    const userName = user.displayName;
    const userEmail = user.email;
    const userProfilePic = user.photoURL;

    const userNameElem = document.getElementById("userName");
    const userEmailElem = document.getElementById("userEmail");
    const userProfilePicElem = document.getElementById("userProfilePic");

    if (userNameElem) userNameElem.textContent = userName;
    if (userEmailElem) userEmailElem.textContent = userEmail;
    if (userProfilePicElem) userProfilePicElem.src = userProfilePic;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      updateUserProfile(user);
      const uid = user.uid;
      return uid;
    } else {
      console.log("No user is signed in.");
    }
  });
});

/* create account popup */

  const overlayBackground = document.getElementById('overlay');
  const popupAppear = document.getElementById('popup');
  const closePopup = document.getElementById('close-popup-btn');
  const createBtn = document.getElementById('create-btn');
  const submitBtn = document.getElementById('submit-btn');
  const userForm = document.getElementById('form')

  createBtn.addEventListener('click', function() {
      overlayBackground.style.display = 'block';
      popupAppear.style.display = 'flex';
  });

  closePopup.addEventListener('click', function() {
      overlayBackground.style.display = 'none';
      popupAppear.style.display = 'none';
  });

  overlayBackground.addEventListener('click', function() {
      overlayBackground.style.display = 'none';
      popupAppear.style.display = 'none';
  });
  
  submitBtn.addEventListener('click', function(event) {
    event.preventDefault();
    
    if (userForm.checkValidity()) {
        userForm.submit();
        window.location = "../logged.html"; 
    } else {
        console.log("Form validation failed. Please fill out all required fields.");
    }
});

 
/* form for creating accounts */

const birthDay = document.getElementById('day')

for (let i = 1; i <= 31; i++) {
  let option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  birthDay.appendChild(option);
}

const birthYear = document.getElementById('year');

for (let i = 1980; i <= 2024; i++) {
  let option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  birthYear.appendChild(option);
}