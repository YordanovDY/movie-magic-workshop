import Cast from "../models/Cast.js";

const castService = {
    getCasts,
    saveCast
}

function getCasts(filter = {}) {
    let query = Cast.find();

    if(filter.exclude){
        query = query.find({_id: {$nin: filter.exclude}});
    }

    return query;
}

function saveCast(castObj) {
    return Cast.create({
        ...castObj,
        age: Number(castObj.age)
    });
}

export default castService;