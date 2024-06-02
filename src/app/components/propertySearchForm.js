import React, { useState } from "react";
import Select from "react-select";
import { useRouter } from "next/router";

export const PropertySearchForm = ({ onSearch, areas }) => {
    const router = useRouter();

    // Form state
    const [forSale, setForSale] = useState(false);
    const [forRent, setForRent] = useState(false);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minBedrooms, setMinBedrooms] = useState("");
    const [maxBedrooms, setMaxBedrooms] = useState("");
    const [area, setArea] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({
            forSale,
            forRent,
            minPrice,
            maxPrice,
            minBedrooms,
            maxBedrooms,
            area,
        });
    };

    const handleReset = () => {
        router.push({
            pathname: "/",
            query: {},
        });
        setForRent(false);
        setForSale(false);
        setMaxPrice("");
        setMinPrice("");
        setMinBedrooms("");
        setMaxBedrooms("");
        setArea([]);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-wrap space-x-4 space-y-4 justify-center py-4"
        >
            <div className="flex items-center space-x-4 pt-4">
                <input
                    type="checkbox"
                    checked={forSale}
                    onChange={(e) => setForSale(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600" // Add this line
                />
                <label htmlFor="forSale" className="ml-2 text-gray-700">
                    For Sale
                </label>

            </div>
            <div className="flex items-center space-x-4">
                <input
                    type="checkbox"
                    checked={forRent}
                    onChange={(e) => setForRent(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600" // Add this line
                />
                <label htmlFor="forRent" className="ml-2 text-gray-700">
                    For Rent
                </label>

            </div>
            <div className="flex items-center space-x-2">
                <label htmlFor="minPrice">Min Price:</label>
                <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="border h-8"
                />
            </div>
            <div className="flex items-center space-x-2">
                <label htmlFor="maxPrice">Max Price:</label>
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="border h-8"
                />
            </div>
            <div className="flex items-center space-x-2">
                <label htmlFor="minBedrooms">Min Bedrooms:</label>
                <input
                    type="number"
                    value={minBedrooms}
                    onChange={(e) => setMinBedrooms(e.target.value)}
                    className="border h-8"
                />
            </div>
            <div className="flex items-center space-x-2">
                <label htmlFor="maxBedrooms">Max Bedrooms:</label>
                <input
                    type="number"
                    value={maxBedrooms}
                    onChange={(e) => setMaxBedrooms(e.target.value)}
                    className="border h-8"
                />
            </div>
            <div className="flex items-center space-x-2">
                <label htmlFor="area" className="text-right mr-3">
                    Area:
                </label>
                <Select
                    instanceId="area-select"
                    value={area.map((area) => ({ label: area, value: area }))} // Convert area array to an array of objects
                    onChange={(selectedOptions) => {
                        const selectedAreas = selectedOptions.map(
                            (option) => option.value
                        );
                        setArea(selectedAreas);
                    }}
                    options={areas.map((area) => ({
                        label: area,
                        value: area,
                    }))}
                    isMulti
                    className="min-w-[200px] z-50"
                />
            </div>
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Search
            </button>
            <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
                Reset Search
            </button>
        </form>
    );
};
