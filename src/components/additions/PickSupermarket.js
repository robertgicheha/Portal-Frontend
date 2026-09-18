import { useEffect, useContext, useMemo, useState, useCallback } from "react";
import { GlobalContext } from "../../context/GlobalState";
import Menu from "../layout/Menu";
import Header from "../layout/Header";
import BreadCrumb from "../sections/BreadCrumb";
import LoaderScreen from "../../pages/LoaderScreen";
import Swal from "sweetalert2";
import quickmart from "../../images/supermarkets/Quickmart.png";
import carrefour from "../../images/supermarkets/Carrefour.jpg";
import naivas from "../../images/supermarkets/Naivas.png";

const imageMap = {
  "OPS-0001": naivas, // Naivas
  "OPS-0002": carrefour, // Carrefour
  "OPS-0003": quickmart, // Quickmart
};

const loadImage = (code) => imageMap[code] || null;

// Nearby branches by brand (we only show first 5; Westlands prioritized)
const NEARBY_BRANCHES = {
  "OPS-0002": [
    {
      name: "Carrefour – Sarit Centre",
      area: "Westlands",
      address: "Sarit Centre, Karuna Rd",
    },
    {
      name: "Carrefour – Westgate",
      area: "Westlands",
      address: "Westgate Mall, Mwanzi Rd",
    },
    {
      name: "Carrefour Market – GTC",
      area: "Westlands",
      address: "GTC, 24 Westlands Rd",
    },
    {
      name: "Carrefour – Village Market",
      area: "Gigiri",
      address: "Limuru Rd (near Westlands)",
    },
    {
      name: "Carrefour – Two Rivers",
      area: "Runda",
      address: "Two Rivers Mall, Limuru Rd",
    },
    {
      name: "Carrefour – The Junction",
      area: "Dagoretti",
      address: "Junction Mall, Ngong Rd",
    },
    { name: "Carrefour – TRM", area: "Thika Rd", address: "Thika Rd Mall" },
    {
      name: "Carrefour – Valley Arcade",
      area: "Lavington",
      address: "Gitanga Rd",
    },
    {
      name: "Carrefour – Signature Mall",
      area: "Mombasa Rd",
      address: "Signature Mall",
    },
    {
      name: "Carrefour – Garden City",
      area: "Roysambu",
      address: "Garden City Mall",
    },
  ],
  "OPS-0001": [
    {
      name: "Naivas – Westlands",
      area: "Westlands",
      address: "Ring Rd / Westlands CBD",
    },
    {
      name: "Naivas – General Mathenge",
      area: "Westlands",
      address: "General Mathenge Dr",
    },
    {
      name: "Naivas – Lavington",
      area: "Lavington",
      address: "James Gichuru / Gitanga Rd",
    },
    {
      name: "Naivas – Westgate Express",
      area: "Westlands",
      address: "Near Westgate Mall",
    },
    { name: "Naivas – Prestige", area: "Ngong Rd", address: "Prestige Plaza" },
    { name: "Naivas – Westside", area: "Waiyaki Way", address: "Waiyaki Way" },
    {
      name: "Naivas – Kahawa West",
      area: "Kahawa West",
      address: "Kahawa West",
    },
    { name: "Naivas – Express Kimathi", area: "CBD", address: "Kimathi St" },
    { name: "Naivas – Mountain View", area: "Kangemi", address: "Waiyaki Way" },
    { name: "Naivas – Ruaka", area: "Ruaka", address: "Limuru Rd" },
  ],
  "OPS-0003": [
    {
      name: "Quickmart – Westlands",
      area: "Westlands",
      address: "Westlands CBD / Woodvale",
    },
    {
      name: "Quickmart – Waiyaki Way",
      area: "Westlands",
      address: "Waiyaki Way",
    },
    { name: "Quickmart – Lavington", area: "Lavington", address: "Gitanga Rd" },
    {
      name: "Quickmart – Riverside",
      area: "Riverside",
      address: "Riverside Dr",
    },
    { name: "Quickmart – Muthithi", area: "Westlands", address: "Muthithi Rd" },
    { name: "Quickmart – Ruaka", area: "Ruaka", address: "Limuru Rd" },
    {
      name: "Quickmart – Kilimani",
      area: "Kilimani",
      address: "Kilimani / Lenana Rd",
    },
    {
      name: "Quickmart – Parklands",
      area: "Parklands",
      address: "Parklands Rd",
    },
    {
      name: "Quickmart – Kileleshwa",
      area: "Kileleshwa",
      address: "Kandara / Gatundu Rd",
    },
    { name: "Quickmart – Kangemi", area: "Kangemi", address: "Waiyaki Way" },
  ],
};

const PickSupermarket = () => {
  const {
    user_info,
    isLoading,
    loadingStatus,
    voucher,
    getUserVoucherDetails,
    updateSupermarketSelection, // provided by GlobalContext
  } = useContext(GlobalContext);

  const menu = {
    title: "Supermarket selection",
    subTitle: "",
    links: [],
  };

  // LOCAL optimistic state to guarantee a re-render across all browsers
  const [selectedCode, setSelectedCode] = useState(
    voucher?.optionSelected ?? null
  );

  // Keep local selection in sync with context (e.g., after server refetch)
  useEffect(() => {
    setSelectedCode(voucher?.optionSelected ?? null);
  }, [voucher?.optionSelected]);

  const handleSelect = useCallback(
    async (option_selected) => {
      loadingStatus(true);
      const previous = selectedCode;
      // optimistic UI update
      setSelectedCode(option_selected);

      const data = {
        email: voucher?.employeeEmail,
        doc_number: voucher?.documentNo,
        option_selected,
      };

      const res = await updateSupermarketSelection(data);

      if (res?.ok) {
        // Sync other voucher fields (balances, expiry, etc.)
        await getUserVoucherDetails();
        // Swal.fire({
        //   icon: "success",
        //   title: "Supermarket selected!",
        //   text: "Your selection has been saved.",
        //   timer: 1500,
        //   showConfirmButton: false,
        // });

        loadingStatus(false);
      } else if (!res?.cancelled) {
        // revert on error
        setSelectedCode(previous);
        Swal.fire(
          "Error",
          "Could not update your supermarket selection.",
          "error"
        );
      }
    },
    [
      getUserVoucherDetails,
      selectedCode,
      updateSupermarketSelection,
      voucher?.documentNo,
      voucher?.employeeEmail,
    ]
  );

  const selectedSupermarket = useMemo(() => {
    return (
      voucher?.optionAvailable?.find((s) => s.code === selectedCode) || null
    );
  }, [voucher?.optionAvailable, selectedCode]);

  const unselectedSupermarkets = useMemo(() => {
    return (
      voucher?.optionAvailable?.filter((s) => s.code !== selectedCode) || []
    );
  }, [voucher?.optionAvailable, selectedCode]);

  const nearbyForSelected = useMemo(() => {
    if (!selectedSupermarket) return [];
    const list = NEARBY_BRANCHES[selectedSupermarket.code] || [];
    const westlandsFirst = [
      ...list.filter((x) => /westlands/i.test(x.area || "")),
      ...list.filter((x) => !/westlands/i.test(x.area || "")),
    ];
    return westlandsFirst.slice(0, 5);
  }, [selectedSupermarket]);

  useEffect(() => {
    getUserVoucherDetails();
    return () => {
      // Optional: only clear a global loader here if you specifically need it.
      loadingStatus(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadSupermarkets = (optionsAvailable) => {
    if (!optionsAvailable?.length) return null;
    return (
      <>
        {optionsAvailable.map((s) => (
          <div className="col-md-4 col-12" key={s.code}>
            <article className="food-card">
              <div className="food-card__img-wrap">
                <img src={loadImage(s.code)} alt={s.name} />
              </div>
              <h3 className="food-card__title">{s.name}</h3>
              <div className="food-card__footer">
                <button
                  className="add-btn"
                  type="button"
                  aria-label="Select button"
                  onClick={() => handleSelect(s.code)}
                >
                  Select
                </button>
              </div>
            </article>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      {isLoading && (
        <div className="load_screen">
          <LoaderScreen text="Loading selection. Please wait..." />
        </div>
      )}

      {!isLoading && (
        <>
          <Header />
          <div className="page">
            <div className="container">
              <Menu menu={menu} />
              <BreadCrumb />

              {!selectedCode ? (
                <div className="row">
                  {loadSupermarkets(voucher?.optionAvailable)}
                </div>
              ) : (
                <>
                  {selectedSupermarket && (
                    <>
                      <div className="row">
                        <div className="col-md-4 col-12">
                          <article className="food-card">
                            <div className="food-card__img-wrap">
                              <img
                                src={loadImage(selectedSupermarket.code)}
                                alt={selectedSupermarket.name}
                              />
                            </div>
                            <h3 className="food-card__title">
                              {selectedSupermarket.name}
                            </h3>
                            <div className="food-card__footer">
                              <h4>Selected</h4>
                            </div>
                          </article>
                        </div>

                        <div className="col-md-6 col-12 location-supermarket">
                          <h5>
                            Top 5 Nearby{" "}
                            {selectedSupermarket.name?.split(" ")?.[0] ||
                              "Brand"}{" "}
                            branches (within Westlands)
                          </h5>
                          {nearbyForSelected.length > 0 ? (
                            <ul>
                              {nearbyForSelected.map((b, idx) => (
                                <li key={`${selectedSupermarket.code}-${idx}`}>
                                  <strong>{b.name}</strong>
                                  {b.area ? ` — ${b.area}` : ""}{" "}
                                  {b.address ? `(${b.address})` : ""}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>No nearby branches found for this brand.</p>
                          )}
                        </div>
                      </div>

                      <div className="row options-supermarket-other">
                        <div className="col-md-12 col-12 ">
                          <hr style={{ margin: "80px 0 50px 0" }} />
                          <h4>Other available Supermarket Options</h4>
                        </div>
                      </div>

                      <div className="row" style={{ paddingBottom: "80px" }}>
                        {unselectedSupermarkets.map((s) => (
                          <div className="col-md-4 col-12" key={s.code}>
                            <article className="food-card">
                              <div className="food-card__img-wrap">
                                <img src={loadImage(s.code)} alt={s.name} />
                              </div>
                              <h3 className="food-card__title">{s.name}</h3>
                              <div className="food-card__footer">
                                <button
                                  className="add-btn"
                                  type="button"
                                  aria-label="Select button"
                                  onClick={() => handleSelect(s.code)}
                                >
                                  Select
                                </button>
                              </div>
                            </article>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PickSupermarket;
