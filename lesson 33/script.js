let start = document.getElementById("start");
let end = document.getElementById("end");



function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(document.querySelector(".map"), {
    zoom: 6.5,
    center: { lat: 48.67103125605921, lng: 32.21031920233333 },
  });
  directionsRenderer.setMap(map);

  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };

  let directions = document.getElementById("directions")
  directions.addEventListener("click", function () {
      onChangeHandler()
  })
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService.route(
    {
      origin: {
        query: start.value,
      },
      destination: {
        query: end.value,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}