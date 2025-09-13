import React, { createContext, useContext, useEffect, useState } from "react";

const ScanContext = createContext();

export const useScan = () => useContext(ScanContext);

const ScanProvider = ({ children }) => {
  const [deviceIsMounted, setDeviceMounted] = useState(false);
  const [scanLoading, setScanLoading] = useState(false);
  const [isMatching, setIsMatching] = useState(true);
  const [uuid, setUuid] = useState(null);
  const [startButton, setStartButton] = useState(false);
  const [matching, setMatching] = useState({});

  const scanHost = import.meta.env.VITE_SCAN_HOST;
  const matchingHost = import.meta.env.VITE_MATCHING_HOST;

  const fetchDeviceStatus = async () => {
    try {
      const res = await fetch(`${scanHost}/status`);
      const data = await res.json();
      console.log(data);
      if (data.status !== "ok") {
        throw new Error("Device not connected");
      }
      setDeviceMounted(true);
    } catch {
      setDeviceMounted(false);
      console.log("Device not connected");
    }
  };

  useEffect(() => {
    fetchDeviceStatus();
  }, []);

  useEffect(() => {
    if (deviceIsMounted && startButton) {
      fetchScan();
    }
  }, [deviceIsMounted, startButton]);

  const fetchScan = async () => {
    try {
      const res = await fetch(`${scanHost}/scan`);
      const data = await res.json();
      console.log(data);
      if (data.status !== "ok") {
        throw new Error("Scan failed");
      }
      setScanLoading(false);
      setStartButton(false);
      setUuid(data.uuid);
    } catch {
      setScanLoading(false);
      console.log("Scan failed");
    }
  };

  useEffect(() => {
    const stopDevice = async () => {
      try {
        const res = await fetch(`${scanHost}/close`, { method: "GET" });
        const data = await res.json();
        if (data.status === "ok") {
          setScanLoading(false);
          setStartButton(false);
        }
      } catch (error) {
        console.error("Error stopping device:", error);
      }
    };

    const timeoutId = setTimeout(() => {
      stopDevice();
    }, 8000);

    return () => clearTimeout(timeoutId);
  }, [scanLoading]);

  async function pipeDownloadToUpload(uuid) {
    const downloadUrl = `${scanHost}/download?id=${uuid}`;
    const uploadUrl = matchingHost;

    const res = await fetch(downloadUrl);
    if (!res.ok) throw new Error(`download failed ${res.status}`);
    const blob = await res.blob();

    console.log("Downloaded blob:", blob);

    // Construct a File from the blob so servers see a filename + type
    const filename =
      getFilenameFromCD(res.headers.get("content-disposition")) || "image.BMP";

    const file = new File([blob], filename, {
      type: blob.type || "image/BMP",
    });

    const form = new FormData();
    form.append("file", file); // "file" is the field name the server expects
    // form.append("otherField", "value"); // add any extra fields

    const up = await fetch(uploadUrl, {
      method: "POST",
      body: form,
      // DO NOT set Content-Type manually; the browser sets multipart boundary.
    });
    console.log("Upload response: is being sent");

    if (!up.ok) throw new Error(`upload failed ${up.status}`);
    const upData = await up.json();
    if (!upData.success) throw new Error(`upload failed ${upData.message}`);
    setIsMatching(false);
    setMatching(upData);

    console.log("Upload response:", upData);
  }

  useEffect(() => {
    if (uuid) {
      setIsMatching(true);
      pipeDownloadToUpload(uuid);
    }
  }, [uuid]);

  return (
    <ScanContext.Provider
      value={{
        deviceIsMounted,
        scanLoading,
        uuid,
        isMatching,
        scanHost,
        matchingHost,
        startButton,
        matching,
        setDeviceMounted,
        setScanLoading,
        setIsMatching,
        setUuid,
        setStartButton,
        setMatching,
        fetchDeviceStatus,
        fetchScan,
        pipeDownloadToUpload,
      }}
    >
      {children}
    </ScanContext.Provider>
  );
};

export default ScanProvider;
