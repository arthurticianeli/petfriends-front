import BasePage from "common/components/BasePage";
import { ListCategories } from "modules/categories/pages/ListCategories";
import { CreatePet } from "modules/pets/pages/CreatePet";
import EditPet from "modules/pets/pages/EditPet";
import { ListPets } from "modules/pets/pages/ListPets";
import React from "react";
import { Route, Routes as Switch } from "react-router-dom";

export const Routes: React.FC = () => {
  return (
    <BasePage>
      <Switch>
        <Route path="/" element={<ListPets />} />
        <Route path="/pets/new" element={<CreatePet />} />
        <Route path="/pets/:petId" element={<EditPet />} />
        <Route path="/categories" element={<ListCategories />} />
      </Switch>
    </BasePage>
  );
};
