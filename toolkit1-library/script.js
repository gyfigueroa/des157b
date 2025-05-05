(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([32.7157, -117.1611], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([32.7325386277481, -117.14922896797262]).addTo(map);

    var circle = L.circle([32.683499182054895, -117.18485851693389], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);

    var polygon = L.polygon([
        [32.7045378580818, -117.1584221671806],
        [32.71233587014459, -117.17025309047939],
        [32.726160456942665, -117.17130472810597],
        [32.71935902804935, -117.15526725430091]
    ]).addTo(map);

    marker.bindPopup("<b>Hello world!</b><br>I am Balboa Park.").openPopup();
    circle.bindPopup("I am Coronado Beach.");
    polygon.bindPopup("I am Downtown San Diego.");

    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }

    map.on('click', onMapClick);
    
}());