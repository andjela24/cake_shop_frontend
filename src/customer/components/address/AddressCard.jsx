import React from "react";
import { useSelector } from "react-redux";

const AddressCard = ({ address }) => {
  const { auth } = useSelector((store) => store);
  const user = auth.user;

  return (
    <div className="p-5 border rounded-md">
      <div className="flex justify-between">
        {user ? (
          <>
            <div>
              <p className="font-semibold">Lični podaci</p>
              <p>{`${user.firstName} ${user.lastName}`}</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold">Kontakt</p>
              <p>{user.phoneNumber}</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="font-semibold">Adresa</p>
              <p>{`${address.streetAddress}, ${address.city} ${address.zipCode}`}</p>
            </div>
          </>
        ) : (
          <p>Nema informacija o korisniku</p>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
