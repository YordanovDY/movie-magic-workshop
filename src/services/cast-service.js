import Cast from "../models/Cast.js";

const castService = {
    saveCast,
}

function saveCast(castObj) {
    return Cast.create({
        ...castObj,
        age: Number(castObj.age)
    });
}

export default castService;