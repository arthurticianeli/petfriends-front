import BasePage from "pages/components/BasePage";
import { CreatePet } from "pages/CreatePet";
import EditPet from "pages/EditPet";
import { ListPets } from "pages/ListPets";
import React from "react";
import { Route, Routes as Switch } from "react-router-dom";

export const Routes: React.FC = () => {
  return (
    <BasePage>
      <Switch>
        <Route path="/" element={<ListPets />} />
        <Route path="/pets/new" element={<CreatePet />} />
        <Route path="/pets/:petId" element={<EditPet />} />
      </Switch>
    </BasePage>
  );
};
