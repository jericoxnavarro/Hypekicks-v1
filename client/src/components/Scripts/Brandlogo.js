const Brandlogo = (brand) => {
  let brandlogo;
  if (brand === "Nike" || brand === "Jordan") {
    brandlogo = "../icons/svg/nike.svg";
  } else if (brand === "adidas") {
    brandlogo = "../icons/svg/adidas.svg";
  } else if (brand === "Vans") {
    brandlogo = "../icons/svg/vans.svg";
  } else if (brand === "Converse") {
    brandlogo = "../icons/svg/converse.svg";
  } else if (brand === "New Balance") {
    brandlogo = "../icons/svg/newbalance.svg";
  } else if (brand === "Reebok") {
    brandlogo = "../icons/svg/reebok.svg";
  }

  return brandlogo;
};

export default Brandlogo;
