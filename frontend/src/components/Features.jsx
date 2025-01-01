// import { FaListAlt } from "react-icons/fa";
import { AiOutlineFileSearch } from "react-icons/ai";
import { IoBookmarkOutline, IoTicketOutline } from "react-icons/io5";
import { RiFileList3Line } from "react-icons/ri";
const Features = () => {
  return (
    <section className="max-padd-container py-10 bg-white">
      <div className="max-padd-container flexBetween flex-wrap gap-8">
        <div className="flex items-center gap-x-3">
          <RiFileList3Line className="text-4xl" />
          <h4 className="medium-18">Detailed Listings</h4>
        </div>
        <div className="flex items-center gap-x-3">
          <AiOutlineFileSearch className="text-4xl" />
          <h4 className="medium-18">Property Search</h4>
        </div>
        <div className="flex items-center gap-x-3">
          <IoBookmarkOutline className="text-4xl" />
          <h4 className="medium-18">Saved Favourites</h4>
        </div>
        <div className="flex items-center gap-x-3">
          <IoTicketOutline className="text-4xl relative bottom-1" />
          <h4 className="medium-18">Book Visits</h4>
        </div>
      </div>
    </section>
  );
};

export default Features;