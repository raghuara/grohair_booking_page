const baseApiurl = `https://schoolcommunication-gmdtekepd3g3ffb9.canadacentral-01.azurewebsites.net/api/`;

const growAndGlow = `${baseApiurl}growAndGlow/`;
const getGrowAndGlowAppointments = `${growAndGlow}getGrowAndGlowAppointments`;
const postGrowAndGlowAppointment = `${growAndGlow}postGrowAndGlowAppointment`;
const getAllGrowAndGlowAppointments = `${growAndGlow}getAllGrowAndGlowAppointments`;

export {
    getGrowAndGlowAppointments,
    postGrowAndGlowAppointment,
    getAllGrowAndGlowAppointments
}