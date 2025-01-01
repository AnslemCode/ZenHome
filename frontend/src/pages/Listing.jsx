import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { useProperties } from "../hooks/useProperties";

const Listing = () => {
  const [filter, setFilter] = useState("");
  const { data, isError, isLoading } = useProperties();
  console.log(data, isError, isLoading);
  return (
    <main className="my-24">
      <div className="max-padd-container py-10 lg:py-24 bg-gradient-to-r via-white to-white">
        <div>
          <SearchBar filter={filter} setFilter={setFilter} />
          {/* CONTAINER */}
          <div></div>
        </div>
      </div>
    </main>
  );
};

export default Listing;
