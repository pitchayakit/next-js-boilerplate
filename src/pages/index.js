// pages/properties.js
import { useRouter } from "next/router";
import { getProperties, getAreas } from "../app/services/property.service.js";
import ReactPaginate from "react-paginate"
import { PropertySearchForm } from "../app/components/propertySearchForm.js";
import { PropertyList } from "../app/components/propertyList.js";
import "../app/globals.css";

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
    const numberFormat = new Intl.NumberFormat("en-US");


    const handleSearch = (searchParams) => {
      router.push({
          pathname: "/",
          query: {
              ...searchParams,
              page: 1, // always go back to the first page when the form is submitted
          },
      });
  };

    return (
        <div className="container mx-auto">
            <h1 className="font-bold text-center py-6 text-6xl">
                {numberFormat.format(properties.total)} Properties for sale and rent in Thailand
            </h1>

            <PropertySearchForm onSearch={handleSearch} areas={areas}/>

            <PropertyList properties={properties} />
            
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
                            pathname: "/",
                            query: {
                                ...router.query,
                                page: selected + 1,
                            },
                        })
                    }
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
