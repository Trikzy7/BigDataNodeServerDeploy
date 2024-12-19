const mongoose = require('mongoose');
const fs = require('fs');

// Configuration MongoDB
const uri = "mongodb+srv://theo:theopassword@cluster0.bmdk5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connexion à MongoDB avec Mongoose
mongoose.connect(`${uri}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// Définition des schémas Mongoose dynamiques
const createSchema = () => ({
    date: { type: String, required: true, unique: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
});

// Création de modèles dynamiques pour chaque type de donnée
const getModel = (type) => {
    const modelName = `${type.charAt(0).toUpperCase() + type.slice(1)}Data`;
    if (mongoose.models[modelName]) {
        return mongoose.models[modelName];
    }
    const schema = new mongoose.Schema(createSchema(), { collection: type });
    return mongoose.model(modelName, schema);
};

// Fonction pour insérer les données dans MongoDB
const insertDataToMongoDB = async (jsonFilePath) => {
    try {
        // Lecture du fichier JSON
        const rawData = fs.readFileSync(jsonFilePath);
        const data = JSON.parse(rawData);

        // Parcourir les dates et insérer les données par type
        for (const [date, details] of Object.entries(data)) {
            for (const [dataType, dataValue] of Object.entries(details)) {
                const Model = getModel(dataType); // Obtenir ou créer le modèle pour le type
                await Model.updateOne(
                    { date: date }, // Rechercher par date
                    { $set: { date: date, data: dataValue } }, // Mettre à jour ou insérer les données
                    { upsert: true } // Insérer si aucun document n'existe
                );
            }
        }
        console.log("Data successfully inserted/updated!");
    } catch (err) {
        console.error("Error inserting data:", err);
    } finally {
        mongoose.connection.close(); // Fermer la connexion après insertion
    }
};

// Chemin du fichier JSON
const jsonFilePath = './data.json';

// Lancer l'insertion
insertDataToMongoDB(jsonFilePath);
