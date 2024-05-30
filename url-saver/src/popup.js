// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// // Import the functions you need from the SDKs you need
// // popup.js
// document.addEventListener('DOMContentLoaded', () => {
//     // Your web app's Firebase configuration

//     // Your web app's Firebase configuration
//     // For Firebase JS SDK v7.20.0 and later, measurementId is optional


//     // Initialize Firebase
//     // const app = initializeApp(firebaseConfig);
//     // const analytics = getAnalytics(app);

//     // Initialize Firebase
//     const app = firebase.initializeApp(firebaseConfig);
//     const db = firebase.firestore();

//     const urlList = document.getElementById('urlList');
//     const saveButton = document.getElementById('saveButton');

//     // Load saved URLs on popup open
//     chrome.storage.sync.get('urls', (data) => {
//         const urls = data.urls ? data.urls : [];
//         urls.forEach((url) => {
//             const li = document.createElement('li');
//             const link = document.createElement('a');
//             link.href = url;
//             link.textContent = url;
//             link.target = '_blank';
//             li.appendChild(link);
//             urlList.appendChild(li);
//         });
//     });

//     // Save current tab's URL on button click
//     saveButton.addEventListener('click', () => {
//         chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//             const activeTab = tabs[0];
//             const url = activeTab.url;

//             chrome.storage.sync.get('urls', (data) => {
//                 const urls = data.urls ? data.urls : [];
//                 urls.push(url);
//                 chrome.storage.sync.set({ urls }, () => {
//                     const li = document.createElement('li');
//                     const link = document.createElement('a');
//                     link.href = url;
//                     link.textContent = url;
//                     link.target = '_blank';
//                     li.appendChild(link);
//                     urlList.appendChild(li);
//                 });
//             });

//             // Save to Firestore directly
//             db.collection('urls').add({ url })
//                 .then((docRef) => {
//                     console.log('URL saved with ID: ', docRef.id);
//                 })
//                 .catch((error) => {
//                     console.error('Error adding document: ', error);
//                 });
//         });
//     });
// });



// Import the functions you need from the SDKs you need
// import { initializeApp } from "./firebase/firebase-app.js";
// import { getFirestore, collection, addDoc } from "./firebase/firebase-firestore.js";

// // // Your web app's Firebase configuration


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// document.addEventListener('DOMContentLoaded', () => {
//     const urlList = document.getElementById('urlList');
//     const saveButton = document.getElementById('saveButton');

//     // Load saved URLs on popup open
//     chrome.storage.sync.get('urls', (data) => {
//         const urls = data.urls ? data.urls : [];
//         urls.forEach((url) => {
//             const li = document.createElement('li');
//             const link = document.createElement('a');
//             link.href = url;
//             link.textContent = url;
//             link.target = '_blank';
//             li.appendChild(link);
//             urlList.appendChild(li);
//         });
//     });

//     // Save current tab's URL on button click
//     saveButton.addEventListener('click', () => {
//         chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//             const activeTab = tabs[0];
//             const url = activeTab.url;

//             chrome.storage.sync.get('urls', (data) => {
//                 const urls = data.urls ? data.urls : [];
//                 urls.push(url);
//                 chrome.storage.sync.set({ urls }, () => {
//                     const li = document.createElement('li');
//                     const link = document.createElement('a');
//                     link.href = url;
//                     link.textContent = url;
//                     link.target = '_blank';
//                     li.appendChild(link);
//                     urlList.appendChild(li);
//                 });
//             });

//             // Save to Firestore directly
//             addDoc(collection(db, 'urls'), { url })
//                 .then((docRef) => {
//                     console.log('URL saved with ID: ', docRef.id);
//                 })
//                 .catch((error) => {
//                     console.error('Error adding document: ', error);
//                 });
//         });
//     });
// });


// import firebase from "../node_modules/firebase/app";
// import "../node_modules/firebase/firestore";

import { initializeApp } from "../firebase/firebase-app.js";
import { getFirestore, collection, addDoc } from "../firebase/firebase-firestore.js";


// // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const urlList = document.getElementById('urlList');
    const saveButton = document.getElementById('saveButton');

    // Load saved URLs on popup open
    chrome.storage.sync.get('urls', (data) => {
        const urls = data.urls ? data.urls : [];
        urls.forEach((urlInfo) => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = urlInfo.url;
            link.textContent = urlInfo.title.length > 40 ? urlInfo.title.substring(0, 40) + '...' : urlInfo.title;
            link.target = '_blank';
            li.appendChild(link);
            urlList.appendChild(li);
        });
    });

    // Save current tab's URL and title on button click
    saveButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            const url = activeTab.url;
            const title = activeTab.title;

            chrome.storage.sync.get('urls', (data) => {
                const urls = data.urls ? data.urls : [];
                if (!urls.some(urlInfo => urlInfo.url === url)) {
                    const urlInfo = { url: url, title: title };
                    urls.push(urlInfo);
                    chrome.storage.sync.set({ urls }, () => {
                        const li = document.createElement('li');
                        const link = document.createElement('a');
                        link.href = urlInfo.url;
                        link.textContent = urlInfo.title.length > 40 ? urlInfo.title.substring(0, 40) + '...' : urlInfo.title;
                        link.target = '_blank';
                        li.appendChild(link);
                        urlList.appendChild(li);
                    });
                }
            });

            // Save the URL and title to Firestore
            addDoc(collection(db, 'urls'), {
                title: title,
                url: url
            })
                .then((docRef) => {
                    console.log('URL saved with ID: ', docRef.id);
                })
                .catch((error) => {
                    console.error('Error adding document: ', error);
                });
        });
    });
});

