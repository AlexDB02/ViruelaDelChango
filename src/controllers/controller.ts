import { Request, Response } from "express"
import { changoModel } from "../data/models/changoModels"

export class viruelaController{

    // Obtenener los casos registrados
    public getCasos = async(req: Request, res: Response) => {
        try{
            const casoViruela = await changoModel.find()
            return res.json(casoViruela)

        }catch(error){
            return res.json([])
        }
    }

    // Creación de un nuevo caso
    public crearCaso = async(req: Request, res:  Response) => {
        try{
            const {lat, lng, genre, age} = req.body;
            const nuevoCaso = await changoModel.create({
                lat:lat,
                lng:lng,
                genre:genre,
                age:age
            });

            res.json(nuevoCaso)

        }catch(error){
            res.json({message: "Error creando el registro."})
        }
    }

    // Últimos 7 dias
    public get7dias = async (req: Request, res: Response) => {
        try{
            const lastWeek = new Date();
            lastWeek.setDate(lastWeek.getDate() - 7);

            const casosViruela = await changoModel.find({
            creationDate: { $gte: lastWeek }
            });
            return res.json(casosViruela)
        }catch(error){
            return res.json({message: "Error al solicitar los casos."})
        }
    }

    // Actualizar caso
    public actualizarCaso = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            const { lat, lng, genre, age } = req.body;
            await changoModel.findByIdAndUpdate(id, {
                lat,
                lng,
                genre,
                age
            });
            const casoActualizado = await changoModel.findById(id)
            return res.json(casoActualizado)

        }catch(error){
            return res.json({message: "Error al actualizar el caso."})
        }
    }

    // Eliminar caso
    public eliminarCaso = async (req:Request,res : Response)=>{
        try {
            const { id } = req.params;
            await changoModel.findByIdAndDelete(id);
            return res.json({message:"Caso eleminado con éxito."});
        } catch (error) {
            return res.json({message:"Error al eliminar el caso."});
        }
    }
}