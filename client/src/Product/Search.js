import React, {Fragment, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../component/MetaData';
import "./Search.css";

const Search = () => {

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
        navigate("/products");
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Product" />
      <form className="searchBox">
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" onClick={searchSubmitHandler} />
      </form>
    </Fragment>
  );
};

export default Search;