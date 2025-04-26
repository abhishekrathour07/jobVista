"use client"
import { CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

type Loadertypes = {
  color?: string,
  size?: number
}
const Loader: React.FC<Loadertypes> = ({ color, size }) => {
  const colorValue = color || "#fff"
  return (
    <div className="sweet-loading">
      <HashLoader
        color={colorValue}
        loading={true}
        cssOverride={override}
        size={size ? size : 25}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {/*  0118D8 */}
    </div>
  );
}

export default Loader
