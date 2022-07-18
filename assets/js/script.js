var eventInputEl = document.querySelector('#eventname');
var eventContainerEl = document.querySelector('#event-container');
var searchEventEl = document.querySelector('#event-search')
var eventFormEl = document.querySelector("event-form")

var getEventNear = function() {
    var apiUrl = "https://api.seatgeek.com/2/events?geoip=98.213.245.205&range=12mi&client_id=Mjc4NjY0OTJ8MTY1Nzg0MTg4Ni44MzQwMTky";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
        response.json().then(function(data) {
            displayEvent(data);
        });
        }
    });
}

var displayEvent = function(searchEvent) {
    eventContainerEl.textContent = "";
    searchEventEl.textContent = searchEvent;

    
} 

var eventSubmitHandler = function(event) {
    var event = eventInputEl.value;
    if(event) {
        getEventNear(event);
        eventInputEl.value = "";
    }
}


//eventFormEl.addEventListener("submit", eventSubmitHandler);

//fetch(`https://api.seatgeek.com/2/events?geoip=98.213.245.205&range=12mi&client_id=Mjc4NjY0OTJ8MTY1Nzg0MTg4Ni44MzQwMTky`)
//.then(res => res.json())
//.then((data) => {
//  console.log(data);
//})
//.catch(err => console.log(err));



var displayDirections = function(origin,destination) {
    var apiStart="https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin="
    var key="&key=AIzaSyD977niwAg_ga4uwIxlClUPRMYJ9IcsNCA"
    var apiMiddle="&destination="
    // var origin = cityOrigin;
    // var destination = "Kernersville";
    var apiUrl=apiStart+origin+apiMiddle+destination+key;

    fetch(apiUrl).then(function(response){
        var directionsListEl= document.querySelector("#directionsList");
        var directionsLi=document.createElement("li");
        if(response.ok) {
            response.json().then(function(data){
                console.log(data);

                console.log(data.routes[0].legs[0].steps.length);
                for (var i=0; i<data.routes[0].legs[0].steps.length; i++) {            
                    console.log(data.routes[0].legs[0].steps[i].html_instructions);
                    directionsLi.innerHTML=data.routes[0].legs[0].steps[i].html_instructions;
                    directionsListEl.appendChild(directionsLi);
                }
                return directionsListEl;
            })
        } else {
            console.log("Not Working");
        }
    })
};

// Get the modal
var modal = document.getElementById("form-modal");

// Get the button that opens the modal
var locBtn = document.getElementById("locBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//get city by element
var modalCity = document.getElementById("modalCity");

//get the submit modal element
var submitModal = document.getElementsByClassName("submitModal")[0];

// When the user clicks on the button, open the modal
locBtn.addEventListener("click", function() {
  modal.style.display = "block";
  modalCity.value=""; //clears value of origin
});

// When the user clicks on <span>, close the modal
span.addEventListener("click", function() {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

submitModal.addEventListener("click", function() {
    origin=modalCity.value;
    destination="kernersville";
    if(modalCity){
        displayDirections(origin,destination)
        modal.style.display="none";
    }

});

  
//   // save button in modal was clicked
//   $("#form-modal .btn-save").click(function() {
//     // get form values
//     origin = $("#modalCity").val();
  
//     if (origin) {
//       displayDirections(origin,destination);
  
//       // close modal
//       $("#form-modal").modal("hide");
//     }
//   });