import axios from "axios";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import useServiceDetail from "../../../hooks/useServiceDetail";

const Checkout = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetail(serviceId);
  const [user] = useAuthState(auth);

  // const [user, setUser] = useState({
  //   name: "Akbar the losser",
  //   email: "akbar@aali.com",
  //   address: "Mohammodpur dhaka",
  //   phone: "014444444444",
  // });

  // const handleAddressChange = event => {
  //   console.log(event.target.value);
  //   const { address, ...rest } = user;
  //   const newAddress = event.target.value;
  //   const newUser = { address: newAddress, ...rest };
  //   setUser(newUser);
  //   console.log(newUser);
  // };

  const handlePlaceOrder = event => {
    event.preventDefault();
    const order = {
      email: user.email,
      name: user.displayName,
      service: service.name,
      serviceId: serviceId,
      address: event.target.address.value,
      phone: event.target.phone.value,
    };
    axios
      .post("https://salty-inlet-69644.herokuapp.com/order", order)
      .then(response => {
        const { data } = response;
        if (data.insertedId) toast("Your order is booked");
        event.target.reset();
      });
  };

  return (
    <div className="w-50 mx-auto">
      <h2>Please Order: {service.name}</h2>
      <form onSubmit={handlePlaceOrder}>
        <input
          type="text"
          value={user?.displayName}
          className="w-100 mb-2"
          name="name"
          placeholder="Name"
          required
          disabled
        />
        <br />
        <input
          type="email"
          value={user?.email}
          className="w-100 mb-2"
          name="email"
          placeholder="Your email"
          required
          readOnly
          disabled
        />
        <br />
        <input
          type="text"
          className="w-100 mb-2"
          value={service.name}
          name="service"
          placeholder="service"
          required
          readOnly
        />
        <br />
        <input
          type="text"
          className="w-100 mb-2"
          name="address"
          placeholder="address"
          required
        />
        <br />
        <input
          type="text"
          className="w-100 mb-2"
          name="phone"
          placeholder="phone"
          required
        />
        <br />
        <input className="btn btn-primary" type="submit" value="Place Order" />
      </form>
    </div>
  );
};

export default Checkout;
