// components/Loader/loader.jsx
import React from 'react';
import '../../components/Loader/Loader.css';


const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="spinner"> {/* Is div par neonGlow animation lagegi */}
          <img
            src="/white.png"
            alt="Logo"
            width={100}
            height={100}
            draggable={false}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;