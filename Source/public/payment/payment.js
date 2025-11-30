const user = new URLSearchParams(window.location.search);
const Username = user.get('name');
const vehicleType = user.get('vehicleType');
const mobileNumber = user.get('mobileNumber');
const buttonId = user.get('buttonId');
const data = JSON.parse(localStorage.getItem('data'));
const email = data.email;
const complexName = user.get('complexName');

function price(){
    if(vehicleType === 'Non-Electronic Vehicles'){
        return 50;
    } else if(vehicleType === 'Electronic Vehicles'){
        return 50;
    } else if(vehicleType === 'Electronic Vehicles   Charging'){
        return 70;
    } else if(vehicleType === 'Two Wheller Vehicles'){
        return 30;
    }
    
}

const dateInput = document.getElementById('parking-date');
const today = new Date();

// Get today's date in YYYY-MM-DD format
const todayStr = today.toISOString().split('T')[0];

// Get date 30 days from today
const maxDate = new Date();
maxDate.setDate(today.getDate() + 30);
const maxDateStr = maxDate.toISOString().split('T')[0];

// Set the min and max attributes
dateInput.setAttribute('min', todayStr);
dateInput.setAttribute('max', maxDateStr);

// Handle form submission
const form = document.getElementById('parking-form');
form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Get form values
    const parkingDate = document.getElementById('parking-date').value;

    // Hide the booking form and show the booking details
    document.getElementById('booking-form').style.display = 'none';
    document.getElementById('booking-details').style.display = 'block';
    document.getElementById('booking-pdf').style.display = 'none';

    // Populate booking details
    document.getElementById('details-name').textContent = `Name: ${Username}`;
    document.getElementById('details-date').textContent = `Date: ${parkingDate}`;
    document.getElementById('details-time').textContent = `Time: 10:00 AM to 10:00 PM`;
    document.getElementById('details-price').textContent = `Price: ₹${price()}`;
});

// Reset form to edit booking
function resetForm() {
    document.getElementById('booking-form').style.display = 'block';
    document.getElementById('booking-details').style.display = 'none';
}


async function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function createCustomer(customerData) {
    try {
      const response = await fetch("/ticket/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(customerData),
        credentials: 'include'
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Failed to create customer");
      }
  
      console.log("Customer created:", result);
      return result;
    } catch (error) {
      console.error("Error creating customer:", error);
      throw error;
    }
  }
  

async function displayRazorpay() {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    const data = {
        amount: price() * 100,
        receipt: `PS${Username}${Date.now()}`,
    }

    const response = await fetch("/payment/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data), // Include this if you want to send data
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      
    console.log(result);

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    console.log(result)
    const { amount, id: order_id, currency } = result;

    const options = {
        key: "rzp_test_TVzSzjIN4DLAms", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: Username,
        description: "Parking site Transactions",
        // image: { logo },
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            const successResponse = await fetch("/payment/success", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });
              
            if (!successResponse.ok) {
                throw new Error(`HTTP error! status: ${successResponse.status}`);
            }
              
            const result = await successResponse.json();

            const user = {
                            Name: Username,
                            Email: email,
                            vehicleType: vehicleType,
                            complexName: complexName,
                            ButtonId: buttonId,
                            PaymentId : data.razorpayPaymentId,
                            Booking_Date: todayStr,
                            Price: price()
                        }
            
            
            createCustomer(user);
            afterPayment(buttonId, data.razorpayPaymentId);
            console.log(result);
              
        },
        prefill: {
            Name: Username,
            Email: email,
            contact: mobileNumber,
        },
        notes: {
            vehicleType: vehicleType,
            buttonId: buttonId,
            Book_For: complexName
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}



document.getElementById('rzp-button1').onclick = function(e) {
    // rzp1.open();
    e.preventDefault();
    displayRazorpay();
}

function afterPayment(buttonId, paymentId){

    setTimeout(()=>{
        downloadPDF();
    },1000)

    let count = 10;
    
        const intervalId = setInterval(() => {
            document.getElementById('homepage').innerHTML = `Homepage ${count}`;
            count--;
    
            if (count < 0) {
                clearInterval(intervalId);
                window.location.href = '../homepage/homepage.html';
            }
        }, 1000); 

    const parkingDate = document.getElementById('parking-date').value;

    document.getElementById('booking-form').style.display = 'none';
    document.getElementById('booking-details').style.display = 'none';
    document.getElementById('booking-pdf').style.display = `block`;

    document.getElementById('booking-name').textContent = `Name: ${Username}`;
    document.getElementById('booking-email').textContent = `Email: ${email}`;
    document.getElementById('booking-id').textContent = `Payment Id: ${paymentId}`;
    document.getElementById('booking-complex').textContent = `Booking For : ${complexName} Complex`;
    document.getElementById('booking-slot').textContent = `Slot No: ${buttonId}`;
    document.getElementById('booking-date').textContent = `Parking Date: ${parkingDate}`;
    document.getElementById('booking-phoneNo').textContent = `Phone No: +${mobileNumber}`;
    document.getElementById('booking-vehicle').textContent = `Vehicle Type: ${vehicleType}`;
    document.getElementById('booking-price').textContent = `Price: ₹${price()}`;
    document.getElementById('booking-signature').textContent = `Digitally signed by parking.in ${todayStr}`;

}

function downloadPDF() {
    const element = document.getElementById('content');
    const options = {
      margin:       1,
      filename:     'booking_details.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    // Generate PDF from the specified element
    html2pdf().set(options).from(element).save();
  }
  

//   window.onload = downloadPDF;
//   if(document.getElementById('booking-pdf').style.display === `block`){
//     downloadPDF();
//   }