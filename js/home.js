var current_location_marker,
		past_location_marker,
		iconStyles;

document.addEventListener("DOMContentLoaded", function() {
  init();
});

function init(){
	document.getElementById('login').addEventListener('click', login);
	document.getElementById('view_map').addEventListener('click', closeModal);
	document.getElementById('close_info').addEventListener('click', closeModal)

	document.getElementById('info_button').addEventListener('click', openModal);
	document.getElementById('login_button').addEventListener('click', openModal);

	initTime();
	initMapMarkers();
	initMap();
}

function closeModal(){
	document.querySelector('.visible').classList.remove('visible');
	document.querySelector('.selected').classList.remove('selected');
}

function openModal(e){
	e.target.classList.add('selected');
	var modal = e.target.dataset.target;
	document.getElementById(modal).classList.add('visible')
}

function initTime(){
	let init_d = new Date().toISOString();
	document.getElementById('datetime').innerHTML = init_d;
	setInterval(function(){
		let d = new Date().toISOString();
		document.getElementById('datetime').innerHTML = d;
	}, 1000)
}

function initMapMarkers(){
	iconStyles = {
		iconSize: [30, 50],
		iconAnchor: [15, 50],
		popupAnchor: [-3, -76]
	}

	current_location_marker = L.icon({
	    iconUrl: 'images/markers/marker-01.png',
	    iconSize: iconStyles.iconSize,
	    iconAnchor: iconStyles.iconAnchor,
	    popupAnchor: iconStyles.popupAnchor
	});

	past_location_marker = L.icon({
	    iconUrl: 'images/markers/marker-02.png',
	    iconSize: iconStyles.iconSize,
	    iconAnchor: iconStyles.iconAnchor,
	    popupAnchor: iconStyles.popupAnchor
	});
}

function initMap(){
	var map = L.map('map', {maxZoom: 15, minZoom: 2}).setView([30, -0.09], 2);
	L.marker([1.27, 103.83], {icon: current_location_marker}).addTo(map);

	// NYC

	var NYC = [
	 [40.785782, -73.957927],
	 [40.774802, -73.976454],
	 [40.72638272752525, -73.99766615455593],
	 [40.71907830158134, -73.95224986446817]
	]

	L.marker(NYC[0], {icon: past_location_marker}).addTo(map);
	L.marker(NYC[1], {icon: past_location_marker}).addTo(map);
	L.marker(NYC[2], {icon: past_location_marker}).addTo(map);
	L.marker(NYC[3], {icon: current_location_marker}).addTo(map);
	L.polyline(NYC, {color: 'red', weight: '3', dashArray: '4'}).addTo(map);


	// Houston
	var Houston = [
    [29.76, -95.36],
    [29.738720, -95.376780],
    [29.613630, -95.429570]
	];
	L.marker(Houston[0], {icon: past_location_marker}).addTo(map);
	L.marker(Houston[1], {icon: past_location_marker}).addTo(map);
	L.marker(Houston[2], {icon: current_location_marker}).addTo(map);
	L.polyline(Houston, {color: 'red', weight: '3', dashArray: '4'}).addTo(map);


	L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png', {
	    attribution: '© OpenStreetMap'
	}).addTo(map);
}