document.addEventListener("DOMContentLoaded", () => {
  fetch("/auth/check", {
    method: "GET",
    credentials: "include", // 🔥 this sends the cookie with the request
  })
    .then(res => res.json())
    .then(data => {
      if (!data.authenticated) {
        alert("You are not authorized! Please login first");
        window.location.href = "../homepage/homepage.html";
      }
    })
    .catch(err => {
      console.error("Auth check failed:", err);
      window.location.href = "../homepage/homepage.html";
    });
});


const details = new URLSearchParams(window.location.search);
const vehicleType = details.get("vehicleType");
const name = details.get("name");
const phoneNumber = details.get("mobileNumber");


const alpha_complex = document.getElementById("alpha-complex");
const beta_complex = document.getElementById("beta-complex");

alpha_complex.addEventListener("click", (event) => {
    if(vehicleType === null || name === null || phoneNumber === null) {

        setTimeout(() => {
          window.location.href = `../parkingmap/parkingmap.html?`;
        }, 100);

    } else {
        setTimeout(() => {
            window.location.href = `../parkingmap/parkingmap.html?vehicleType=${vehicleType}&name=${name}&mobileNumber=${phoneNumber}`;
          }, 100);
    }
});


beta_complex.addEventListener("click", (event) => {

    if(vehicleType === null || name === null || phoneNumber === null) {

        setTimeout(() => {
          window.location.href = `../parkingmap/parkingmap2.html?`;
        }, 100);

    } else {
        setTimeout(() => {
            window.location.href = `../parkingmap/parkingmap2.html?vehicleType=${vehicleType}&name=${name}&mobileNumber=${phoneNumber}`;
          }, 100);
    }
 
});
