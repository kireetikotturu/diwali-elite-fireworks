import React, { useState, useRef, useEffect } from "react";
import "./Shop.css";
import { useLocation } from "react-router-dom";

// Cloudinary images for categories and products
const categories = [
  { name: "Sparklers", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759383446/sparklers-c-image_oyw1st.jpg" },
  { name: "Wheels/Buchakkar", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759386052/bhuchakkar-c-image_vaxxqi.png" },
  { name: "Flower Pots", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759385749/flowerpot-c-image_poai45.png" },
  { name: "Threads/Pencils", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759401227/Untitled_design_3_larfnm.png" },
  { name: "Rockets", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759396971/rockets-c-image_hgzqvd.png" },
  { name: "Bombs", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759388414/bomb-c-image_x9scey.png" },
  { name: "Lal Mirchi (Per Bundle)", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759391010/lalmirchi-c-image_qurouc.png" },
  { name: "Mirchi Packets", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759395609/mirchi-packets-image_qyvad3.jpg" },
  { name: "Elite Fancy Series", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759386943/elitefancy-c-image_t2trdy.png" },
  { name: "Shorts", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759397199/shorts-c-image_vwv2ji.png" },
  { name: "Garland Crackers", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759398165/Untitled_design_1_hrp6wk.png" },
  { name: "Others", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759398909/Untitled_design_2_sd53ui.png" },
  { name: "Combo Offers", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/elitefancyseries_image1_gsw3ay.jpg" }
];

const products = [
  {
    id: 1,
    name: "75CM ELECTRIC\n(Box: 10PCS)",
    price: 322,
    actualPrice: 500,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759546058/30CM_LONG_1080_x_900_px_12_nynve7.png",
    category: "Sparklers"
  },
  {
    id: 2,
    name: "30CM ELECTRIC\n(Box: 10PCS)",
    price: 58,
    actualPrice: 100,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759543420/30CM_LONG_1080_x_900_px_4_am0r2w.png",
    category: "Sparklers"
  },
  {
    id: 3,
    name: "30CM CRACKLING\n(Box: 10PCS)",
    price: 62,
    actualPrice: 120,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759544350/30CM_LONG_1080_x_900_px_6_vvxdmb.png",
    category: "Sparklers"
  },
  {
    id: 4,
    name: "15CM RED\n(Box: 10PCS)",
    price: 81,
    actualPrice: 100,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759545487/30CM_LONG_1080_x_900_px_7_fswq2c.png",
    category: "Sparklers"
  },
  {
    id: 5,
    name: "15CM ELECTRIC\n(Box: 10PCS)",
    price: 69,
    actualPrice: 100,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759545486/30CM_LONG_1080_x_900_px_8_r7efhh.png",
    category: "Sparklers"
  },
  {
    id: 6,
    name: "12CM CRACKLING\n(Box: 10PCS)",
    price: 48,
    actualPrice: 80,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759545487/30CM_LONG_1080_x_900_px_9_knyhf8.png",
    category: "Sparklers",
  },
  {
    id: 7,
    name: "10CM ELECTRIC\n(Box: 10PCS)",
    price: 46,
    actualPrice: 70,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759545486/30CM_LONG_1080_x_900_px_10_dmzqx5.png",
    category: "Sparklers",
  },
  {
    id: 8,
    name: "7CM CRACKLING\n(Box: 10PCS)",
    price: 35,
    actualPrice: 60,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759545485/30CM_LONG_1080_x_900_px_11_zyyhgo.png",
    category: "Sparklers",
  },
  {
    id: 9,
    name: " JIL-JIL\n(Box: 10PCS)",
    price: 575,
    actualPrice: 600,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759649265/30CM_LONG_1080_x_900_px_13_mun1k0.png",
    category: "Threads/Pencils",
  },
  {
    id: 10,
    name: "ULTRA COLOR PENCILS\n(Box: 10PCS)",
    price: 253,
    actualPrice: 350,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759649266/30CM_LONG_1080_x_900_px_14_mkbjxv.png",
    category: "Threads/Pencils",
  },
  {
    id: 11,
    name: "AMAZING PENCILS\n(Box: 10PCS)",
    price: 207,
    actualPrice: 350,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759649647/30CM_LONG_1080_x_900_px_15_spet2h.png",
    category: "Threads/Pencils",
  },
  {
    id: 12,
    name: "TRIBE THREDS\n(Box: 10PCS)",
    price: 126,
    actualPrice: 250,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759649646/30CM_LONG_1080_x_900_px_16_fodazn.png",
    category: "Threads/Pencils",
  },
  {
    id: 13,
    name: "CARNATION PENCILS\n(Box: 10PCS)",
    price: 218,
    actualPrice: 300,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759649981/30CM_LONG_1080_x_900_px_17_suebtx.png",
    category: "Threads/Pencils",
  },
  {
    id: 14,
    name: "BIG TWINKLE STAR\n(Box: 10PCS)",
    price: 115,
    actualPrice: 250,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759649981/30CM_LONG_1080_x_900_px_19_pctujc.png",
    category: "Threads/Pencils",
  },
  {
    id: 15,
    name: "SMALL TWINKLE STAR\n(Box: 10PCS)",
    price: 92,
    actualPrice: 200,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759649980/30CM_LONG_1080_x_900_px_20_gtmpsr.png",
    category: "Threads/Pencils",
  },
  {
    id: 16,
    name: "SPECIAL CHAKKARS GRREN\n(Box: 10PCS)",
    price: 115,
    actualPrice: 200,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659079/30CM_LONG_1080_x_900_px_22_gpqjhy.png",
    category: "Wheels/Buchakkar",
  },
  {
    id: 17,
    name: "BIG VIOLET CHAKKARS\n(Box: 10PCS)",
    price: 345,
    actualPrice: 450,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659514/30CM_LONG_1080_x_900_px_23_qmxcdf.png",
    category: "Wheels/Buchakkar",
  },
  {
    id: 18,
    name: "SMALL VIOLET CHAKKARS\n(Box: 10PCS)",
    price: 172,
    actualPrice: 300,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659514/30CM_LONG_1080_x_900_px_24_pkzdn7.png",
    category: "Wheels/Buchakkar",
  },
  {
    id: 19,
    name: "PALAK WHEEL\n(Box: 10PCS)",
    price: 414,
    actualPrice: 450,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659513/30CM_LONG_1080_x_900_px_25_mpgtus.png",
    category: "Wheels/Buchakkar",
  },
  {
    id: 20,
    name: "VIOLET SPINNERS\n(Box: 10PCS)",
    price: 345,
    actualPrice: 450,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659514/30CM_LONG_1080_x_900_px_26_puklbg.png",
    category: "Wheels/Buchakkar",
  },
  {
    id: 21,
    name: "CHAKKAR DELUX\n(Box: 10PCS)",
    price: 299,
    actualPrice: 380,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659512/30CM_LONG_1080_x_900_px_27_dmpgn2.png",
    category: "Wheels/Buchakkar",
  },
  {
    id: 22,
    name: "CHAKKAR DELUX COLOR\n(Box: 10PCS)",
    price: 287,
    actualPrice: 350,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659512/30CM_LONG_1080_x_900_px_28_dgjlvq.png",
    category: "Wheels/Buchakkar",
  },
  {
    id: 23,
    name: "RIO WHEELS\n(Box: 10PCS)",
    price: 391,
    actualPrice: 550,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659511/30CM_LONG_1080_x_900_px_29_dogpjh.png",
    category: "Wheels/Buchakkar",
  },
  {
    id: 24,
    name: "JOKE WHEELS\n(Box: 10PCS)",
    price: 368,
    actualPrice: 500,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659511/30CM_LONG_1080_x_900_px_29_dogpjh.png",
    category: "Wheels/Buchakkar",
  },
  {
    id: 25,
    name: "MTP ASHOKA CHAKKARS SPECIAL\n(Box: 10PCS)",
    price: 184,
    actualPrice: 220,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659515/30CM_LONG_1080_x_900_px_30_hh3fxi.png",
    category: "Wheels/Buchakkar",
  },
  {
    id: 26,
    name: "MTP CHAKKAR DELUX\n(Box: 10PCS)",
    price: 230,
    actualPrice: 350,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659520/30CM_LONG_1080_x_900_px_31_yycpgp.png",
    category: "Wheels/Buchakkar",
  },
  {
    id: 27,
    name: "COLOR PINJORE (XL)\n(Box: 10PCS)",
    price: 828,
    actualPrice: 900,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659513/30CM_LONG_1080_x_900_px_32_wfk9wg.png",
    category: "Flower Pots",
  },
  {
    id: 28,
    name: "TALI COLOR KOTI\n(Box: 10PCS)",
    price: 437,
    actualPrice: 600,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659512/30CM_LONG_1080_x_900_px_33_wmtder.png",
    category: "Flower Pots",
  },
  {
    id: 29,
    name: "VARNAJAL\n(Box: 10PCS)",
    price: 782,
    actualPrice: 850,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659510/30CM_LONG_1080_x_900_px_34_ea1uun.png",
    category: "Flower Pots",
  },
  {
    id: 30,
    name: "MEGA COLOR KOTI\n(Box: 10PCS)",
    price: 552,
    actualPrice: 700,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659511/30CM_LONG_1080_x_900_px_35_oc4fst.png",
    category: "Flower Pots",
  },
  {
    id: 31,
    name: "CARNIVAL\n(Box: 10PCS)",
    price: 414,
    actualPrice: 600,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659539/30CM_LONG_1080_x_900_px_36_y3ckow.png",
    category: "Flower Pots",
  },
  {
    id: 32,
    name: "FLOWER DELUX\n(Box: 10PCS)",
    price: 162,
    actualPrice: 500,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659534/30CM_LONG_1080_x_900_px_37_xeisu0.png",
    category: "Flower Pots",
  },
  {
    id: 33,
    name: "ASHOKA FLOWER\n(Box: 10PCS)",
    price: 172,
    actualPrice: 350,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659533/30CM_LONG_1080_x_900_px_38_hafpo1.png",
    category: "Flower Pots",
  },
  {
    id: 34,
    name: "ASHOKA COLOR\n(Box: 10PCS)",
    price: 172,
    actualPrice: 350,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659533/30CM_LONG_1080_x_900_px_39_yhylow.png",
    category: "Flower Pots",
  },
  {
    id: 35,
    name: "SPECIAL FLOWER\n(Box: 10PCS)",
    price: 126,
    actualPrice: 250,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659534/30CM_LONG_1080_x_900_px_40_qrasc5.png",
    category: "Flower Pots",
  },
  {
    id: 36,
    name: "SMALL FLOWER\n(Box: 10PCS)",
    price: 80,
    actualPrice: 200,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659532/30CM_LONG_1080_x_900_px_41_iy37co.png",
    category: "Flower Pots",
  },
  {
    id: 37,
    name: "RED STAR FLOWER POTS\n(Box: 10PCS)",
    price: 736,
    actualPrice: 1000,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659526/30CM_LONG_1080_x_900_px_42_oaorlv.png",
    category: "Flower Pots",
  },
  {
    id: 38,
    name: "JASMINE FLOWER POTS\n(Box: 10PCS)",
    price: 575,
    actualPrice: 800,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659526/30CM_LONG_1080_x_900_px_43_yg678x.png",
    category: "Flower Pots",
  },
  {
    id: 39,
    name: "AYANN SNOW PATROL (1 UNIT)\n(Box: 10PCS)",
    price: 126,
    actualPrice: 200,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659525/30CM_LONG_1080_x_900_px_44_hbj2oh.png",
    category: "Flower Pots",
  },
  {
    id: 40,
    name: "RANGOLI\n(Box: 10PCS)",
    price: 506,
    actualPrice: 800,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659525/30CM_LONG_1080_x_900_px_45_zf0o4h.png",
    category: "Flower Pots",
  },
  {
    id: 41,
    name: "MTP BIG FLOWER POTS\n(Box: 10PCS)",
    price: 184,
    actualPrice: 220,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659528/30CM_LONG_1080_x_900_px_46_o36xlg.png",
    category: "Flower Pots",
  },
  {
    id: 42,
    name: "MTP SMALL FLOWER POTS\n(Box: 10PCS)",
    price: 103,
    actualPrice: 180,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759659525/30CM_LONG_1080_x_900_px_47_sl7zen.png",
    category: "Flower Pots",
  },
  {
    id: 43,
    name: "MAGIC SHOT(KIT-KAT)\n(Box: 10PCS)",
    price: 39,
    actualPrice: 80,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759664712/30CM_LONG_1080_x_900_px_48_io7ijb.png",
    category: "Elite Fancy Series",
  },
  {
    id: 44,
    name: "POPCORN\n(Box: 10PCS)",
    price: 195,
    actualPrice: 300,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759664707/30CM_LONG_1080_x_900_px_49_eznitw.png",
    category: "Elite Fancy Series",
  },
  {
    id: 45,
    name: "LOTUS\n(Box: 10PCS)",
    price: 391,
    actualPrice: 500,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759664706/30CM_LONG_1080_x_900_px_50_ubefxm.png",
    category: "Elite Fancy Series",
  },
  {
    id: 46,
    name: "BUTTERFLY\n(Box: 10PCS)",
    price: 138,
    actualPrice: 300,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759664706/30CM_LONG_1080_x_900_px_51_okyess.png",
    category: "Elite Fancy Series",
  },
  {
    id: 47,
    name: "SIREN\n(Box: 10PCS)",
    price: 506,
    actualPrice: 660,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759664706/30CM_LONG_1080_x_900_px_52_h7uk2n.png",
    category: "Elite Fancy Series",
  },
  {
    id: 48,
    name: "JELLY BELLY\n(Box: 10PCS)",
    price: 391,
    actualPrice: 400,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759664705/30CM_LONG_1080_x_900_px_53_l0kgxn.png",
    category: "Elite Fancy Series",
  },
  {
    id: 49,
    name: "TUTI-FROOTI\n(Box: 10PCS)",
    price: 483,
    actualPrice: 500,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759664693/30CM_LONG_1080_x_900_px_54_pfigfn.png",
    category: "Elite Fancy Series",
  },
  {
    id: 50,
    name: "SCOOPS\n(Box: 10PCS)",
    price: 299,
    actualPrice: 350,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759664692/30CM_LONG_1080_x_900_px_55_sedzf9.png",
    category: "Elite Fancy Series",
  },
  {
    id: 51,
    name: "SILVER MOON\n(Box: 10PCS)",
    price: 414,
    actualPrice: 450,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759664694/30CM_LONG_1080_x_900_px_56_gzrjpi.png",
    category: "Elite Fancy Series",
  },
  {
    id: 52,
    name: "MAYAJAL\n(Box: 10PCS)",
    price: 368,
    actualPrice: 420,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759664681/30CM_LONG_1080_x_900_px_57_aitrl5.png",
    category: "Elite Fancy Series",
  },
  {
    id: 53,
    name: "LOLLI POP\n(Box: 10PCS)",
    price: 345,
    actualPrice: 350,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759664691/30CM_LONG_1080_x_900_px_58_upqsss.png",
    category: "Elite Fancy Series",
  },
  {
    id: 54,
    name: "SMALL DRONE\n(Box: 10PCS)",
    price: 368,
    actualPrice: 450,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759664683/30CM_LONG_1080_x_900_px_59_doqirm.png",
    category: "Elite Fancy Series",
  },
  {
    id: 55,
    name: "BIG DRONE\n(Box: 10PCS)",
    price: 345,
    actualPrice: 420,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759664656/30CM_LONG_1080_x_900_px_61_ww7i1o.png",
    category: "Elite Fancy Series",
  },
  {
    id: 56,
    name: "HELICOPTER\n(Box: 10PCS)",
    price: 207,
    actualPrice: 300,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759664661/30CM_LONG_1080_x_900_px_62_zauzi3.png",
    category: "Elite Fancy Series",
  },
  {
    id: 57,
    name: "CHORI CHORI\n(Box: 10PCS)",
    price: 379,
    actualPrice: 500,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759664656/30CM_LONG_1080_x_900_px_63_denyim.png",
    category: "Elite Fancy Series",
  },
  {
    id: 58,
    name: "GOLDEN WARD\n(Box: 10PCS)",
    price: 322,
    actualPrice: 380,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759664655/30CM_LONG_1080_x_900_px_64_anvgs8.png",
    category: "Elite Fancy Series",
  },
  {
    id: 59,
    name: "FUNNY BUNNY\n(Box: 10PCS)",
    price: 379,
    actualPrice: 500,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759664655/30CM_LONG_1080_x_900_px_65_vhdecr.png",
    category: "Elite Fancy Series",
  },
  {
    id: 60,
    name: "PEACOCK\n(Box: 10PCS)",
    price: 230,
    actualPrice: 350,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759664655/30CM_LONG_1080_x_900_px_66_rb8w3k.png",
    category: "Elite Fancy Series",
  },
  {
    id: 61,
    name: "SHAUGAN BIG(ATOM)\n(Box: 10PCS)",
    price: 322,
    actualPrice: 450,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759670010/30CM_LONG_1080_x_900_px_67_w94rhv.png",
    category: "Bombs",
  },
  {
    id: 62,
    name: "CLASSIC (ATOM)\n(Box: 10PCS)",
    price: 172,
    actualPrice: 450,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759670005/30CM_LONG_1080_x_900_px_68_ldttxk.png",
    category: "Bombs",
  },
  {
    id: 63,
    name: "KING KONG(ATOM)\n(Box: 10PCS)",
    price: 172,
    actualPrice: 350,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759670004/30CM_LONG_1080_x_900_px_69_b0lv3t.png",
    category: "Bombs",
  },
  {
    id: 64,
    name: "HYDRO BOMB\n(Box: 10PCS)",
    price: 103,
    actualPrice: 200,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759669992/30CM_LONG_1080_x_900_px_70_ufhybg.png",
    category: "Bombs",
  },
  {
    id: 65,
    name: "ATOM BOMB\n(Box: 10PCS)",
    price: 69,
    actualPrice: 180,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759669988/30CM_LONG_1080_x_900_px_71_z7u7nu.png",
    category: "Bombs",
  },
  {
    id: 66,
    name: "DORA MIRCHI\n(Box: 10PCS)",
    price: 294,
    actualPrice: 350,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759669983/30CM_LONG_1080_x_900_px_72_yl2sij.png",
    category: "Lal Mirchi (Per Bundle)",
  },
  {
    id: 67,
    name: "SMALL PARROT\n(Box: 10PCS)",
    price: 276,
    actualPrice: 350,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759669978/30CM_LONG_1080_x_900_px_73_higk3l.png",
    category: "Lal Mirchi (Per Bundle)",
  },
  {
    id: 68,
    name: "MEDIUM PARROT\n(Box: 10PCS)",
    price: 276,
    actualPrice: 400,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759669974/30CM_LONG_1080_x_900_px_74_mfhejn.png",
    category: "Lal Mirchi (Per Bundle)",
  },
  {
    id: 69,
    name: "HULK\n(Box: 10PCS)",
    price: 294,
    actualPrice: 400,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759669973/30CM_LONG_1080_x_900_px_75_ymmqtf.png",
    category: "Lal Mirchi (Per Bundle)",
  },
  {
    id: 70,
    name: "CAPTAIN AMERICA\n(Box: 10PCS)",
    price: 575,
    actualPrice: 700,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759669962/30CM_LONG_1080_x_900_px_76_wzmzzb.png",
    category: "Lal Mirchi (Per Bundle)",
  },
  {
    id: 71,
    name: "LAXMI\n(Box: 10PCS)",
    price: 345,
    actualPrice: 450,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759669961/30CM_LONG_1080_x_900_px_77_inris1.png",
    category: "Lal Mirchi (Per Bundle)",
  },
  {
    id: 72,
    name: "TIGER\n(Box: 10PCS)",
    price: 575,
    actualPrice: 700,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759669961/30CM_LONG_1080_x_900_px_78_udfrix.png",
    category: "Lal Mirchi (Per Bundle)",
  },
  {
    id: 73,
    name: "2 SOUND\n(Box: 10PCS)",
    price: 575,
    actualPrice: 700,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759669928/30CM_LONG_1080_x_900_px_79_c0mmzs.png",
    category: "Lal Mirchi (Per Bundle)",
  },
  {
    id: 74,
    name: "3 SOUND\n(Box: 10PCS)",
    price: 805,
    actualPrice: 900,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759669928/30CM_LONG_1080_x_900_px_80_a8kn9l.png",
    category: "Lal Mirchi (Per Bundle)",
  },
  {
    id: 75,
    name: "ROMAN LAXMI\n(Box: 10PCS)",
    price: 506,
    actualPrice: 600,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759669927/30CM_LONG_1080_x_900_px_81_hnnd3v.png",
    category: "Lal Mirchi (Per Bundle)",
  },
  {
    id: 76,
    name: "28 CHORSA\n(Box: 10PCS)",
    price: 1150,
    actualPrice: 1500,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759669927/30CM_LONG_1080_x_900_px_85_livxt9.png",
    category: "Lal Mirchi (Per Bundle)",
  },
  {
    id: 77,
    name: "TIGER\n(Box: 10PCS)",
    price: 80,
    actualPrice: 100,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759674229/30CM_LONG_1080_x_900_px_86_odpv1g.png",
    category: "Mirchi Packets",
  },
  {
    id: 78,
    name: "BOAT MIRCHI (100)\n(Box: 10PCS)",
    price: 50,
    actualPrice: 80,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759674229/30CM_LONG_1080_x_900_px_87_cvbnap.png",
    category: "Mirchi Packets",
  },
  {
    id: 79,
    name: "BOAT MIRCHI (50)\n(Box: 10PCS)",
    price: 32,
    actualPrice: 50,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759674228/30CM_LONG_1080_x_900_px_88_nb5ngw.png",
    category: "Mirchi Packets",
  },
  {
    id: 80,
    name: " BABY ROCKETS\n(Box: 10PCS)",
    price: 64,
    actualPrice: 120,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759681095/30CM_LONG_1080_x_900_px_89_ot30se.png",
    category: "Rockets",
  },
  {
    id: 81,
    name: "ROCKET BOMB\n(Box: 10PCS)",
    price: 98,
    actualPrice: 300,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759681095/30CM_LONG_1080_x_900_px_90_fhkhkn.png",
    category: "Rockets",
  },
  {
    id: 82,
    name: "ZITI CORNATION\n(Box: 10PCS)",
    price: 414,
    actualPrice: 650,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759681093/30CM_LONG_1080_x_900_px_91_hks7yr.png",
    category: "Rockets",
  },
  {
    id: 83,
    name: "COSMIC ROCKET\n(Box: 10PCS)",
    price: 333,
    actualPrice: 480,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759681089/30CM_LONG_1080_x_900_px_92_kmuekl.png",
    category: "Rockets",
  },
  {
    id: 84,
    name: "3 SOUND ROCKET\n(Box: 10PCS)",
    price: 207,
    actualPrice: 500,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759681088/30CM_LONG_1080_x_900_px_93_ukgqqj.png",
    category: "Rockets",
  },
  {
    id: 85,
    name: "2 SOUND ROCKET\n(Box: 10PCS)",
    price: 195,
    actualPrice: 450,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759681084/30CM_LONG_1080_x_900_px_94_sx9hdt.png",
    category: "Rockets",
  },
  {
    id: 86,
    name: "LUNIK EXPRESS\n(Box: 10PCS)",
    price: 184,
    actualPrice: 450,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759681081/30CM_LONG_1080_x_900_px_95_jiit36.png",
    category: "Rockets",
  },
  {
    id: 87,
    name: "PANCHA AVATAR\n(Box: 10PCS)",
    price: 299,
    actualPrice: 450,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759681080/30CM_LONG_1080_x_900_px_96_ry3qu8.png",
    category: "Rockets",
  },
  {
    id: 88,
    name: "STAND UP\n(Box: 10PCS)",
    price: 368,
    actualPrice: 500,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759681076/30CM_LONG_1080_x_900_px_97_qipbme.png",
    category: "Rockets",
  },
  {
    id: 89,
    name: "TITO SPECIAL\n(Box: 10PCS)",
    price: 207,
    actualPrice: 320,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759681074/30CM_LONG_1080_x_900_px_98_bbojha.png",
    category: "Rockets",
  },
  {
    id: 90,
    name: "1 SINGLE SHORTS\n(Box: 10PCS)",
    price: 92,
    actualPrice: 200,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759681069/30CM_LONG_1080_x_900_px_99_sczfqr.png",
    category: "Shorts",
  },
  {
    id: 91,
    name: "12 SHORTS\n(Box: 10PCS)",
    price: 287,
    actualPrice: 500,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759681068/30CM_LONG_1080_x_900_px_100_ng7d6q.png",
    category: "Shorts",
  },
  {
    id: 92,
    name: "10 SHORTS\n(Box: 10PCS)",
    price: 230,
    actualPrice: 400,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759682155/30CM_LONG_1080_x_900_px_101_-_2025-10-05T212030.713_ftlg5t.png",
    category: "Shorts",
  },
  {
    id: 93,
    name: "15 SHORTS\n(Box: 10PCS)",
    price: 552,
    actualPrice: 700,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759682145/30CM_LONG_1080_x_900_px_102_-_2025-10-05T212147.392_b8vnpn.png",
    category: "Shorts",
  },
  {
    id: 94,
    name: "30 SHORTS\n(Box: 10PCS)",
    price: 828,
    actualPrice: 1100,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759682143/30CM_LONG_1080_x_900_px_103_-_2025-10-05T212312.178_udh5bf.png",
    category: "Shorts",
  },
  {
    id: 95,
    name: "25 SHORTS\n(Box: 10PCS)",
    price: 368,
    actualPrice: 600,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759682127/30CM_LONG_1080_x_900_px_104_-_2025-10-05T212432.105_yprtau.png",
    category: "Shorts",
  },
  {
    id: 96,
    name: "60 SHORTS\n(Box: 10PCS)",
    price: 1656,
    actualPrice: 2000,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759682125/30CM_LONG_1080_x_900_px_105_-_2025-10-05T212614.046_rzrrso.png",
    category: "Shorts",
  },
  {
    id: 97,
    name: "120 SHORTS\n(Box: 10PCS)",
    price: 3312,
    actualPrice: 3800,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759682126/30CM_LONG_1080_x_900_px_106_-_2025-10-05T212757.315_y5ja8l.png",
    category: "Shorts",
  },
  {
    id: 98,
    name: "2 INCH OUT\n(Box: 10PCS)",
    price: 552,
    actualPrice: 1000,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759682114/30CM_LONG_1080_x_900_px_107_-_2025-10-05T213122.272_iruq9t.png",
    category: "Shorts",
  },
  {
    id: 99,
    name: "3 INCH OUT\n(Box: 10PCS)",
    price: 1104,
    actualPrice: 1500,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759682113/30CM_LONG_1080_x_900_px_108_-_2025-10-05T213227.076_fcy4ov.png",
    category: "Shorts",
  },
  {
    id: 100,
    name: "4 INCH OUT\n(Box: 10PCS)",
    price: 1495,
    actualPrice: 1800,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759682101/30CM_LONG_1080_x_900_px_109_-_2025-10-05T213302.746_p1d3qa.png",
    category: "Shorts",
  },
  {
    id: 101,
    name: "1000 WALA\n(Box: 10PCS)",
    price: 322,
    actualPrice: 650,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759682100/30CM_LONG_1080_x_900_px_110_-_2025-10-05T213513.599_kvf27z.png",
    category: "Garland Crackers",
  },
  {
    id: 102,
    name: "2000 WALA\n(Box: 10PCS)",
    price: 644,
    actualPrice: 850,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759682088/30CM_LONG_1080_x_900_px_112_-_2025-10-05T213831.853_arbrxm.png",
    category: "Garland Crackers",
  },
  {
    id: 103,
    name: "5K WALA\n(Box: 10PCS)",
    price: 1400,
    actualPrice: 2500,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759682077/30CM_LONG_1080_x_900_px_113_-_2025-10-05T213926.735_af40bb.png",
    category: "Garland Crackers",
  },
  {
    id: 104,
    name: "10K WALA\n(Box: 10PCS)",
    price: 2800,
    actualPrice: 7000,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759682076/30CM_LONG_1080_x_900_px_114_-_2025-10-05T214043.948_xrhgnx.png",
    category: "Garland Crackers",
  },
  {
    id: 105,
    name: "GUNS RING CAP\n(Box: 10PCS)",
    price: 69,
    actualPrice: 150,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759682057/30CM_LONG_1080_x_900_px_115_-_2025-10-05T214130.884_tuvy7c.png",
    category: "Others",
  },
  {
    id: 106,
    name: "ROLL CAP GUN\n(Box: 10PCS)",
    price: 62,
    actualPrice: 100,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759682057/30CM_LONG_1080_x_900_px_116_-_2025-10-05T214210.070_esc39k.png",
    category: "Others",
  },
  {
    id: 107,
    name: "ROLLS CAPS (BOX)\n(Box: 10PCS)",
    price: 99,
    actualPrice: 200,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759682056/30CM_LONG_1080_x_900_px_117_-_2025-10-05T214307.517_x0yomf.png",
    category: "Others",
  },
  {
    id: 108,
    name: "RING CAPS (BOX)\n(Box: 10PCS)",
    price: 459,
    actualPrice: 1000,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759682056/30CM_LONG_1080_x_900_px_118_-_2025-10-05T214409.988_yoe5sl.png",
    category: "Others",
  },
  {
    id: 109,
    name: "Diwali Combo\nValue For Money Combo...",
    price: 2000,
    actualPrice: 6000,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759684439/30CM_LONG_1080_x_900_px_-_2025-10-05T223824.036_jhb5xs.png",
    category: "Combo Offers",
  },
  {
    id: 110,
    name: "Diwali Special Combo\nPower Pack...!",
    price: 3000,
    actualPrice: 9000,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759684437/30CM_LONG_1080_x_900_px_-_2025-10-05T224146.039_tptdho.png",
    category: "Combo Offers",
  },
  {
    id: 111,
    name: "Diwali Elite Combo\nComplete Family Pack...",
    price: 5000,
    actualPrice: 14500,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759684436/30CM_LONG_1080_x_900_px_-_2025-10-05T224332.535_oovcoo.png",
    category: "Combo Offers",
  }
];

// ✅ Automatically calculate offer percentage for all products
const productsWithOffers = products.map((p) => {
  const discount = ((p.actualPrice - p.price) / p.actualPrice) * 100;
  return {
    ...p,
    offer: `-${Math.round(discount)}% OFF`,
  };
});

const PROGRESS_COLOR = "#ffd700";

function Shop({ cart, setCart }) {
  const location = useLocation();

const [selectedCategory, setSelectedCategory] = useState(() => {
  if (location?.state?.resetShop) return null;
  return localStorage.getItem("selectedCategory") || null;
});
  const [addedId, setAddedId] = useState(null);
  const addedTimeoutRef = useRef(null);

  // Loader state
  const [loadingImages, setLoadingImages] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [switching, setSwitching] = useState(false); // for transitions

  // Preload images for categories and products (initial load and on category change)
  useEffect(() => {
    let isMounted = true;
    async function loadImages(srcArr) {
      setLoadingImages(true);
      setProgress(0);
      let loadedCount = 0;
      await Promise.all(
        srcArr.map((src) => {
          return new Promise((resolve) => {
            const img = new window.Image();
            img.onload = img.onerror = () => {
              loadedCount += 1;
              if (isMounted)
                setProgress(Math.round((loadedCount / srcArr.length) * 100));
              resolve();
            };
            if ("decode" in img) {
              img.src = src;
              img.decode().then(resolve).catch(resolve);
            } else {
              img.src = src;
            }
          });
        })
      );
      if (isMounted) {
        setProgress(100);
        setTimeout(() => {
          setLoadingImages(false);
          setSwitching(true);
          setTimeout(() => setSwitching(false), 600);
          setFadeIn(true);
          setTimeout(() => setFadeIn(false), 700);
        }, 340);
      }
    }

    // On initial load: preload all
    if (selectedCategory === null) {
      loadImages([
        ...categories.map((cat) => cat.image),
        ...productsWithOffers.map((prod) => prod.image)
      ]);
    } else {
      // On category select: preload only product images of that category
      const catSrcs = productsWithOffers
        .filter((product) => product.category === selectedCategory)
        .map((prod) => prod.image);
      loadImages(catSrcs);
    }

    return () => {
      isMounted = false;
    };
  }, [selectedCategory]);

  // Persist selected category
  useEffect(() => {
    if (selectedCategory) {
      localStorage.setItem("selectedCategory", selectedCategory);
    } else {
      localStorage.removeItem("selectedCategory");
    }
  }, [selectedCategory]);

  // ✅ Handle hardware back button: go back to categories instead of home
  useEffect(() => {
    const handleBack = (event) => {
      if (selectedCategory) {
        event.preventDefault();
        setSelectedCategory(null);
        setSwitching(true);
        setTimeout(() => setSwitching(false), 600);
        setFadeIn(true);
        setTimeout(() => setFadeIn(false), 700);
        window.history.pushState(null, "");
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 0);
      }
    };
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [selectedCategory]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategorySelect = (catName) => {
    setSelectedCategory(catName);
    setSwitching(true);
    setTimeout(() => setSwitching(false), 600);
    setFadeIn(true);
    setTimeout(() => setFadeIn(false), 700);
    window.history.pushState({ category: catName }, "");
    setTimeout(scrollToTop, 0);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSwitching(true);
    setTimeout(() => setSwitching(false), 600);
    setFadeIn(true);
    setTimeout(() => setFadeIn(false), 700);
    setTimeout(scrollToTop, 0);
  };

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setAddedId(product.id);
    if (addedTimeoutRef.current) clearTimeout(addedTimeoutRef.current);
    addedTimeoutRef.current = setTimeout(() => setAddedId(null), 700);
  };

  // Filter products by selected category
  const filteredProducts = productsWithOffers
    .filter((product) => product.category === selectedCategory)
    .slice(0, 20);

  const ShopLoader = () => (
    <div className="shop-loader-root">
      <div className="shop-loader-bar-bg">
        <div
          className="shop-loader-bar"
          style={{
            width: `${progress}%`,
            background: PROGRESS_COLOR,
          }}
        />
      </div>
      <div className="shop-loader-text">
        Loading<span className="loader-dots"><span>.</span><span>.</span><span>.</span></span> {progress}%
      </div>
    </div>
  );

  const fadeClass = fadeIn ? "shop-fade-in" : "";
  const switchClass = switching ? "shop-switching" : "";

  if (loadingImages) {
    return <ShopLoader />;
  }

  return (
    <div className={`shop-root ${fadeClass} ${switchClass}`}>
      {!selectedCategory ? (
        <>
          <h2 className="shop-title">Shop by Product</h2>
          <div className="category-cards-list">
            {categories.map((cat) => (
              <div
                className="category-card"
                key={cat.name}
                onClick={() => handleCategorySelect(cat.name)}
                tabIndex={0}
                role="button"
                aria-label={`View ${cat.name}`}
              >
                <div className="category-img-wrap">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="category-card-img"
                  />
                </div>
                <span className="category-card-name">{cat.name}</span>
                <button
                  className="category-arrow-btn"
                  tabIndex={-1}
                  aria-hidden={true}
                  type="button"
                  style={{ pointerEvents: "none" }}
                >
                  <svg width="34" height="34" viewBox="0 0 24 24">
                    <path
                      d="M9 8l4 4-4 4"
                      stroke="#6342a7"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="shop-header-flex">
            <button
              className="category-back-btn"
              onClick={handleBackToCategories}
            >
              ← Back to Categories
            </button>
            <h2 className="shop-title">{selectedCategory}</h2>
          </div>
          <div className="shop-list">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="shop-item shop-square-card" key={product.id}>
                  <span className="shop-offer-badge">{product.offer}</span>
                  <div className="shop-img-wrap-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="shop-item-img-square"
                    />
                  </div>
                  <div className="shop-item-details">
                    <h3 className="shop-item-name">{product.name}</h3>
                    <div className="shop-item-prices">
                      <span className="shop-item-actualprice">
                        ₹{product.actualPrice}
                      </span>
                      <span className="shop-item-price">₹{product.price}</span>
                    </div>
                    <button
                      className={`shop-item-add${
                        addedId === product.id ? " added" : ""
                      }`}
                      onClick={() => addToCart(product)}
                    >
                      {addedId === product.id ? "Added!" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  textAlign: "center",
                  color: "#6342a7",
                  paddingTop: "2rem",
                }}
              >
                No products available in this category yet.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Shop;
