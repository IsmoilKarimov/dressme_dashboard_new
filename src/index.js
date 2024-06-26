import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ContextTeam from "./hook/ContextTeam";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SellerUserContext from "./hook/SellerUserContext";
import SellerRefreshContext from "./hook/SellerRefreshToken";
import HelperDataStore from "./hook/HelperDataStore";
import { DressmeLanguage } from "./language/LanguageItem";
import "./language/i18n";
import RegionList from "./hook/RegionList";
import ShopIsList from "./hook/ShopList";
import ShopIsLocationList from "./hook/ShopLocationList";
import ShopIsLocationProductList from "./hook/ShopLocationProductList";
import GetProductIsList from "./hook/GetProductList";
import ShopIsLocationProductCheck from "./hook/ShopLocationProductCheck";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <DressmeLanguage>
        <ContextTeam>
          <RegionList>
            <ShopIsLocationList>
              <GetProductIsList>
                <ShopIsList>
                  <ShopIsLocationProductList>
                  <ShopIsLocationProductCheck>
                    <SellerRefreshContext>
                      <SellerUserContext>
                        <HelperDataStore>
                          <App />
                        </HelperDataStore>
                      </SellerUserContext>
                    </SellerRefreshContext>
                  </ShopIsLocationProductCheck>
                  </ShopIsLocationProductList>
                </ShopIsList>
              </GetProductIsList>
            </ShopIsLocationList>
          </RegionList>
        </ContextTeam>
      </DressmeLanguage>
    </QueryClientProvider>
  </BrowserRouter>
);
