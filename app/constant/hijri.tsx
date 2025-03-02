
import moment from "moment-hijri";

export const HIJRI_MONTHS = [
    "Muharram",
    "Safar",
    "Rabi'ul-Awwal",
    "Rabi'ul-Akhir",
    "Jamadil-Awwal",
    "Jamadil-Akhir",
    "Rejab",
    "Syaaban",
    "Ramadan",
    "Syawal",
    "Zul-Qaidah",
    "Zul-Hijjah",
];


export const hijriToday = () => {
    const today = moment();
    return today.subtract(1, "day");
}