import { useState } from "react";

const IndexPopup = () => {

  const [medias, setMedias] = useState<Array<string>>([]);

  return (
    <div className="flex w-96 h-96">
      <h1>Medias</h1>
      <ul>
        {medias.map((media) => {
          return <li key={media}>{media}</li>
        })}
      </ul>
    </div>
  )
};

export default IndexPopup;
