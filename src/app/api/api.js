export const apiURL = "https://public.opendatasoft.com/api/explore/v2.1";
export const queryParams = {
    catalog:"catalog",
    datasets:"datasets",
    records:"records",
    datasetsList:{
        cars:"all-vehicles-model"
    }
}
// export const getTotalCarModels = async (carModel) => {
//
//     await fetch(`${apiURL}/catalog/datasets/all-vehicles-model/records?select=model%2C%20count(model)&group_by=model&limit=100&offset=0&refine=make%3A${carModel}`)
//         .then((res) => res.json())
//         .then((data) => {
//             setNumOfResults(data.results.length);
//             setListCar(data.results);
//             setIsLoading(false);
//         })
// }