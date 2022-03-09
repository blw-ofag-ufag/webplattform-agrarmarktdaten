import * as React from "react";

import { default as SvgIcMarketEggs } from "./icons-jsx/markets/IcMarketEggs";
import { default as SvgIcMarketSteak } from "./icons-jsx/markets/IcMarketSteak";
import { default as SvgIcMarketFruitVeggie } from "./icons-jsx/markets/IcMarketFruitVeggie";
import { default as SvgIcMarketPotato } from "./icons-jsx/markets/IcMarketPotato";
import { default as SvgIcMarketCow } from "./icons-jsx/markets/IcMarketCow";
import { default as SvgIcMarketGrain } from "./icons-jsx/markets/IcMarketGrain";
import { default as SvgIcMarketMushroom } from "./icons-jsx/markets/IcMarketMushroom";
import { default as SvgIcMarketBioSuisse } from "./icons-jsx/markets/IcMarketBioSuisse";
import { default as SvgIcControlNavDown } from "./icons-jsx/control/IcControlNavDown";
import { default as SvgIcControlNavUp } from "./icons-jsx/control/IcControlNavUp";
import { default as SvgIcControlMenu } from "./icons-jsx/control/IcControlMenu";
import { default as SvgIcControlClose } from "./icons-jsx/control/IcControlClose";
import { default as SvgIcControlArrowLeft } from "./icons-jsx/control/IcControlArrowLeft";
import { default as SvgIcSocialLogoFacebook } from "./icons-jsx/social/IcSocialLogoFacebook";
import { default as SvgIcSocialLogoTwitter } from "./icons-jsx/social/IcSocialLogoTwitter";
import { default as SvgIcSocialLogoYoutube } from "./icons-jsx/social/IcSocialLogoYoutube";
import { default as SvgIcSocialLogoPowerbi } from "./icons-jsx/social/IcSocialLogoPowerbi";
import { default as SvgIcTradeBasket } from "./icons-jsx/trade/IcTradeBasket";
import { default as SvgIcTradeDelivery } from "./icons-jsx/trade/IcTradeDelivery";
import { default as SvgIcTradeTractor } from "./icons-jsx/trade/IcTradeTractor";
import { default as SvgIcTradeTrade } from "./icons-jsx/trade/IcTradeTrade";

export const Icons = {
  egg: SvgIcMarketEggs,
  meat: SvgIcMarketSteak,
  fruit: SvgIcMarketFruitVeggie,
  potato: SvgIcMarketPotato,
  milk: SvgIcMarketCow,
  grain: SvgIcMarketGrain,
  mushroom: SvgIcMarketMushroom,
  bio: SvgIcMarketBioSuisse,
  navDown: SvgIcControlNavDown,
  navUp: SvgIcControlNavUp,
  menu: SvgIcControlMenu,
  close: SvgIcControlClose,
  arrowLeft: SvgIcControlArrowLeft,
  facebook: SvgIcSocialLogoFacebook,
  twitter: SvgIcSocialLogoTwitter,
  youtube: SvgIcSocialLogoYoutube,
  powerbi: SvgIcSocialLogoPowerbi,
  basket: SvgIcTradeBasket,
  delivery: SvgIcTradeDelivery,
  tractor: SvgIcTradeTractor,
  trade: SvgIcTradeTrade,
};

export type IconName = keyof typeof Icons;

export const Icon = ({
  size,
  color,
  name,
  ...props
}: {
  size?: number;
  color?: string;
  name: IconName;
}) => {
  const IconComponent = Icons[name];
  return <IconComponent size={size} color={color} {...props} />;
};
