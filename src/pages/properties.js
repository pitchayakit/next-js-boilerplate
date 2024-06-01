// pages/properties.js
import { useState } from "react";
import { useRouter } from "next/router";
import { getProperties } from '../app/services/property.service.js';

export async function getServerSideProps(context) {
    const properties = await getProperties(context.query);

    return { props: { properties: properties } };
}

export default function Properties({ properties }) {
  const router = useRouter();
  const [forSale, setForSale] = useState(false);
  const [forRent, setForRent] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");

  const handleSubmit = (e) => {
      e.preventDefault();

      // Refresh the page with new query parameters
      router.push({
          pathname: "/properties",
          query: {
              forSale,
              forRent,
              minPrice,
              maxPrice,
              minBedrooms,
              maxBedrooms,
              minArea,
              maxArea,
          },
      });
  };

  return (
      <div>
          <h1>Properties</h1>
          <form onSubmit={handleSubmit}>
              <label>
                  For Sale:
                  <input
                      type="checkbox"
                      checked={forSale}
                      onChange={(e) => setForSale(e.target.checked)}
                  />
              </label>
              <label>
                  For Rent:
                  <input
                      type="checkbox"
                      checked={forRent}
                      onChange={(e) => setForRent(e.target.checked)}
                  />
              </label>
              <label>
                  Min Price:
                  <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                  />
              </label>
              <label>
                  Max Price:
                  <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                  />
              </label>
              <label>
                  Min Bedrooms:
                  <input
                      type="number"
                      value={minBedrooms}
                      onChange={(e) => setMinBedrooms(e.target.value)}
                  />
              </label>
              <label>
                  Max Bedrooms:
                  <input
                      type="number"
                      value={maxBedrooms}
                      onChange={(e) => setMaxBedrooms(e.target.value)}
                  />
              </label>
              <label>
                  Min Area:
                  <input
                      type="number"
                      value={minArea}
                      onChange={(e) => setMinArea(e.target.value)}
                  />
              </label>
              <label>
                  Max Area:
                  <input
                      type="number"
                      value={maxArea}
                      onChange={(e) => setMaxArea(e.target.value)}
                  />
              </label>
              <button type="submit">Search</button>
          </form>
          {properties.map((property) => (
              <div key={property.id}>
                  <h2>{property.projectName}</h2>
                  <p>{property.shortTitle}</p>
                  <p>Price: {property.price}</p>
                  <p>Bedrooms: {property.bedroomCount}</p>
                  <p>Area: {property.area}</p>
              </div>
          ))}
      </div>
  );
}