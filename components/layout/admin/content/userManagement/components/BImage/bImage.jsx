function BImage({ label, src }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <label className="BLabel">{label}</label>
      <div className="BImage">
        {src && <img src={src} className="BImage__image" />}
        {!src && <p>No image found.</p>}
      </div>
    </div>
  );
}

export default BImage;
