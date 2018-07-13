// algorithm to calculate new rating of a Stall or an Item, given a new review
function ratingCalculator(obj, newRating) {
	const oldAvgRating = obj.rating
	const oldTotalReviews = Object.keys(obj.reviews).length
	const oldTotalStars = oldAvgRating * oldTotalReviews
	const newTotalStars = oldTotalStars + newRating.rating
	const newTotalReviews = oldTotalReviews + 1
	const newAvgRating = newTotalStars / newTotalReviews
	return newAvgRating
}