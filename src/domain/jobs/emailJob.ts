import cron from 'node-cron'
import { changoModel } from '../../data/models/changoModels'
import { EmailService } from '../services/emailService';
import { generatemonkeyPoxEmailTemplate } from '../templates/emailTemplate';

const emailService = new EmailService();

export const emailJob = () => {

    cron.schedule("*/10 * * * * *", async ()=>{
        try {
            const viruelaMonos = await changoModel.find({ isSent: false });
            if(!viruelaMonos.length){
                console.log("No hay casos nuevos registrados.");
                return;
            }

            console.log(`Procesando ${viruelaMonos.length} casos.`)

            await Promise.all(
                viruelaMonos.map(async (monkeyPox)=>{
                    console.log(monkeyPox)
                    try {
                        const htmlBody = generatemonkeyPoxEmailTemplate(
                            monkeyPox.lat,
                            monkeyPox.lng,
                            monkeyPox.genre,
                            monkeyPox.age
                        )
                        await emailService.sendEmail({
                            to: "bitfox666@gmail.com",
                            subject: `Detalles de la persona enferma: Género de la persona: ${monkeyPox.genre}, Edad de la persona: ${monkeyPox.age} `,
                            htmlBody: htmlBody
                        });
                        console.log(`Email enviado para el caso con ID: ${monkeyPox._id}`)
                        let updateIncident = {
                            lat: monkeyPox.lat,
                            lng: monkeyPox.lng,
                            genre: monkeyPox.genre,
                            age: monkeyPox.age,
                            isSent: true,
                            creationDate: Date.now()
                        };
    
                        await changoModel.findByIdAndUpdate(monkeyPox._id, updateIncident);
                        console.log(`Caso actualizado para el ID: ${monkeyPox._id}`);
                        
                    } catch (error) {
                        console.error("Error al procesar el caso.")
                    }
                })
            );
            
        } catch (error) {
            console.error("Error al enviar el correo.")
        }
    });
}