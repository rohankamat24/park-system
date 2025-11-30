const typingElement = document.getElementById("centered-text");
const text = typingElement.textContent; // Get the text directly from the HTML
let index = 0;
let isDeleting = false;
const typingSpeed = 150; // Typing speed in milliseconds
const deletingSpeed = 75; // Deleting speed in milliseconds
const pauseDuration = 1500; // Pause before starting to delete
const Sign_in_button = document.getElementById('Sign-in');
const Sign_up_button = document.getElementById('Sign-up');
const inputField = document.getElementById('Number-input');
const logout_button = document.getElementById('logout');

function type() {
    if (isDeleting) {
        // If deleting, remove one character
        typingElement.textContent = text.substring(0, index--);
        if (index < 0) {
            isDeleting = false; // Switch to typing mode
            index = 0; // Reset index for typing again
            setTimeout(type, pauseDuration); // Pause before typing
        } else {
            setTimeout(type, deletingSpeed); // Continue deleting
        }
    } else {
        // If typing, add one character
        typingElement.textContent = text.substring(0, index++);
        if (index > text.length) { // If index exceeds length, correct it
            index = text.length; // Set index to last character
        }
        if (index === text.length) {
            isDeleting = true; // Switch to deleting mode
            setTimeout(type, pauseDuration); // Pause before deleting
        } else {
            setTimeout(type, typingSpeed); // Continue typing
        }
    }
}

// Start the typing effect
type();

let isLoggedin = false;


// Initial setup to add the prefix
inputField.value = '+91'; 

// Event listener to handle input changes
inputField.addEventListener('input', function() {
    // Remove all non-digit characters
    let digits = inputField.value.replace(/\D/g, '');

    // If there are more than 10 digits, only keep the last 10
    if (digits.length > 10) {
        digits = digits.slice(-10);
    }

    if(!inputField.value.includes("+91")){
        inputField.value = '+91' + digits;
    }
});



document.addEventListener("DOMContentLoaded", () => {
  fetch("/auth/check", {
    method: "GET",
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
        console.log(data);
      if (data.authenticated) {
        console.log("✅ Logged in");
        isLoggedin = true;
        Sign_in_button.style.display = 'none';
        Sign_up_button.style.display = 'none';
        logout_button.style.display = 'block';
      } else {
        console.log("❌ Not logged in");

        Sign_in_button.style.display = 'block';
        Sign_up_button.style.display = 'block';
        logout_button.style.display = 'none';
      }
    })
    .catch(err => {
      console.error("Auth check failed:", err);
    });
});


logout_button.addEventListener('click', () => {
    // Make an API request to invalidate the session on the server
    fetch('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // The cookie with the authToken is automatically sent with the request if it's not HttpOnly
      },
      credentials: 'include' // To send cookies with the request (for same-domain cookies)
      
    })
    .then(response => response.json())
    .then(data => {
      // Handle response
      if (data.success) {
        isLoggedin = false;
        Sign_in_button.style.display = 'block';
        Sign_up_button.style.display = 'block';
        logout_button.style.display = 'none';
    
        localStorage.removeItem('data');
        location.reload();

        console.log("User logged out successfully.");
        
      } else {
        console.log("Error logging out:", data.message);
      }
    })
    .catch(error => {
      console.error("Error during logout:", error);
    });
  });


// Event listener to handle keydown events for backspace
inputField.addEventListener('keydown', function(event) {
    if (event.key === 'Backspace') {
        const currentValue = inputField.value;

        if(currentValue.includes == ('+91')){
            const currentValue = currentValue.replace(/^\+91\s*/, '');
        }
      
        currentValue.trim().slice(0, -1);
        
    }
});

// Ensure correct cursor position when focused
inputField.addEventListener('focus', function() {
    if (inputField.value === '+91') {
        inputField.setSelectionRange(3, 3);
    } 
});



Sign_in_button.addEventListener('click', function(event){
    console.log("Sign in button clicked");
    setTimeout(() => {
        window.location.href = `../loginpage/login.html?`;
    }, 100);
    
})

Sign_up_button.addEventListener('click', ()=>{
    console.log("Sign up button clicked");
    setTimeout(() => {
        window.location.href = '../loginpage/login.html?signup=true';
    }, 100);
})


const params = new URLSearchParams(window.location.search);

const signup = params.get('signup');


const check_availability = document.getElementById('Check-Availability-button');
const Book_now_button = document.getElementById('Book-now-button');
const nameInput = document.getElementById('Name-input');
const vehicleType = document.getElementById('vehicle-type');
const numberInput = document.getElementById('Number-input')

numberInput.addEventListener('keydown', (event)=>{
    if(event.key === 'Enter'){
        if(isLoggedin){

            if(nameInput.value === '') {
                alert("Please Enter name");
            } else if(vehicleType.value === ''){
                alert("Please select vehicle type");
            } else {
                setTimeout(()=>{
                    window.location.href = `../Connector/connector.html?vehicleType=${vehicleType.value}&name=${nameInput.value}&mobileNumber=${numberInput.value}`;
                }, 100)
            }
        } else {
            alert("Please login first");
            window.location.href = '../loginpage/login.html?';
        }
    }
})

check_availability.addEventListener('click', (event)=>{

    setTimeout(()=>{
    window.location.href = `../Connector/connector.html?`;
    }, 100)
})

Book_now_button.addEventListener('click', (event)=>{

    if(isLoggedin){

        if(nameInput.value === '') {
            alert("Please Enter name");
        } else if(vehicleType.value === ''){
            alert("Please select vehicle type");
        } else if(numberInput.value === ''){
            alert("Please Enter phone number");
        } else {
            setTimeout(()=>{
                window.location.href = `../Connector/connector.html?vehicleType=${vehicleType.value}&name=${nameInput.value}&mobileNumber=${numberInput.value}`;
            }, 100)
        }
        
    } else {
        alert("Please login first");
        window.location.href = '../loginpage/login.html?';
    }

   
})

// logout_button.addEventListener('click', (event)=>{
//     setTimeout(()=>{
//         isLogin = false;
//         sessionStorage.removeItem('loginuser');
//         location.reload();
//     })
    
// })

const myBooking_button = document.getElementById('My-Booking');
const user = JSON.parse(localStorage.getItem('user'));

// myBooking_button.addEventListener('click', (event)=>{
//     if(isLogin){
        
//     }
// })



