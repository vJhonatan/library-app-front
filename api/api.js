export const BASE_URL = 'http://localhost:5162'

export const getBooks = async () => {
    try {

        const response = await fetch(`${BASE_URL}/api/books`, {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        if(!response.ok){
            throw new Error(`GET request failed with status ${response.status}`);
        }
        console.log(response)

        const textData = await response.text();
        const data = JSON.parse(textData);

        return data;

    } catch (error) {

        console.error(error)
        throw error;

    }
}

export const getRents = async () => {
    try {

        const response = await fetch(`${BASE_URL}/api/books/rents`, {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        if(!response.ok){
            throw new Error(`GET request failed with status ${response.status}`);
        }

        const textData = await response.text();
        const data = JSON.parse(textData);

        return data;

    } catch (error) {

        console.error(error)
        throw error;

    }
}

export const postRent = async (bookId, rentData) => {
    try {
        const response = await fetch(`${BASE_URL}/api/books/rent/${bookId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rentData)
        });

        const textData = await response.text();
        const data = textData ? JSON.parse(textData) : {}; 
        
        if(!response.ok){
            return {data, success: false}
        }

        console.log(data);
        return {data, success:true};

    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const putReturnBook = async (bookId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/books/return/${bookId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const textData = await response.text();
        const data = textData ? JSON.parse(textData) : {}; 

        if(!response.ok) {
            return {data, success: false};
        }

        console.log(data);
        return {data, success: true};

    } catch (error) {
        console.error(error);
        throw error;
    }
};
