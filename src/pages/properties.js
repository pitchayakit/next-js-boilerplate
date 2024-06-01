// pages/properties.js
import { useState } from "react";
import { useRouter } from "next/router";
import { getProperties } from "../app/services/property.service.js";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../app/globals.css";
import Image from "next/image";
import ReactPaginate from "react-paginate";

export async function getServerSideProps(context) {
    const properties = await getProperties(context.query);

    return { props: { properties: properties } };
}

export default function Properties({ properties }) {
    const router = useRouter();
    const numberFormat = new Intl.NumberFormat("en-US");

    // Form state
    const [forSale, setForSale] = useState(false);
    const [forRent, setForRent] = useState(false);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minBedrooms, setMinBedrooms] = useState("");
    const [maxBedrooms, setMaxBedrooms] = useState("");

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
            <h1 className="font-bold text-center py-6 text-6xl">
                Properties for sale and rent in Thailand
            </h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-wrap space-x-4 space-y-2 justify-center"
            >
                <div className="flex items-center space-x-2 pt-2">
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
                        className="border"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <label htmlFor="maxPrice">Max Price:</label>
                    <input
                        id="maxPrice"
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="border"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <label htmlFor="minBedrooms">Min Bedrooms:</label>
                    <input
                        id="minBedrooms"
                        type="number"
                        value={minBedrooms}
                        onChange={(e) => setMinBedrooms(e.target.value)}
                        className="border"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <label htmlFor="maxBedrooms">Max Bedrooms:</label>
                    <input
                        id="maxBedrooms"
                        type="number"
                        value={maxBedrooms}
                        onChange={(e) => setMaxBedrooms(e.target.value)}
                        className="border"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Search
                </button>
            </form>

            <div className="flex justify-between">
                <p>Total Properties: {numberFormat.format(properties.total)}</p>
                <button
                    onClick={() =>
                        router.push({
                            pathname: "/properties",
                            query: {},
                        })
                    }
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                    Clear Search
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {properties.data.map((property) => (
                    <div
                        key={property.id}
                        className="border p-4 rounded-lg space-y-4"
                    >
                        <Carousel>
                            {property.imageGallery.map((image, index) => (
                                <div key={index}>
                                    <Image
                                        key={index}
                                        src={image}
                                        width={300}
                                        height={200}
                                        alt={`Property ${property.id} Image ${
                                            index + 1
                                        }`}
                                        className="w-full h-64 object-cover rounded-t-lg"
                                    />
                                </div>
                            ))}
                        </Carousel>
                        <h2 className="text-xl font-semibold">
                            {property.projectName}
                        </h2>
                        <p className="text-gray-700">{property.shortTitle}</p>
                        <p className="text-sm text-gray-500">
                            {property.shortDescription}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <p className="border p-4 rounded-md flex justify-between items-center bg-gray-100">
                                For Rent:{" "}
                                <span className="font-bold">
                                    {property.forRent ? "Yes" : "No"}
                                </span>
                            </p>
                            <p className="border p-4 rounded-md flex justify-between items-center bg-gray-100">
                                For Sale:{" "}
                                <span className="font-bold">
                                    {property.forSale ? "Yes" : "No"}
                                </span>
                            </p>
                            <p className="border p-4 rounded-md flex justify-between items-center bg-gray-100">
                                Price:{" "}
                                <span className="font-bold">
                                    {property.price}
                                </span>
                            </p>
                            <p className="border p-4 rounded-md flex justify-between items-center bg-gray-100">
                                Bedrooms:{" "}
                                <span className="font-bold">
                                    {property.bedroomCount}
                                </span>
                            </p>
                            <p className="border p-4 rounded-md flex justify-between items-center bg-gray-100">
                                Area:{" "}
                                <span className="font-bold">
                                    {property.area}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="my-4 flex justify-center">
                <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={properties.pages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={({ selected }) =>
                        router.push({
                            pathname: "/properties",
                            query: {
                                ...router.query,
                                page: selected + 1,
                            },
                        })
                    }
                    containerClassName={
                        "pagination flex list-none justify-center my-2"
                    }
                    subContainerClassName={"pages pagination"}
                    activeClassName={"border-blue-500 text-blue-500"}
                    pageClassName={"mx-1"}
                    pageLinkClassName={
                        "px-3 py-1 block border border-transparent rounded transition-all duration-200"
                    }
                    pageLinkClassNameActive={"border-blue-500 text-blue-500"}
                    pageLinkClassNameHover={"border-blue-500 text-blue-500"}
                    previousLinkClassName={
                        "px-3 py-1 block border border-transparent rounded transition-all duration-200"
                    }
                    nextLinkClassName={
                        "px-3 py-1 block border border-transparent rounded transition-all duration-200"
                    }
                />
            </div>
        </div>
    );
}
