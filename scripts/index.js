/**
 * Initializes event listeners after the DOM has fully loaded.
 *
 * Once the DOM is ready, this code attaches a "keyup" event listener to the input field 
 * with the ID "index_search_field". The listener checks if the pressed key is "Enter". 
 * If so, it calls the {@link redirectToOfferListWSearch} function to redirect to the offer list 
 * page with the current search query.
 *
 * @listens Document#DOMContentLoaded
 * @see redirectToOfferListWSearch
 */
document.addEventListener("DOMContentLoaded", function () {
  const searchField = document.getElementById("index_search_field");
  if (searchField) {
    searchField.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        redirectToOfferListWSearch();
      }
    });
  }
});

/**
 * Initializes the index page by fetching and rendering the base information.
 * @async
 * @function indexInit
 * @returns {Promise<void>}
 */
async function indexInit() {
  let response = await getBaseInfo();
  if (response.ok) {
    renderBaseInfo(response.data);
  }
}

/**
 * Fetches the base information from the server.
 * @async
 * @function getBaseInfo
 * @returns {Promise<Object>} The response object containing the base information.
 */
async function getBaseInfo() {
  let response = await getData(BASE_INFO_URL);
  if (response.ok) {
    currentUser = response.data;
  } else {
    showToastMessage(true, ["Einige Daten konnten nicht geladen werden"]);
  }
  return response;
}

/**
 * Renders the base information on the index page.
 * @function renderBaseInfo
 * @param {Object} baseInfo - The base information to render.
 */
function renderBaseInfo(baseInfo) {
  for (let key in baseInfo) {
    if (baseInfo.hasOwnProperty(key)) {
      let element = document.getElementById(`base_info_` + key);
      if (element) {
        element.innerText = baseInfo[key];
      }
    }
  }
}

/**
 * Redirects to the offer list page with the search query.
 * @function redirectToOfferListWSearch
 */
function redirectToOfferListWSearch() {
  let inputRef = document.getElementById("index_search_field");
  redirectToOfferList(inputRef.value);
}
