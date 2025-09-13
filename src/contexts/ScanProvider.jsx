import React, { createContext, useContext, useEffect, useState } from "react";

const ScanContext = createContext();

const useScan = () => useContext(ScanContext);

const ScanProvider = ({ children }) => {
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deviceMounted, setDeviceMounted] = useState(false);
  const [deviceError, setDeviceError] = useState("");
  const [matchLoading, setMatchLoading] = useState(false);

  const [matchResult, setMatchResult] = useState(null);

  const [image, setImage] = useState(null);
  const scanHost = import.meta.env.VITE_SCAN_HOST;
  const matchingHost = import.meta.env.VITE_MATCHING_HOST;

  useEffect(() => {
    fetchDeviceStatus();
  }, []);

  const fetchDeviceStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${scanHost}/status`);
      const data = await res.json();
      setLoading(false);
      console.log(data);
    } catch {}
  };

  return (
    <ScanContext.Provider value={{ loading }}>{children}</ScanContext.Provider>
  );
};

export default ScanProvider;
