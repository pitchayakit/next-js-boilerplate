// pages/properties.js
import { useState } from "react";
import { useRouter } from "next/router";
import { getProperties } from "../app/services/property.service.js";
import "../app/globals.css";

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
                page: 1, // always go back to the first page when the form is submitted
            },
        });
    };

    return (
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Properties</h1>
        <form onSubmit={handleSubmit} className="flex flex-wrap space-y-4">
          <div className="flex items-center space-x-2">
            <input
              id="forSale"
              type="checkbox"
              checked={forSale}
              onChange={(e) => setForSale(e.target.checked)}
            />
            <label htmlFor="forSale">For Sale</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="forRent"
              type="checkbox"
              checked={forRent}
              onChange={(e) => setForRent(e.target.checked)}
            />
            <label htmlFor="forRent">For Rent</label>
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="minPrice">Min Price:</label>
            <input
              id="minPrice"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="maxPrice">Max Price:</label>
            <input
              id="maxPrice"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="minBedrooms">Min Bedrooms:</label>
            <input
              id="minBedrooms"
              type="number"
              value={minBedrooms}
              onChange={(e) => setMinBedrooms(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="maxBedrooms">Max Bedrooms:</label>
            <input
              id="maxBedrooms"
              type="number"
              value={maxBedrooms}
              onChange={(e) => setMaxBedrooms(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="minArea">Min Area:</label>
            <input
              id="minArea"
              type="number"
              value={minArea}
              onChange={(e) => setMinArea(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="maxArea">Max Area:</label>
            <input
              id="maxArea"
              type="number"
              value={maxArea}
              onChange={(e) => setMaxArea(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Search
          </button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {properties.map((property) => (
            <div key={property.id} className="border p-4 rounded-md">
              <h2 className="text-lg font-bold">{property.projectName}</h2>
              <p>{property.shortTitle}</p>
              <p>Price: {property.price}</p>
              <p>Bedrooms: {property.bedroomCount}</p>
              <p>Area: {property.area}</p>

              <div className="grid grid-cols-3 gap-4">
                {property.imageGallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Property ${property.id} Image ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={() =>
              router.push({
                pathname: "/properties",
                query: {
                  ...router.query,
                  page: Number(router.query.page) - 1,
                },
              })
            }
            disabled={router.query.page <= 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Previous
          </button>
          <button
            onClick={() =>
              router.push({
                pathname: "/properties",
                query: {
                  ...router.query,
                  page: Number(router.query.page) + 1,
                },
              })
            }
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    );
}
