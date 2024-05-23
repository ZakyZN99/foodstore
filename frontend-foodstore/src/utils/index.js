export const formatPrice = (price) => {
    const parts = price.toString().split(".");
    const formattedPrice =
        parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
        (parts[1] ? "," + parts[1] : "");
    return `Rp. ${formattedPrice}`;
};  

export const setSearchQuery = (query) => ({
    type: 'SET_SEARCH_QUERY',
    payload: query,
})