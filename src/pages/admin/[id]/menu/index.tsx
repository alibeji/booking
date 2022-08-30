import {
  Button,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { useMutation, useQuery } from "react-query";

import fetchRestaurantData from "../../../../utils/api/fetchRestaurantData";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState, KeyboardEvent, useEffect } from "react";
import usePutRestaurant from "../../../../utils/api/putRestaurant";
import { toast } from "react-toastify";
import { Restaurant } from "../../../../types/restaurant";

const AddMenu: NextPage = () => {
  const {
    query: { id },
  } = useRouter();

  const { data } = useQuery(`restaurant-${id}`, () =>
    fetchRestaurantData(typeof id === "string" ? id : "")
  );

  const putRestaurant = usePutRestaurant(typeof id === "string" ? id : "");
  const [menus, setMenus] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    setMenus(data?.menu ?? []);
  }, [data]);

  const { mutate } = useMutation(putRestaurant, {
    onSuccess: (data: { cod?: number }) => {
      if (data.cod !== 400) {
        toast.error("something went wrong");
      }
    },
  });

  if (!data) return null;

  const removeItem = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    deletedItem: string
  ) => {
    event.stopPropagation();
    const shallowMenus = [...menus];
    shallowMenus.splice(shallowMenus.indexOf(deletedItem), 1);
    setMenus(shallowMenus);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const menu = [...menus];

    const restaurantData: Pick<Restaurant, "menu"> = {
      menu,
    };
    mutate(restaurantData);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setMenus([...menus, newItem]);
      setNewItem("");
    }
  };

  return (
    <div className="container">
      <h2 className="title">
        Please add a <span>Menu</span>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <FormControl variant="standard">
            <InputLabel id="user-menus">Menus</InputLabel>
            <Select
              labelId="user-menus"
              multiple
              value={menus}
              renderValue={(selected) => selected.join(", ")}
            >
              {menus.map((_menu) => (
                <MenuItem key={_menu} value={_menu}>
                  <DeleteIcon onClick={(e) => removeItem(e, _menu)} />
                  <ListItemText primary={_menu} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Add a menu"
            variant="standard"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button variant="contained" type="submit">
            Save Menu
          </Button>
        </form>
      </h2>
    </div>
  );
};

export default AddMenu;
