/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/danish74/ckl0mxi9w0p0w17s07wo9l9so',
    scrollZoom: false,
    boxZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add the marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extends map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 250,
      left: 100,
      right: 100,
    },
  });
};
