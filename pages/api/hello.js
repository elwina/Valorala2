export default async (req, res) => {
    await import("/cmd/update.js").then(async (mo) => {
        await mo.fetchData();
    });

    res.status(200).json({ name: "ok" });
};
