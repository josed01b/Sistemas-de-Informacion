import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Cargar sidebar
fetch('/vistas/plantilla/sidebar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebar-container').innerHTML = data;
        
        // Funcionalidad del sidebar
        document.getElementById('btn').onclick = () => {
            document.querySelector('.sidebar').classList.toggle('active');
        };

        // Manejo de autenticación
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    document.getElementById("nombre").textContent = userData.userName;
                    document.getElementById("correo").textContent = userData.email;
                    document.getElementById("direccion").textContent = userData.address;
                }
            } else {
                window.location.href = "/vistas/login.html";
            }
        });

        // Logout
        document.getElementById("logout").addEventListener('click', () => {
            signOut(auth).then(() => window.location.href = "/vistas/login.html");
        });
    });