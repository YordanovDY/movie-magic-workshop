import Cast from "../models/Cast.js";

const castService = {
    getCasts,
    saveCast
}

function getCasts() {
    return Cast.find();
}

function saveCast(castObj) {
    return Cast.create({
        ...castObj,
        age: Number(castObj.age)
    });
}

export default castService;