const OrderItem = ({ item }) => {
  const jwt = localStorage.getItem("jwt");

  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={item?.cake.imageUrl}
            alt={item?.cake.title}
            className="w-20 h-20 object-cover rounded-md"
          />
        </div>

        <div className="ml-5 space-y-1 space-x-2">
          <p className="font-semibold">{item?.cake.title}</p>
          <p>Spratnost: {item?.selectedTiers}</p>
          <p>Težina: {item?.selectedWeight} kg</p>
          <p className="opacity-70 mt-2">{item?.note}</p>
        </div>
        <div className="flex space-x-2 items-center pt-3">
          <p className="font-semibold opacity-50">{item?.totalPrice} RSD</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
