import React from "react";

import lock from "../../../images/lock.jpg";

const NotFound = () => {
  return (
    <div>
      <h2 className="text-primary text-center">Wrong Gateway</h2>
      <img className="w-100" src={lock} alt="" />
    </div>
  );
};

export default NotFound;
