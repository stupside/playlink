import "./style.css";

const IndexNewtab = ({ children }) => {

  return (
    <div className="flex w-96 h-96">
      <h1>
        New tab
        {children}
      </h1>
    </div>
  )
}

export default IndexNewtab;
