"use client"
import { useState, CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loader = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#4D47C3");
  
    return (
      <div className="sweet-loading">
        <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
        <input value={color} onChange={(input) => setColor(input.target.value)} placeholder="Color of the loader" />
  
        <HashLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
}

export default Loader
