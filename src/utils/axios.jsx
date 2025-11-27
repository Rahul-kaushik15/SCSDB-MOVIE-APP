import axios from "axios";

const  instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {accept: 'application/json', Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGZlYTY3NzAzMmFkYzk4Y2Y4NTk3ZmE5ZWVlYjEwNCIsIm5iZiI6MTc2MjQ5MTI4Ny4zMjYwMDAyLCJzdWIiOiI2OTBkN2I5NzlkOTM4YTA2MWY5YWIxNjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-kV0yGzq2mYo9o8v91Pp8NfXFcE8X7UOkxtxqL_m250'}
});

export default instance;