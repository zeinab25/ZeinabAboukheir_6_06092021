//Request data from Json file

const fetchPhotographers = async () => {
	try {
		const response = await fetch("./api/photographers.json");
		if (!response.ok) {
			throw new Error(`Erreur HTTP ! statut : ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.log(error);
	}
};

export { fetchPhotographers };
