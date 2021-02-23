let map;
const Brooklyn = { lat: 40.653345030602, lng: -73.901235640353 };

function initMap() {
    const map = new google.maps.Map(document.querySelector('.map'), {
        mapId: "879dd8bcad3ac6a1",
        zoom: 12.6,
        center: Brooklyn,
        disableDefaultUI: true,
    });

    const image = "img/Ellipse-11-HQ.png";
    new google.maps.Marker({
        position: { lat: 40.67821508178604, lng: -73.89960489934165 },
        map,
        icon: image,
    });
}

// let selector = document.getElementById("email");

// $(document).ready(function () {
//     //email mask
//     $(selector).inputmask({
//         mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
//         greedy: false,
//         onBeforePaste: function (pastedValue, opts) {
//             pastedValue = pastedValue.toLowerCase();
//             return pastedValue.replace("mailto:", "");
//         },
//         definitions: {
//             '*': {
//                 validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
//                 casing: "lower"
//             }
//         }
//     })
// });

function submit() {
    let name = document.getElementById('name'),
        email = document.getElementById('email');

    
    window.localStorage.setItem('name', name.value);
    window.localStorage.setItem('e-mail', email.value);

    name.value = '';
    email.value = '';
}

