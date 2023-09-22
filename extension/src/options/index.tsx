import { BrowserQRCodeReader, type IScannerControls } from "@zxing/browser";
import { createRef, useCallback, useEffect, useMemo, useState } from "react";

const IndexOptions = () => {

  const ref = createRef<HTMLVideoElement>();

  const [index, setIndex] = useState<number>(0);
  const [devices, setDevices] = useState<Array<MediaDeviceInfo>>([]);

  const device = useMemo(() => devices[index] ? devices[index] : null, [devices, index]);

  const [controls, setControls] = useState<IScannerControls>();

  useEffect(() => {
    BrowserQRCodeReader.listVideoInputDevices().then(setDevices);
  }, [setDevices]);

  return (
    <div className="flex w-96 h-96">
      <h1>
        Options
      </h1>
      <select>
        {devices.map((device, index) => {
          return <option key={device.deviceId} onClick={() => {
            setIndex(index);
          }}>{device.label}</option>
        })}
      </select>
      <button onClick={() => {

        const reader = new BrowserQRCodeReader();

        const { deviceId } = devices[index];

        reader.decodeFromVideoDevice(deviceId, ref.current, (result, _, controls) => {

          if (result) {

            setControls(null);

            controls.stop();
          }

        }).then(setControls);
      }}>
        Scan with {device?.label}
      </button>
      <video ref={ref}></video>
    </div>
  )
}

export default IndexOptions;
