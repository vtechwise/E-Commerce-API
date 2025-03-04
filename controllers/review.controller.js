
const getAllReviews = async (req, res) => {
    res.send('get all reviews ')
}

const getSingleReview = async (req, res) => {
    res.send('get signle review ')
}

const createReview = async(req, res) =>{
    res.send('create review ')
}

const updateReview = async (req, res) => {
    res.send('update review ')
}

const deleteReview = async (req, res) => {
    res.send('delete review ')
}


module.exports = {
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  createReview,
};