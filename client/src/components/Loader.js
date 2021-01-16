// @ts-nocheck
import { useState, useEffect } from "react";
import { ImSpinner } from "react-icons/im";

//Styles
import "../styles/Loader.scss";

//Helpers
import { useLoadingContext } from "../helpers/AppProvider";

const Loader = () => {
  const { isLoading } = useLoadingContext();

  return (
    isLoading && (
      <div className="loader-container">
        <ImSpinner />
      </div>
    )
  );
};

export default Loader;
