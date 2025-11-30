
document.querySelector('.img__btn').addEventListener('click', function() {
  document.querySelector('.cont').classList.toggle('s--signup');
});


const logout_button = document.getElementById('logout');

document.addEventListener('DOMContentLoaded', () => {
  fetch("/auth/check", {
    method: "GET",
    credentials: "include"
  })
  .then(res => res.json())
  .then(data => {
    if (data.authenticated) {
      alert("You are already logged in");
      window.location.href = "../homepage/homepage.html";
    }
  })
  .catch(err => {
    console.error("Auth check failed:", err);
  });
});


  function addToLocalStorage(info){
    localStorage.setItem("data", JSON.stringify(info));
  }


  document.addEventListener("DOMContentLoaded", () => {
   //login
   const signIn_button = document.getElementById("sign-in");
   const email_in = document.getElementById("email_in");
   const password_in = document.getElementById("password_in");


   const validateLoginForm = () => {

    const email_test = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_test = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@_#$!%*&])[a-zA-Z0-9@#$!%*&]{8,}$/


    if(email_in.value === ''){
      return false;
    } else if (password_in.value === ''){
      alert("Please Enter Password");
      return false;
    } else if (!email_test.test(email_in.value)){
      alert("Invalid Email Address");
      return false;
    } else if (!password_test.test(password_in.value)){
      alert("Invalid Password");
      return false;
    } else {
      return true;
    }
   }

   password_in.addEventListener("keydown", (event)=> {
    if(event.key === "Enter" && validateLoginForm()){
      login();

    }
   })

   signIn_button.addEventListener("click", (event)=>{
        if(validateLoginForm()){
          login();
        }
   })


   const login = () => {

    const loginData = {
      email: email_in.value,
      password: password_in.value
    };

    fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData),
      credentials: "include"  // 🔥 Required to save cookies in browser
    })
      .then(response => {
        if (!response.ok) throw new Error("Login failed");
        return response.json();
      })
      .then(data => {
        console.log("Login successful:", data);
        // Cookie will be automatically saved in the browser
        email_in.value = '';
        password_in.value = '';

        addToLocalStorage({
          email: data.data.userData.email,
          firstName: data.data.userData.firstName,
        })
  
        Already_Exist_Message.innerHTML = data.message;
        Already_Exist_Message.style.display = 'block';
  
        setTimeout(()=> {
          const spinner_element = document.getElementById("loadingSpinner1");
          spinner_element.style.display = 'block';
        }, 100);
  
        setTimeout( ()=> {
          // navigate()
          window.location.href = "../homepage/homepage.html";
        }, 1000);
      })
      .catch(error => {
        console.error("Error during login:", error);
      });


   }



     //signup

     const signup_button = document.getElementById("sign-up");
     const fname_up = document.getElementById("fname_up");
     const lname_up = document.getElementById("lname_up");
     const email_up = document.getElementById("email_up");
     const mobile_up = document.getElementById("mobile_up");
     const password_up = document.getElementById("password_up");


   const validateSignUpForm = () => {

    const email_test = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_test = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$!%*&_])[a-zA-Z0-9@#$!%*&]{8,}$/;

    

    if(fname_up.value === '' ){
         alert("name can't be blank");
         return false;
    } else if (email_up.value === ''){
         alert("email can't be blank");
         return false;
    }else if (!email_test.test(email_up.value)){
          alert("Invalid Email address");

          return false;
    } else if (password_up.value === '' ){
         alert("password can't be blank");
         return false;
    } else if (!password_test.test(password_up.value)){
        alert("password must contain 8 characters incuding atleast a digit an aphabet combination of upper and lower case")
        return false;
    } else {
      return true;
     }

   }

   password_up.addEventListener("keydown", (event) => {
    if(event.key === "Enter" && validateSignUpForm()){
        signUP(); 
    }
})

  signup_button.addEventListener("click", (event) => {
      if(validateSignUpForm()){
        signUP();
      }
  })


  function signUP() {
    const fname__up = fname_up.value;
    const lname__up = lname_up.value;
    const email__up = email_up.value; 
    const mobile__up = mobile_up.value; 
    const password__up = password_up.value;

    // addToLocalStorage({firstName: fname__up, lastName: lname__up, email: email__up, mobileNumber: mobile__up, Password: password__up});

    let user = {
      firstName: fname__up,
      lastName: lname__up,
      email: email__up,
      mobileNumber: mobile__up,
      password: password__up
    }

    fetch('/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer YOUR_TOKEN' // Optional, if auth is needed
  },
  body: JSON.stringify(user),
  credentials: 'include'
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
      // const loginuser = { Email: 'email_up', Password: 'password__up'};
      // sessionStorage.setItem('loginuser', JSON.stringify(loginuser));
  
  
      // Clear the input fields
      fname_up.value = '';
      lname_up.value = '';
      email_up.value = '';
      mobile_up.value = '';
      password_up.value = '';
  
      // Show the signup success message
      Already_Exist_Message.innerHTML = data.message;
      Already_Exist_Message.style.display = 'block';
  
      setTimeout(() => {
        const spinnerElement = document.getElementById('loadingSpinner2');
        spinnerElement.style.display = 'block';
      }, 100);
      
      setTimeout(() => {
        SignUp_Button.click();
      }, 1000);
})
.catch(error => {
  console.error('Error:', error);
});

   }
  }
)

const params = new URLSearchParams(window.location.search);

const signup = params.get('signup');

if(signup){
  SignUp_Button.click();
}



  