import app from "./src/app.js";



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
   console.log(
        `[Uloans Backend Server] server is running http://localhost:${PORT}`
    );
});
