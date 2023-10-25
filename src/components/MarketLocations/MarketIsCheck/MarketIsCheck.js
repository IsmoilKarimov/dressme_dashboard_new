import React, { useEffect } from 'react'
import LocationList from '../Locations/LocationList/LocationList'
import NoLocations from '../NoLocations/NoLocations'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingForSeller from '../../Loading/LoadingFor'
import { useHttp } from '../../../hook/useHttp'

export default function MarketIsCheck() {
    const { request } = useHttp()
    const [state, setState] = useState({
        isLocation: "",
        isCheckLocation: null,
        isMarket: "",
        isMarketCheck: false,
        loading: true,
    })

    const { isLoading } = useQuery(["shops_index"], () => { return request({ url: "/shops", token: true }) },
        {
            onSuccess: (res) => {
                console.log(res, "get magazin check");
                if (res?.shops) {
                    setState({ ...state, isMarketCheck: true, isMarket: res, loading: false })
                    console.log(res, "get magazin");
                }
            },
            onError: (err) => {
                setState({ ...state, loading: false })
                console.log(err, "BU -- HOC -- Error");
            },
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        }
    );

    // ------------GET  Has Magazin ?-----------------
    const { isFetched, isFetching } = useQuery(["location_index"], () => {
        return request({ url: "/shops/locations/index", token: true });
    },
        {
            onSuccess: (res) => {
                console.log(res, "get location check");
                if (res?.locations) {
                    setState({ ...state, isCheckLocation: res?.locations_exist, isLocation: res, loading: false })
                    console.log(res, "get locations");
                }
            },
            onError: (err) => {
                setState({ ...state, loading: false })
                console.log(err, "BU -- HOC -- Error");
            },
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        }
    );
    return (
        <div>
            {state?.loading || isLoading || !state?.isMarketCheck ? <LoadingForSeller /> :
                <>  {
                    state?.isMarketCheck ? <>
                        {isFetched && state?.isLocation?.locations?.data ? <> {state?.isCheckLocation ?
                            <LocationList marketList={state?.isMarket} locationList={state?.isLocation} /> :
                            < NoLocations marketList={state?.isMarket} locationList={state?.isLocation} />} </> :
                            <LoadingForSeller />}</>
                        :
                        <div className="flex items-center h-[100vh] justify-center">
                            <Link
                                to="/store"
                                className="text-textBlueColor text-2xl not-italic font-AeonikProRegular hover:underline"
                            >
                                Сначала создайте магазин!
                            </Link>
                        </div >
                }
                </>
            }


        </div >
    )
}
