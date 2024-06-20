import React from "react";
import { useSelector } from "react-redux";

const AddressCard = ({ address }) => {
  const { auth } = useSelector((store) => store);
  const user = auth.user;

  console.log("Adresa", address);
  console.log("Korisnik", user);

  return (
    <div>
      <div className="space-y-3">
        {user ? (
          <>
         <p className="font-semibold">Lični podaci</p>
            <p>{`${user.firstName} ${user.lastName}`}</p>
            <p className="font-semibold">Adresa</p>
            <p>
              {`${address.streetAddress}, ${address.city} ${address.zipCode}`}
            </p>
            <div className="space-y-1">
              <p className="font-semibold">Kontakt</p>
              <p>{user.phoneNumber}</p>
              <p>{user.email}</p>
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
