
 ## Your job is to:
 
 * use async actions to fetch the data from the API 
 * and update the state to reflect the newly fetched data. 
 
 Your application should:
 
 * display an error message to the user if your request fails
 * and display a loading spinner while the data is being fetched.

## Requirements

* When the user submits the search form in the CharacterSearch component, the searchCharacters action should be dispatched.

* The searchCharacters async action is currently just a stub. You need to complete this function so that it makes a request to the Star Wars API, and dispatches the corresponding sync actions at the appropriate times.

	* You should use the search function from src/star-wars.js to make the AJAX request. This returns a promise which resolves with the search result 75% of the time, and fails 25% of the time (allowing you to check your error handling).
	* There is a 0.5s delay introduced in the search function so you can make sure the loading spinner is displayed.

* The reducer is also currently a stub. You should complete this by updating the handlers for each sync action by setting appropriate values for the properties of the state:

	* characters should be an array of character names taken from the resolved promise returned by search.
	* loading should be true when the AJAX request is taking place, or false otherwise.
	* error should be null, or the error string taken from the rejected promise returned by search.
