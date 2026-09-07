import React from "react";
import AuthPage from "../components/apogee/AuthPage";
import "./shader-frame.css";

export function Scene({ onEnter, isEmbedded = false }) {
  return (
    <div className={`shader-frame ${isEmbedded ? 'embed-mode' : ''}`}>
      <AuthPage onSuccess={onEnter} />
    </div>
  );
}

export default Scene;
