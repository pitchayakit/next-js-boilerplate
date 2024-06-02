import "../app/globals.css";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { PropertyList } from "../app/components/propertyList.js";
import { PropertySearchForm } from "../app/components/propertySearchForm.js";
import { getProperties, getAreas } from "../app/services/property.service.js";
import { numberWithCommas } from "../app/utilities/convertor.js";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
    return {
        props: {
            properties: await getProperties(context.query),
            areas: await getAreas(),
        },
    };
}

export default function Properties({ properties, areas }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (searchParams) => {
        setIsLoading(true);

        router.push({
            pathname: "/",
            query: {
                ...searchParams,
                page: 1, // always go back to the first page when the form is submitted
            },
        }).then(() => setIsLoading(false));
    };

    const handlePageChange = ({ selected }) => {
        setIsLoading(true);

        router
            .push({
                pathname: "/",
                query: {
                    ...router.query,
                    page: selected + 1, // selected is zero-based
                },
            })
            .then(() => setIsLoading(false));
    };

    return (
        <div className="container mx-auto">
            <h1 className="font-bold text-center py-6 text-6xl">
                {numberWithCommas(properties.total)} Properties for sale and rent in Thailand
            </h1>

            <PropertySearchForm onSearch={handleSearch} areas={areas} />

            {isLoading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                </div>
            ) : (
                <PropertyList properties={properties} />
            )}

            <div className="my-4 flex justify-center">
                <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={properties.pages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={
                        "pagination flex list-none justify-center my-2 flex-wrap"
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
