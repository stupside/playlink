import { useEffect, useState } from "react";

import { useStorage } from "@plasmohq/storage/hook"


const IndexPopup = () => {

  const [manifests, setManifests] = useState<Set<string>>(new Set());

  const [m3u8] = useStorage("m3u8");

  useEffect(() => {

    setManifests(old => {

      return new Set([...old, m3u8]);
    });

  }, [m3u8, setManifests]);


  return (
    <div className="flex w-96 h-96">
      <h1>Medias</h1>
      <ul>
        {Array.from(manifests).map((manifest) => {
          return <li key={manifest}>{manifest}</li>
        })}
      </ul>
    </div>
  )
};

export default IndexPopup;
