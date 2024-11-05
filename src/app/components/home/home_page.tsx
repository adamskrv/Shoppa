"use client";
import React, { useCallback, useState } from "react";
import {
  faCircle,
  faMinus,
  faAdd,
  faTrash,
  faCartPlus,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
interface Item {
  id: number;
  itemName: string;
  price: number;
  quantity: number;
  isSelected: boolean;
}
const HomePage = () => {
  const [newItems, setNewItems] = useState<Item[]>([]);

  const [inputValue, setInputValue] = useState("");
  const [priceInputValue, setPriceInputValue] = useState("");

  const handleAddBtnClick = () => {
    if (
      !inputValue.trim() ||
      !priceInputValue.trim() ||
      isNaN(parseFloat(priceInputValue)) ||
      parseFloat(priceInputValue) <= 0
    ) {
      // If input value or price input value is empty, or price is not a valid number, do nothing
      return;
    }
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
    return newItems
      .reduce((total, item) => total + item.price, 0)
      .toLocaleString();
  };

  return (
    <div className="flex flex-col align-middle text-dark w-full">
      <div className="flex justify-center bg-white md:bg-transparent">
        <h1 className="text-3xl font-bold m-10 ">
          Welcome to <span className="text-green-600 text-5xl">Shoppa </span>{" "}
          😁🥗
        </h1>
      </div>
      <div className="flex flex-col justify-start p-2 lg:p-10 h-170 w-full bg-white/25 backdrop-blur-md rounded shadow-lg">
        <h3 className="flex justify-center text-lg sm:text-2xl text-dark p-4">
          Create your shopping list 🛒
        </h3>
        <div className="flex flex-col md:flex-row gap-2 justify-center items-center md:justify-between shadow-md w-full px-5 pb-4">
          <input
            required
            className="text-[24px] p-2 gap-5 rounded-md w-full border-[1px] border-gray-500 bg-transparent"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Item name"
          />
          <input
            required
            className="text-[24px] p-2 md:ml-4 gap-5 rounded w-full max-w-sm border-[1px] border-gray-500 bg-transparent"
            type="number"
            min={50}
            max={100000}
            value={priceInputValue}
            onChange={(e) => setPriceInputValue(e.target.value)}
            placeholder="amount"
          />
          <div
            className="flex items-center mx-3 bg-green-600 p-2 rounded-md"
            onClick={handleAddBtnClick}
          >
            <FontAwesomeIcon
              icon={faCartPlus}
              color="white"
              className="size-8 md:mr-4 hover:cursor-pointer"
            />
            <p className="font-semibold px-2 text-white">Add Item</p>
          </div>
        </div>

        {/* item list */}
        {/* Conditional rendering for empty list */}
        {newItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <Image
              src="/images/empty-list.png" // Replace with your image path
              alt="No items in the list"
              height={250}
              width={250}
            />
            <p className="text-gray-800 text-center font-semibold mt-2">
              Your shopping list is empty. <br />
              Start adding items!
            </p>
          </div>
        ) : (
          newItems.map((newItem, index) => (
            <div className="flex flex-col w-full" key={newItem.id}>
              <div className="grid grid-cols-3 gap-4 items-center justify-between mt-8">
                <div className="flex flex-row items-center gap-2 ">
                  <FontAwesomeIcon
                    icon={faCircle}
                    color="green"
                    className="size-4"
                  />
                  <span className="text-dark text-[25px] text-dark px-2">
                    {newItem.itemName}
                  </span>
                </div>
                <div className="px-2 flex justify-center">
                  <span className="text-green-600 text-xl ">
                    {newItem.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-row items-center gap-2 sm:gap-5 justify-end">
                  <div className="flex justify-center bg-red-200 items-center w-5 h-5 md:w-10 md:h-10 rounded-md">
                    <FontAwesomeIcon
                      onClick={() => handleQuantityDecrease(index)}
                      icon={faMinus}
                      color={`${newItem.quantity === 1 ? "gray" : "red"}`}
                      className="size-4 sm:size-6 m-2 hover:cursor-pointer"
                    />
                  </div>
                  <span className="text-dark text-xl">{newItem.quantity}</span>

                  <div className="flex justify-center bg-green-200 items-center w-5 h-5 md:w-10 md:h-10 rounded-md">
                    <FontAwesomeIcon
                      onClick={() => incrementQuantityAndPrice(index)}
                      icon={faAdd}
                      color="green"
                      className="size-4 sm:size-6 m-2 hover:cursor-pointer"
                    />
                  </div>
                  <FontAwesomeIcon
                    onClick={() => deleteItemHandler(index)}
                    icon={faTrash}
                    color="red"
                    className="size-4 ml-2 hover:cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <hr className="my-1 bg-gray-500 h-0.5 border-none" />
              </div>
            </div>
          ))
        )}

        {/* total and share button */}
        <div className="flex flex-row items-center justify-between mt-5 bg-white p-5 rounded-md">
          <div className="text-green-600 text-xl sm:text-3xl font-bold">
            Total:
          </div>
          <div className="text-green-600 text-xl sm:text-3xl font-bold">
            ₦{calculateTotalPrice()}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-start mt-10 gap-4">
        <select
          itemType="text"
          name="Select Vendor"
          id="vendors"
          className="h-10 w-40 bg-green-300 border-solid rounded-lg p-2"
        >
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
