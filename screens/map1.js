import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

function Map({ center, zoom, locations }) {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: AIzaSyAN8Q4epYjfWXZ7SM_r2iTIJmGPOQNg41M }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {locations.map(location => (
          <Marker
            key={location.id}
            lat={location.latitude}
            lng={location.longitude}
            name={location.name}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}

function Marker({ name }) {
  return <div>{name}</div>;
}

function MyComponent() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      console.error('Geolocation is not supported.');
    }
  }, []);

  const center = { lat: latitude, lng: longitude };
  const zoom = 15;
  const locations = [{ id: 1, name: 'My Location', latitude, longitude }];

  return (
    <div>
      {latitude && longitude ? (
        <Map center={center} zoom={zoom} locations={locations} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyComponent;
