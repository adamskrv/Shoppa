"use client";
import React, { useCallback, useState } from "react";
import {
  faCircle,
  faArrowCircleLeft,
  faArrowCircleRight,
  faCartPlus,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// function debounce<T extends (...args: any[]) => void>(
//   func: T,
//   delay: number
// ): (...args: Parameters<T>) => void {
//   let timer: ReturnType<typeof setTimeout>;
//   return function (...args: Parameters<T>) {
//     clearTimeout(timer);
//     timer = setTimeout(() => func(...args), delay);
//   };
// }

const HomePage = () => {
  const [newItems, setNewItems] = useState([
    {
      id: 1,
      itemName: "item Name ",
      price: 300,
      quantity: 1,
      isSelected: false,
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [priceInputValue, setPriceInputValue] = useState("");

  const handleAddBtnClick = () => {
    const newItemValue = {
      id: newItems.length ? newItems[newItems.length - 1].id + 1 : 1,
      itemName: inputValue,
      price: parseFloat(priceInputValue),
      quantity: 1,
      isSelected: false,
    };

    const newItemArray = [...newItems, newItemValue];

    setNewItems(newItemArray);
    setInputValue("");
    setPriceInputValue("");
  };

  const deleteItemHandler = (index: number) => {
    const newItemArray = [...newItems];
    newItemArray.splice(index, 1);
    setNewItems(newItemArray);
  };

  const incrementQuantityAndPrice = useCallback(
    (index: number) => {
      console.log("Incrementing item at index:", index);

      const newItemArray = [...newItems];
      const unitPrice =
        newItemArray[index].price / newItemArray[index].quantity;
      newItemArray[index].quantity += 1;
      newItemArray[index].price = unitPrice * newItemArray[index].quantity;
      console.log("New item array after increment:", newItemArray);
      console.log(newItemArray);

      setNewItems(newItemArray);
    },
    [newItems]
  );

  const handleQuantityDecrease = useCallback(
    (index: number) => {
      console.log("Decrementing item at index:", index);

      const newItemArray = [...newItems];
      if (newItemArray[index].quantity > 1) {
        const unitPrice =
          newItemArray[index].price / newItemArray[index].quantity;
        newItemArray[index].quantity--;
        newItemArray[index].price = unitPrice * newItemArray[index].quantity;
      }
      console.log("New item array after decrement:", newItemArray);

      setNewItems(newItemArray);
    },
    [newItems]
  );

  const calculateTotalPrice = () => {
    return newItems.reduce((total, item) => total + item.price, 0).toLocaleString();
  };

  return (
    <div className="flex flex-col align-middle ">
      <h1 className="text-3xl font-bold m-10 ">
        Welcome to <span className="text-green-600 text-5xl">Shoppa </span> 😁🥗
      </h1>
      <div className="flex flex-col justify-start p-2 lg:p-10 h-170 w-full bg-green-700 rounded shadow-lg">
        <h3 className="flex justify-center text-lg sm:text-2xl text-white p-4">
          Create your shopping list 🛒
        </h3>
        <div className="flex items-center justify-between shadow-lg w-full px-5">
          <input
            className="p-2 gap-5 rounded w-full"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add an Item"
          />
          <input
            className="p-2 ml-4 gap-5 rounded w-full max-w-sm"
            type="number"
            min={50}
            max={100000}
            value={priceInputValue}
            onChange={(e) => setPriceInputValue(e.target.value)}
            placeholder="amount"
          />
          <FontAwesomeIcon
            onClick={handleAddBtnClick}
            icon={faCartPlus}
            color="white"
            className="size-8 m-4 hover:cursor-pointer"
          />
        </div>

        {/* item list */}
        {newItems.map((newItem, index) => (
          <div className="flex flex-col " key={newItem.id}>
            <div className="grid grid-cols-3 gap-4 items-center  mt-8">
              {/* item name and price */}
              <div className="flex flex-row items-center gap-2">
                <FontAwesomeIcon
                  icon={faCircle}
                  color="white"
                  className="size-4 "
                />
                <span className=" text-white text-xl px-2">
                  {newItem.itemName}
                </span>
              </div>
              <div className="px-2">
                <span className=" text-white text-xl ">
                  {newItem.price.toLocaleString()}
                </span>
              </div>
              {/* div for quantity increment */}
              <div className="flex flex-row items-center justify-start ">
                <FontAwesomeIcon
                  onClick={() => handleQuantityDecrease(index)}
                  icon={faArrowCircleLeft}
                  color="white"
                  className="size-4 sm:size-6 m-2 hover:cursor-pointer"
                />
                <span className="text-white text-xl">{newItem.quantity}</span>
                <FontAwesomeIcon
                  onClick={() => incrementQuantityAndPrice(index)}
                  icon={faArrowCircleRight}
                  color="white"
                  className="size-4 sm:size-6 m-2 hover:cursor-pointer"
                />
                <FontAwesomeIcon
                  onClick={() => deleteItemHandler(index)}
                  icon={faDeleteLeft}
                  color="orange"
                  className="size-4 ml-2 hover:cursor-pointer"
                />
              </div>
            </div>
            <div>
              <hr className="my-1 bg-green-400 h-0.5 border-none" />
            </div>
          </div>
        ))}

        {/* total and share button */}
        <div className="flex flex-row items-center justify-between mt-5">
          <div className="text-white text-xl sm:text-3xl font-bold">Total:</div>
          <div className="text-white text-xl sm:text-3xl font-bold">
            ₦{calculateTotalPrice()}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-10 gap-4">
        <select name="Select Vendor" id="vendors" className="h-10 w-40 bg-green-300 border-solid rounded-lg p-2">
          <option value="Select Vendor">select vendor</option>
          <option value="supreme">supreme</option>
          <option value="comfort's food enterprise">
            comforts food enterprise
          </option>
          <option value="onward supermarket">Onward Supermarket</option>
        </select>
        <button className="bg-green-700 w-40 h-10 rounded text-white text-2xl">
          Purchase
        </button>
      </div>
    </div>
  );
};

export default HomePage;
