import React from "react";

const AddressCard = ({address}) => {
  console.log("Adresa", address);
  return (
    <div>
      {/* <h1 className="text-lg font-semibold py-4">Delivery Adress</h1> */}
      <div className="space-y-3">
        <p className="font-semibold">{`${address?.user?.firstName} ${address?.user?.lastName}`}</p>
        <p className="font-semibold">Adresa</p>
        <p>
          {`${address?.streetAddress},  ${address?.city} ${address?.zipCode}`}
        </p>

        <div className="space-y-1">
          <p className="font-semibold">Phone Number</p>
          <p>{address?.mobile}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
