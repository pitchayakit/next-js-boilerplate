import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import { numberWithCommas } from "../utilities/convertor.js";
 
export const PropertyList = ({ properties }) => {
    // Render property list...
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.data.map((property) => (
                <div key={property.id} className="border rounded-lg pb-4">
                    <Carousel showThumbs={false}>
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
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </Carousel>

                    <div className="p-4">
                        <h2 className="text-xl font-semibold">
                            {property.projectName}
                        </h2>
                        <p className="text-gray-700">{property.shortTitle}</p>
                        <p className="text-sm text-gray-500">
                            {property.shortDescription}
                        </p>
                        <p className="text-sm text-gray-500">
                            <span className="font-semibold">Area: </span>
                            {property.area}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <p className="border p-4 rounded-md flex justify-between items-center bg-gray-100">
                                For Sale / Rent:{" "}
                                <span className="font-bold">
                                    {property.forSale ? "Yes" : "No"} /{" "}
                                    {property.forRent ? "Yes" : "No"}
                                </span>
                            </p>
                            <p className="border p-4 rounded-md flex justify-between items-center bg-gray-100">
                                Price:{" "}
                                <span className="font-bold">
                                    {numberWithCommas(property.price)} ฿
                                </span>
                            </p>
                            <p className="border p-4 rounded-md flex justify-between items-center bg-gray-100">
                                Bedrooms:{" "}
                                <span className="font-bold">
                                    {property.bedroomCount}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
