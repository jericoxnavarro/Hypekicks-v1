import React from "react";
import "../../sass/Searchhero.scss";

const Searchhero = () => {
  return (
    <main className="main-searchhero">
      <div className="container">
        <form className="search">
          <input
            className="search-input"
            placeholder="Search"
            type="text"
            name="search"
          />
          <button className="search-submit" type="submit" name="submit">
            <i class="fad fa-search"></i>
          </button>
        </form>
      </div>
    </main>
  );
};

export default Searchhero;
