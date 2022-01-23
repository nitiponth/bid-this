import Image from "next/image";

function BImage({ label, src }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <label className="BLabel">{label}</label>
      <div className="BImage">
        {src && (
          <Image
            alt="image"
            src={src}
            width={300}
            height={300}
            objectFit="contain"
            className="BImage__image"
          />
        )}
        {!src && <p>No image found.</p>}
      </div>
    </div>
  );
}

export default BImage;
