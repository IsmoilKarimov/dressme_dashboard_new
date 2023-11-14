import { useQuery } from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";
export const dressMainData = createContext();

export default function ContextTeam({ children }) {
  const [dressInfo, setDressInfo] = useState({
    isItPorduct: true,
    isAuthen: true,
    ConfirmAuthen: false,
    logOutSeller: false,
    // AccessTokenSeller: localStorage.getItem('DressmeUserToken'),
    SellerName: "",
    SellerSurName: "",
    SellerMagazin: "",
    SellerMagazinLocation: "",
    // ------Product----
    ProductFilterType: null,
    nextPageShowForm: true,
    productAddByIdForToggle: ''

  });



  return (
    <dressMainData.Provider value={[dressInfo, setDressInfo]}>
      {children}
    </dressMainData.Provider>
  );
}
