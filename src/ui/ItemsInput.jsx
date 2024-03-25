import Input from "./Input";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import { FaTrash } from "react-icons/fa6";
import { useState } from "react";

function ItemsInput({ setVal, setTotal, mode = "new", editedItems = [] }) {
  // Handling translation
  const [t, i18n] = useTranslation();
  //   Handling items value state
  const [items, setItems] = useState(mode === "new" ? [] : editedItems);
  //   Handling input element change event
  const handleChange = (index, field, e) => {
    const tempItems = [...items];
    tempItems[index][field] = e.target.value;
    const sum = tempItems.reduce(
      (acc, cur) => (acc += +cur["price"] * +cur["qty"]),
      0,
    );
    setTotal(sum);
    setItems(tempItems);
    setVal(tempItems);
  };

  // Handling adding new element
  const handleNew = (e) => {
    e.preventDefault();
    // Filtering Empty Elements
    let tempItems = [...items];
    tempItems = tempItems.filter(
      (item) => item.price !== null || item.name !== "",
    );
    //Adding new Element
    tempItems.push({
      qty: null,
      name: "",
      price: null,
    });
    setItems(tempItems);
    setVal(tempItems);
  };
  // Handling removing an element
  const handleRemove = (index, e) => {
    console.log(index);
    e.preventDefault();
    const tempItems = [...items];
    tempItems.splice(index, 1);
    setItems(tempItems);
    setVal(tempItems);
  };

  return (
    <table className="dark:text-neutral-100">
      <thead className="grid grid-cols-9 text-neutral-800 dark:text-neutral-100 [&:lang(ar)]:text-right [&:lang(ar)]:text-xs [&:lang(en)]:text-left [&:lang(en)]:text-base">
        <th className="col-span-3">{t("newBill.itemList.itemName")}</th>
        <th className="col-span-1">{t("newBill.itemList.qty")}</th>
        <th className="col-span-2">{t("newBill.itemList.price")}</th>
        <th className="col-span-2 text-center">
          {t("newBill.itemList.total")}
        </th>
        <th className="col-span-1 text-center">
          {t("newBill.itemList.delete")}
        </th>
      </thead>
      <tbody>
        {items.length === 0 && (
          <p className="my-2 text-center text-xl text-purple-500">
            لا يوجد اصناف مضافة
          </p>
        )}
        {items.map((item, index) => (
          <tr className="grid grid-cols-9" key={index}>
            <td className="col-span-3">
              <Input
                name="itemName"
                type="text"
                value={item.name}
                onChange={(e) => handleChange(index, "name", e)}
              />
            </td>
            <td className="col-span-1">
              <Input
                name="itemQty"
                type="number"
                defaultValue="1"
                value={item.qty}
                onChange={(e) => handleChange(index, "qty", e)}
              />
            </td>
            <td className="col-span-2">
              <Input
                name="itemPrice"
                type="number"
                value={item.price}
                onChange={(e) => handleChange(index, "price", e)}
              />
            </td>
            <td className="col-span-2 flex items-center justify-center">
              {item["price"] * item["qty"]}
            </td>
            <td className="col-span-1 flex items-center justify-center">
              <Button
                className="bg-transparent hover:bg-transparent"
                disabled={items.length === 0}
                onClick={(e) => handleRemove(index, e)}
              >
                <FaTrash className="text-purple-700" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
      <Button
        className="mt-3 w-full bg-tertiary hover:bg-dark dark:hover:bg-blue-950"
        onClick={(e) => handleNew(e)}
      >
        {t("newBill.itemList.addNewItem")}
      </Button>
    </table>
  );
}

export default ItemsInput;
