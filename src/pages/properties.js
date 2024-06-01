// pages/properties.js
import models from "../app/models/index.mjs";

const { Property } = models;

export async function getServerSideProps() {
  const properties = await Property.findAll();

  return { props: { properties: JSON.parse(JSON.stringify(properties)) } };
}

export default function Properties({ properties }) {
  return (
    <div>
      <h1>Properties</h1>
      {properties.map(property => (
        <div key={property.id}>
          <h2>{property.projectName}</h2>
          <p>{property.shortTitle}</p>
          {/* Render other property details... */}
        </div>
      ))}
    </div>
  );
}