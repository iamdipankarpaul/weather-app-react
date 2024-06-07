import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import useWeatherContext from "../contexts/useWeatherContext";
import { placeFeatureCodes } from "../utils/constants";

export default function MapComponent() {
  const { cityDetails } = useWeatherContext();

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [featureCodeMeaning, setFeatureCodeMeaning] = useState(null);

  useEffect(() => {
    if (cityDetails) {
      setLat(cityDetails.latitude);
      setLon(cityDetails.longitude);

      const codeMeaning = placeFeatureCodes.find(
        (item) => item.code === cityDetails.feature_code
      );
      setFeatureCodeMeaning(codeMeaning.meaning);
    }
  }, [cityDetails]);

  if (!cityDetails) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4">
        {/* location info */}
        <div className="">
          <div className="stats stats-horizontal shadow w-full">
            <div className="stat">
              <div className="stat-title">City</div>
              <div className="stat-value">
                <span>{cityDetails.name}</span>
                <span>, </span>
                <span
                  className="lg:tooltip font-medium"
                  data-tip={featureCodeMeaning}
                >
                  <span className="text-sm">{cityDetails.feature_code}</span>
                </span>
              </div>
              <div className="max-lg:stat-desc">{featureCodeMeaning}</div>
            </div>

            <div className="stat">
              <div className="stat-title">State</div>
              <div className="stat-value">{cityDetails.admin1}</div>
            </div>

            <div className="stat">
              <div className="stat-title">Country</div>
              <div className="stat-value">
                <span>{cityDetails.country}</span>
                <span>, </span>
                <span className="text-sm font-medium">
                  {cityDetails.country_code}
                </span>
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Latitude</div>
              <div className="stat-value">{cityDetails.latitude}</div>
            </div>

            <div className="stat">
              <div className="stat-title">Longitude</div>
              <div className="stat-value">{cityDetails.longitude}</div>
            </div>

            <div className="stat">
              <div className="stat-title">Time Zone</div>
              <div className="stat-value">{cityDetails.timezone}</div>
            </div>
          </div>
        </div>

        {/* map grid */}
        <div
          id="map"
          className="col-span-2 min-h-[500px] w-full rounded-xl overflow-hidden"
        >
          {lat && lon && (
            <MapContainer
              className="h-full w-full"
              center={[lat, lon]}
              zoom={10}
              scrollWheelZoom={true} // Enable scroll wheel zoom
              touchZoom={false} // Disable touch zooming
              dragging={false} // Disable map dragging
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[lat, lon]}>
                <Popup>
                  <div>
                    <p>
                      <strong>Location: </strong>
                      {cityDetails.name}, {cityDetails.admin1},{" "}
                      {cityDetails.country}
                    </p>
                    <p>
                      <strong>Time Zone: </strong>
                      {cityDetails.timezone}
                    </p>
                    <p>
                      <strong>Latitude: </strong>
                      {cityDetails.latitude}
                    </p>
                    <p>
                      <strong>Longitude: </strong>
                      {cityDetails.longitude}
                    </p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
}
