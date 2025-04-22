"use client"
import { useState, CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loader = (props: any) => {
  let [color, setColor] = useState(props.color ? props.color: "#fff");

  return (
    <div className="sweet-loading">
      <HashLoader
        color={color}
        loading={true}
        cssOverride={override}
        size={props.size? props.size : 25}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {/*  0118D8 */}
    </div>
  );
}

export default Loader
