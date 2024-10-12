
import { atom } from 'jotai'

export let sumPose = atom(0);
export let numItem = atom(0);
export let txt = atom("ttt");

const initialData = {};

export let singleItem = atom({
    catId: "c05",         //"catId": "c05",
    id: "p053",           //"id": "p053",
    name: "Á¦±ø",         //"name": "Á¦±ø",
    price: 30,            //"price": 30,
    qty: 1,               //"qty": 2,
    comment: "",          //"comment": "",
    additems: ["A011", "A022"],          //"additems": []
    subjoinTotalPrice: 0,
    total: 0
})
