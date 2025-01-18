export default function showRatingHelper(rating) {
    const isInteger = Number.isInteger(rating);

    if (isInteger) {
        return '★'.repeat(rating);
    }

    const baseStars = Math.floor(rating);
    const isMoreThanHalf = Math.round(rating) === Math.ceil(rating);

    if (isMoreThanHalf) {
        return '★'.repeat(baseStars) + '☆';
    }

    return '★'.repeat(baseStars);
}