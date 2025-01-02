import { useState, useContext } from "react";
import SearchBar from "../components/SearchBar";
import useProperties from "../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import Item from "../components/Item";
import userDetailContext from "../context/UserDetailContext";

const Favourites = () => {
  const [filter, setFilter] = useState("");
  const { data, isError, isLoading } = useProperties();
  const {
    userDetail: { favourites },
  } = useContext(userDetailContext);
  if (isError)
    return (
      <div>
        <span>Error while fetching data</span>
      </div>
    );

  if (isLoading) {
    return (
      <div className="h-64 flexCenter">
        <PuffLoader
          height={80}
          width={80}
          radius={1}
          color="#36d7b7"
          aria-label="Puff-loading"
        />
      </div>
    );
  }

  return (
    <main className="my-24">
      <div className="max-padd-container py-10 bg-gradient-to-r from-primary via-white to-white">
        <div>
          <SearchBar filter={filter} setFilter={setFilter} />
          {/* CONTAINER */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
            {data
              .filter((property) => favourites.includes(property._id))
              .filter(
                (property) =>
                  property.title.toLowerCase().includes(filter.toLowerCase()) ||
                  property.city.toLowerCase().includes(filter.toLowerCase()) ||
                  property.country.toLowerCase().includes(filter.toLowerCase())
              )
              .map((property) => {
                return <Item key={property._id} property={property} />;
              })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Favourites;
