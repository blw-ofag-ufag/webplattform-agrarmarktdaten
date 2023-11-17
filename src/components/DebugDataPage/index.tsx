import DebugDataPageDev from "@/components/DebugDataPage/DebugDataPageDev";

const DebugDataPageProd = () => null;

const DebugDataPage = process.env.NODE_ENV === "development" ? DebugDataPageDev : DebugDataPageProd;

export default DebugDataPage;
