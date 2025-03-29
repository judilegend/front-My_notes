import React from "react";
import "./contentStyle.css";
function ContentHome() {
  return (
    <section className="w-full mx-auto">
      <div className="e-card playing">
        <div className="image">
          <img
            src="src/assets/image/abstract1.png"
            width={200}
            alt="abstract1"
            className="abstract1"
          />
          <img
            src="src/assets/image/abstract2.png"
            width={200}
            alt="abstract2"
            className="abstract2"
          />
        </div>
        {/* <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div> */}
      </div>
    </section>
  );
}

export default ContentHome;
