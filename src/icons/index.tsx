import * as React from "react";

import { default as SvgIcControlArrowLeft } from "@/icons/icons-jsx/control/IcControlArrowLeft";
import { default as SvgIcControlClose } from "@/icons/icons-jsx/control/IcControlClose";
import { default as SvgIcControlMenu } from "@/icons/icons-jsx/control/IcControlMenu";
import { default as SvgIcControlNavDown } from "@/icons/icons-jsx/control/IcControlNavDown";
import { default as SvgIcControlNavUp } from "@/icons/icons-jsx/control/IcControlNavUp";
import { default as SvgIcMarketBioSuisse } from "@/icons/icons-jsx/markets/IcMarketBioSuisse";
import { default as SvgIcMarketCow } from "@/icons/icons-jsx/markets/IcMarketCow";
import { default as SvgIcMarketEggs } from "@/icons/icons-jsx/markets/IcMarketEggs";
import { default as SvgIcMarketFruitVeggie } from "@/icons/icons-jsx/markets/IcMarketFruitVeggie";
import { default as SvgIcMarketGrain } from "@/icons/icons-jsx/markets/IcMarketGrain";
import { default as SvgIcMarketMushroom } from "@/icons/icons-jsx/markets/IcMarketMushroom";
import { default as SvgIcMarketPotato } from "@/icons/icons-jsx/markets/IcMarketPotato";
import { default as SvgIcMarketSteak } from "@/icons/icons-jsx/markets/IcMarketSteak";
import { default as SvgIcSocialLogoFacebook } from "@/icons/icons-jsx/social/IcSocialLogoFacebook";
import { default as SvgIcSocialLogoPowerbi } from "@/icons/icons-jsx/social/IcSocialLogoPowerbi";
import { default as SvgIcSocialLogoTwitter } from "@/icons/icons-jsx/social/IcSocialLogoTwitter";
import { default as SvgIcSocialLogoYoutube } from "@/icons/icons-jsx/social/IcSocialLogoYoutube";
import { default as SvgIcTradeBasket } from "@/icons/icons-jsx/trade/IcTradeBasket";
import { default as SvgIcTradeDelivery } from "@/icons/icons-jsx/trade/IcTradeDelivery";
import { default as SvgIcTradeTractor } from "@/icons/icons-jsx/trade/IcTradeTractor";
import { default as SvgIcTradeTrade } from "@/icons/icons-jsx/trade/IcTradeTrade";

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
