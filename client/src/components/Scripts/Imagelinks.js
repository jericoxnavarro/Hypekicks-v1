const Imagelinks = (image, shoeName) => {
  const firstHeader = "https://stockx-360.imgix.net//";
  const secondHeader = "/Images/";
  const link = image;
  const shoeNames = shoeName.replace("(", "").replace(")", "");
  const getLastName = shoeNames.split(" ");
  let lastName = getLastName[getLastName.length - 1];
  if (!link.includes(lastName)) {
    lastName = getLastName[getLastName.length - 2];
  }
  const getLink = link.substr(link.lastIndexOf("/") + 1);
  const finalLink = link.substr(
    link.lastIndexOf("/") + 1,
    getLink.indexOf(lastName) + lastName.length
  );

  let stockXIMG = [];
  for (let i = 1; i <= 36; i++) {
    if (i < 10) {
      stockXIMG.push(
        `${firstHeader}${finalLink}${secondHeader}${finalLink}/Lv2/img0${i}.jpg`
      );
    } else {
      stockXIMG.push(
        `${firstHeader}${finalLink}${secondHeader}${finalLink}/Lv2/img${i}.jpg`
      );
    }
  }

  return stockXIMG;
};

export default Imagelinks;
