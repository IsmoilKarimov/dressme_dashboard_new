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
    IsAuthenticated: false,
    SellerMagazin: "",
    SellerMagazinLocation: "",
    // ------Product----
    ProductFilterType: null,
    nextPageShowForm: true,
    productAddByIdForToggle: '',
    isCheckPoructList: null,
    sellerUser: "",
  });



  return (
    <dressMainData.Provider value={[dressInfo, setDressInfo]}>
      {children}
    </dressMainData.Provider>
  );
}
