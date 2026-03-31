// Personal 45             103(ban) 201 202(ban) 208 301 302 308
// Doble 65                104 203 303
// Doble Familiar 75       207 
// Matrimonial 60          101 102 204 205 304(ban) 305 307 
// Matrimonial Simple 50   105 106
// Triple Familiar 100     206 306

import { Client, DayComment, Pay, Reservation, Room } from "@/generated/prisma/browser";


export const seedCompanies = [
  { name:'ABC CARGAS', dayPrice: 40, chassisList:[] },
]

export const seedOrigins = {
  'Argentina': false,
  'Alemania': false,
  'Australia': false,
  'Belgica': false,
  'Bolivia': false,
  'Brasil': false,
  'Canada': false,
  'Colombia': false,
  'Corea del Sur': false,
  'Costa Rica': false,
  'Chile': false,
  'China': false,
  'Ecuador': false,
  'EEUU': false,
  'España': false,
  'Francia': false,
  'India': false,
  'Israel': false,
  'Italia': false,
  'Japon': false,
  'Mexico': false,
  'Holanda': false,
  'Panama': false,
  'Reino Unido': false,
  'Rusia': false,
  'Suiza': false,
  'Uruguay': false,
  'Venezuela': false,
  'Africa': false,
  'America': false,
  'Asia': false,
  'Europa': false,
  'Oceania': false,

  'Lima Metropolitana': true,
  'Region Lima': true,
  'Amazonas': true,
  'Ancash': true,
  'Apurimac': true,
  'Arequipa': true,
  'Ayacucho': true,
  'Cajamarca': true,
  'Cusco': true,
  'Huancavelica': true,
  'Huanuco': true,
  'Ica': true,
  'Junin': true,
  'La Libertad': true,
  'Lambayeque': true,
  'Loreto': true,
  'Madre de Dios': true,
  'Moquegua': true,
  'Pasco': true,
  'Piura': true,
  'Puno': true,
  'San Martin': true,
  'Tacna': true,
  'Tumbes': true,
  'Ucayali': true,
}



export const seedUsers = [
  {
    name:'Diana',
    lastName: 'Arucutipa',
    email: 'dianaarucutipa@diamante.com',
    password: 'D1@nita_',
  },
  {
    name:'Luz',
    lastName: 'Marina',
    email: 'luzmarina@diamante.com',
    password: 'LuzM@rin4',
  },
]

export const seedRooms:Omit<Room,'status'>[] = [

  { number: 101, floor: 1, posW: 80, posH: 7, price: 60, type: "Matrimonial",active: false,  },
  { number: 201, floor: 2, posW: 83, posH: 47, price: 45, type: "Matrimonial",active: true,  },
  { number: 301, floor: 3, posW: 83, posH: 47, price: 60, type: "Matrimonial",active: true,  },

  { number: 102, floor: 1, posW: 27, posH: 7, price: 80, type: "Doble_Familiar",active: true,  },
  { number: 202, floor: 2, posW: 83, posH: 34, price: 60, type: "Matrimonial",active: true,  },
  { number: 302, floor: 3, posW: 83, posH: 34, price: 60, type: "Matrimonial",active: true,  },

  { number: 103, floor: 1, posW: 27, posH: 35, price: 45, type: "Matrimonial",active: false,  },
  { number: 203, floor: 2, posW: 74, posH: 7, price: 60, type: "Matrimonial",active: true,  },
  { number: 303, floor: 3, posW: 74, posH: 7, price: 80, type: "Doble_Familiar",active: true,  },

  { number: 204, floor: 2, posW: 27, posH: 7, price: 70, type: "Doble",active: true,  },
  { number: 304, floor: 3, posW: 27, posH: 7, price: 90, type: "Triple",active: true,  },

  { number: 205, floor: 2, posW: 21, posH: 35, price: 80, type: "Doble_Familiar",active: true,  },
  { number: 305, floor: 3, posW: 33, posH: 45, price: 120, type: "Cuadruple",active: true,  },

  { number: 206, floor: 2, posW: 28, posH: 49, price: 90, type: "Triple",active: true,  },

  { number: 207, floor: 2, posW: 25, posH: 76, price:90, type: "Triple",active: true,  },
  { number: 307, floor: 3, posW: 25, posH: 76, price:80, type: "Doble_Familiar",active: true, },

  { number: 208, floor: 2, posW: 24, posH: 92, price: 100, type: "Triple_Familiar",active: true,  },
  { number: 308, floor: 3, posW: 24, posH: 92, price: 100, type: "Triple_Familiar",active: true,  },

  { number: 209, floor: 2, posW: 83, posH: 92, price:80, type: "Doble_Familiar",active: true,  },
  { number: 309, floor: 3, posW: 83, posH: 92, price:80, type: "Doble_Familiar",active: true, },

  { number: 210, floor: 2, posW: 83, posH: 78.5, price: 60, type: "Matrimonial",active: true,  },
  { number: 310, floor: 3, posW: 83, posH: 78.5, price: 50, type: "Simple",active: true,  },
];

export const seedFloors = [
    {
      number: 1,
      name: "Piso 1",
      src: "/piso_1.webp", // Ajustar ruta según tu proyecto
      rooms: seedRooms
        .filter(r => r.floor === 1)
        .map(r => ({ ...r, status: "free" as const, comment: "" }))
    },
    {
      number: 2,
      name: "Piso 2",
      src: "/piso_2_3.webp",
      rooms: seedRooms
        .filter(r => r.floor === 2)
        .map(r => ({ ...r, status: "free" as const, comment: "" }))
    },
    {
      number: 3,
      name: "Piso 3",
      src: "/piso_2_3.webp",
      rooms: seedRooms
        .filter(r => r.floor === 3)
        .map(r => ({ ...r, status: "free" as const, comment: "" }))
    }
  ]




export const seedRoomActives=  [
  // --- PISO 1 ---
  { room: 101, active: true, dateCreated: new Date(), description: "Cama Matrimonial con cabecera de madera" },
  { room: 101, active: true, dateCreated: new Date(), description: "Televisor Samsung 43 pulgadas con soporte" },
  { room: 101, active: true, dateCreated: new Date(), description: "Frigobar Miray 90L" },
  
  { room: 102, active: true, dateCreated: new Date(), description: "Cama Matrimonial con base metálica" },
  { room: 102, active: true, dateCreated: new Date(), description: "Ropero de cedro de dos cuerpos" },

  { room: 103, active: false, dateCreated: new Date(), description: "Cama Personal simple con colchón de espuma" },

  { room: 104, active: true, dateCreated: new Date(), description: "Dos camas individuales de plaza y media" },
  { room: 104, active: true, dateCreated: new Date(), description: "Mesa de noche de melamina color nogal" },
  { room: 104, active: true, dateCreated: new Date(), description: "Silla de madera barnizada" },
  { room: 104, active: true, dateCreated: new Date(), description: "Espejo de pared de cuerpo entero" },

  { room: 105, active: true, dateCreated: new Date(), description: "Cama Matrimonial Simple con sábanas blancas" },
  { room: 105, active: true, dateCreated: new Date(), description: "Ventilador de torre silencioso" },

  { room: 106, active: true, dateCreated: new Date(), description: "Cama Matrimonial Simple" },

  // --- PISO 2 ---
  { room: 201, active: true, dateCreated: new Date(), description: "Cama Personal con colchón Paraíso" },
  { room: 201, active: true, dateCreated: new Date(), description: "Escritorio pequeño para laptop" },

  { room: 202, active: false, dateCreated: new Date(), description: "Cama Personal en proceso de reparación" },

  { room: 203, active: true, dateCreated: new Date(), description: "Juego de dos camas de plaza y media" },
  { room: 203, active: true, dateCreated: new Date(), description: "Televisor LG de 32 pulgadas" },

  { room: 204, active: true, dateCreated: new Date(), description: "Cama Matrimonial King Size con protector" },
  { room: 204, active: true, dateCreated: new Date(), description: "Sillón individual tapizado en color gris" },
  { room: 204, active: true, dateCreated: new Date(), description: "Lámpara de pie con luz cálida" },

  { room: 205, active: true, dateCreated: new Date(), description: "Cama Matrimonial Queen" },
  { room: 205, active: true, dateCreated: new Date(), description: "Estante metálico para maletas" },

  { room: 206, active: true, dateCreated: new Date(), description: "Tres camas individuales de una plaza" },
  { room: 206, active: true, dateCreated: new Date(), description: "Mesa de centro circular de madera" },
  { room: 206, active: true, dateCreated: new Date(), description: "Cuadro decorativo de paisaje andino" },
  { room: 206, active: true, dateCreated: new Date(), description: "Aire acondicionado tipo Split" },

  { room: 207, active: true, dateCreated: new Date(), description: "Dos camas dobles de tamaño familiar" },
  { room: 207, active: true, dateCreated: new Date(), description: "Caja fuerte digital empotrada" },

  { room: 208, active: true, dateCreated: new Date(), description: "Cama Personal básica" },

  // --- PISO 3 ---
  { room: 301, active: true, dateCreated: new Date(), description: "Cama Personal estándar" },
  { room: 302, active: true, dateCreated: new Date(), description: "Cama Personal estándar" },
  
  { room: 303, active: true, dateCreated: new Date(), description: "Par de camas dobles" },
  { room: 303, active: true, dateCreated: new Date(), description: "Teléfono fijo para comunicación interna" },

  { room: 304, active: false, dateCreated: new Date(), description: "Cama Matrimonial fuera de servicio" },

  { room: 305, active: true, dateCreated: new Date(), description: "Cama Matrimonial Premium" },
  { room: 305, active: true, dateCreated: new Date(), description: "Alfombra decorativa de lana" },

  { room: 306, active: true, dateCreated: new Date(), description: "Tres camas individuales" },
  { room: 306, active: true, dateCreated: new Date(), description: "Horno microondas pequeño" },

  { room: 307, active: true, dateCreated: new Date(), description: "Cama Matrimonial con vista exterior" },
  { room: 307, active: true, dateCreated: new Date(), description: "Hervidor eléctrico de acero inoxidable" },

  { room: 308, active: true, dateCreated: new Date(), description: "Cama Personal básica" }
];


export const seedCountries = [
  { id: "PE", flag: "🇵🇪", name: "Peru" },
  { id: "CL", flag: "🇨🇱", name: "Chile" },
  { id: "US", flag: "🇺🇸", name: "Estados Unidos" },
  { id: "EC", flag: "🇪🇨", name: "Ecuador" },
  { id: "BO", flag: "🇧🇴", name: "Bolivia" },
  { id: "BR", flag: "🇧🇷", name: "Brasil" },
  { id: "CO", flag: "🇨🇴", name: "Colombia" },
  { id: "ES", flag: "🇪🇸", name: "España" },
  { id: "AR", flag: "🇦🇷", name: "Argentina" },
  { id: "MX", flag: "🇲🇽", name: "Mexico" },
  { id: "FR", flag: "🇫🇷", name: "Francia" },
  { id: "DE", flag: "🇩🇪", name: "Alemania" },
  { id: "CA", flag: "🇨🇦", name: "Canada" },
];

export const seedCities = [
  { name: "Amazonas", countryId: "PE" },
  { name: "Arequipa", countryId: "PE" },
  { name: "Ayacucho", countryId: "PE" },
  { name: "Cajamarca", countryId: "PE" },
  { name: "Callao", countryId: "PE" },
  { name: "Cusco", countryId: "PE" },
  { name: "Huancavelica", countryId: "PE" },
  { name: "Ica", countryId: "PE" },
  { name: "La Libertad", countryId: "PE" },
  { name: "Lambayeque", countryId: "PE" },
  { name: "Lima", countryId: "PE" },
  { name: "Loreto", countryId: "PE" },
  { name: "Madre de Dios", countryId: "PE" },
  { name: "Moquegua", countryId: "PE" },
  { name: "Pasco", countryId: "PE" },
  { name: "Piura", countryId: "PE" },
  { name: "Puno", countryId: "PE" },
  { name: "Tacna", countryId: "PE" },
  { name: "Tumbes", countryId: "PE" },
  { name: "Ucayali", countryId: "PE" },

  { name: "Arica", countryId: "CL" },
  { name: "Iquique", countryId: "CL" },
  { name: "Santiago", countryId: "CL" },

  { name: "Guayaquil", countryId: "EC" },
  { name: "Quito", countryId: "EC" },

  { name: "Copacabana", countryId: "BO" },
  { name: "La Paz", countryId: "BO" },
  { name: "Santa Cruz", countryId: "BO" },

  { name: "Leticia", countryId: "CO" }
];

export const seedClients: Omit<Client, 'id' | 'createdAt' >[] = [
  { typeDocument: "DNI", numberDocument: "71799919", firstName: "carlos", lastName: "condori", countryId: "PE", stars: 4.5, totalStays: 2, lastStay: new Date("2026-01-10"), address: "Psj Federico Barreto 370", phone: "936664619", comments: "", born: new Date("1995-10-26"), banned: true, banReason: "Se meo en la cama y la almohada" },
  { typeDocument: "DNI", numberDocument: "60708011", firstName: "mateo", lastName: "quispe", countryId: "PE", stars: 4.5, totalStays: 2, lastStay: new Date("2026-01-10"), address: "Calle Loreto 456", phone: "987654321", comments: "Viaja con sus padres", born: new Date("2012-05-20"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "55443322", firstName: "valentina", lastName: "soto", countryId: "CL", stars: 0.0, totalStays: 1, lastStay: new Date("2025-11-15"), address: null, phone: null, comments: null, born: new Date("2015-08-12"), banned: false, banReason: null },
  { typeDocument: "Pasaporte", numberDocument: "G99887766", firstName: "liam", lastName: "miller", countryId: "US", stars: 3.2, totalStays: 1, lastStay: new Date("2026-02-05"), address: null, phone: null, comments: "Requiere cuna", born: new Date("2024-01-30"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "11224455", firstName: "thiago", lastName: "messi", countryId: "AR", stars: 5.0, totalStays: 4, lastStay: new Date("2026-03-01"), address: "Rosario 10", phone: "1122334455", comments: null, born: new Date("2012-11-02"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "33442211", firstName: "sofia", lastName: "loren", countryId: "ES", stars: 4.8, totalStays: 2, lastStay: new Date("2025-12-20"), address: "Madrid Central", phone: "611223344", comments: null, born: new Date("2010-04-15"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "77889900", firstName: "lucas", lastName: "neto", countryId: "BR", stars: 2.5, totalStays: 1, lastStay: new Date("2026-01-20"), address: null, phone: null, comments: "Fan de los videojuegos", born: new Date("2014-07-22"), banned: false, banReason: null },
  { typeDocument: "Pasaporte", numberDocument: "H12345678", firstName: "chloe", lastName: "dupont", countryId: "FR", stars: 0.0, totalStays: 0, lastStay: null, address: null, phone: null, comments: null, born: new Date("2021-09-10"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "44556611", firstName: "isabella", lastName: "castillo", countryId: "CO", stars: 3.9, totalStays: 2, lastStay: new Date("2025-10-30"), address: "Bogotá", phone: "310998877", comments: null, born: new Date("2011-12-05"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "99001188", firstName: "sebastian", lastName: "vettel", countryId: "DE", stars: 4.2, totalStays: 3, lastStay: new Date("2026-02-14"), address: null, phone: null, comments: "Menor acompañado", born: new Date("2009-03-14"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "22331144", firstName: "martina", lastName: "stoessel", countryId: "AR", stars: 5.0, totalStays: 5, lastStay: new Date("2026-03-05"), address: null, phone: null, comments: "VIP Junior", born: new Date("2013-05-21"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "88771122", firstName: "joaquin", lastName: "sabina", countryId: "ES", stars: 1.5, totalStays: 1, lastStay: new Date("2025-08-10"), address: null, phone: null, comments: null, born: new Date("2016-10-12"), banned: false, banReason: null },
  { typeDocument: "Pasaporte", numberDocument: "K77665544", firstName: "oliver", lastName: "twist", countryId: "CA", stars: 0.0, totalStays: 1, lastStay: new Date("2026-01-05"), address: null, phone: null, comments: "Pidió más comida", born: new Date("2017-02-18"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "33119988", firstName: "antonella", lastName: "roccuzzo", countryId: "AR", stars: 4.7, totalStays: 2, lastStay: new Date("2026-02-28"), address: null, phone: "1199887766", comments: null, born: new Date("2010-06-25"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "44992233", firstName: "gabriel", lastName: "garcia", countryId: "MX", stars: 3.1, totalStays: 1, lastStay: new Date("2025-11-11"), address: null, phone: null, comments: null, born: new Date("2014-03-06"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "55110022", firstName: "florencia", lastName: "bermudez", countryId: "EC", stars: 2.8, totalStays: 1, lastStay: new Date("2026-01-15"), address: "Guayaquil", phone: null, comments: null, born: new Date("2012-08-30"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "10204050", firstName: "benjamin", lastName: "vicuña", countryId: "CL", stars: 3.5, totalStays: 3, lastStay: new Date("2026-02-20"), address: null, phone: null, comments: "Hijo de cliente frecuente", born: new Date("2011-01-12"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "90807060", firstName: "luna", lastName: "bella", countryId: "BO", stars: 4.0, totalStays: 1, lastStay: new Date("2025-09-05"), address: null, phone: "72233445", comments: null, born: new Date("2018-11-20"), banned: false, banReason: null },
  { typeDocument: "Pasaporte", numberDocument: "L33445566", firstName: "noah", lastName: "schnapp", countryId: "US", stars: 4.3, totalStays: 2, lastStay: new Date("2026-03-01"), address: null, phone: null, comments: null, born: new Date("2009-10-03"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "77661100", firstName: "macaulay", lastName: "culkin", countryId: "US", stars: 1.0, totalStays: 1, lastStay: new Date("2025-12-24"), address: "Chicago", phone: null, comments: "Se quedó solo en casa", born: new Date("2015-08-26"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "12332144", firstName: "pablito", lastName: "ruiz", countryId: "PE", stars: 3.4, totalStays: 2, lastStay: new Date("2026-02-15"), address: "Arequipa", phone: "955443322", comments: "Acompañante menor", born: new Date("2013-12-12"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "10203040", firstName: "juan", lastName: "perez", countryId: "PE", stars: 5.0, totalStays: 3, lastStay: new Date("2025-12-20"), address: "Av. Ejercito 123", phone: "958473625", comments: "Cliente frecuente", born: new Date("1985-05-15"), banned: false, banReason: null },
  { typeDocument: "Pasaporte", numberDocument: "A98765432", firstName: "john", lastName: "smith", countryId: "US", stars: 0.0, totalStays: 1, lastStay: new Date("2026-01-15"), address: null, phone: null, comments: null, born: new Date("1992-08-22"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "20304050", firstName: "maria", lastName: "garcia", countryId: "ES", stars: 4.2, totalStays: 2, lastStay: new Date("2025-11-10"), address: "Calle Mayor 45", phone: "600123456", comments: null, born: new Date("1978-03-10"), banned: false, banReason: null },
  { typeDocument: "Carnet_Extranjeria", numberDocument: "001234567", firstName: "hans", lastName: "muller", countryId: "DE", stars: 0.0, totalStays: 0, lastStay: null, address: null, phone: null, comments: "Solicitó habitación en piso alto", born: new Date("1988-11-30"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "30405060", firstName: "carlos", lastName: "rodriguez", countryId: "AR", stars: 2.5, totalStays: 5, lastStay: new Date("2026-02-01"), address: "Av. Corrientes 800", phone: "114567890", comments: null, born: new Date("1975-07-04"), banned: true, banReason: "Daños en mobiliario" },
  { typeDocument: "DNI", numberDocument: "40506070", firstName: "lucia", lastName: "fernandez", countryId: "CL", stars: 3.8, totalStays: 2, lastStay: new Date("2025-09-12"), address: null, phone: "912345678", comments: null, born: new Date("1995-12-12"), banned: false, banReason: null },
  { typeDocument: "Pasaporte", numberDocument: "F55443322", firstName: "pierre", lastName: "dubois", countryId: "FR", stars: 0.0, totalStays: 1, lastStay: new Date("2026-03-01"), address: null, phone: null, comments: "Habla poco español", born: new Date("1982-01-25"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "50607080", firstName: "ana", lastName: "silva", countryId: "BR", stars: 4.9, totalStays: 4, lastStay: new Date("2025-12-30"), address: "Rua Augusta 100", phone: null, comments: null, born: new Date("1990-04-18"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "60708090", firstName: "luis", lastName: "torres", countryId: "MX", stars: 1.2, totalStays: 1, lastStay: new Date("2026-01-20"), address: null, phone: "551234567", comments: null, born: new Date("1980-09-30"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "70809010", firstName: "elena", lastName: "mendoza", countryId: "CO", stars: 3.5, totalStays: 2, lastStay: new Date("2025-10-15"), address: "Carrera 7 40", phone: null, comments: "Alergia a las plumas", born: new Date("1987-06-14"), banned: false, banReason: null },
  { typeDocument: "Pasaporte", numberDocument: "C11223344", firstName: "robert", lastName: "wilson", countryId: "CA", stars: 0.0, totalStays: 0, lastStay: null, address: null, phone: null, comments: null, born: new Date("1970-10-05"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "80901020", firstName: "sofia", lastName: "vaca", countryId: "BO", stars: 2.1, totalStays: 1, lastStay: new Date("2025-08-22"), address: "Calle Libertad 12", phone: "71234567", comments: null, born: new Date("2000-02-29"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "90102030", firstName: "ricardo", lastName: "paredes", countryId: "EC", stars: 0.0, totalStays: 3, lastStay: new Date("2026-02-14"), address: null, phone: null, comments: "Viaje de negocios", born: new Date("1993-11-14"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "11223344", firstName: "diego", lastName: "sanchez", countryId: "PE", stars: 4.7, totalStays: 6, lastStay: new Date("2026-03-05"), address: "Urb. Yanahuara G-5", phone: "944556677", comments: null, born: new Date("1984-03-25"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "99887766", firstName: "laura", lastName: "castro", countryId: "CO", stars: 0.0, totalStays: 0, lastStay: null, address: null, phone: null, comments: null, born: new Date("2004-01-10"), banned: false, banReason: null },
  { typeDocument: "Pasaporte", numberDocument: "B77665544", firstName: "yuki", lastName: "tanaka", countryId: "US", stars: 5.0, totalStays: 2, lastStay: new Date("2026-01-05"), address: null, phone: null, comments: "Requiere traductor", born: new Date("1996-02-12"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "55667788", firstName: "marcos", lastName: "lopez", countryId: "AR", stars: 3.2, totalStays: 4, lastStay: new Date("2025-12-15"), address: "Calle Florida 450", phone: "1155443322", comments: null, born: new Date("1989-07-20"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "44332211", firstName: "alessandro", lastName: "rossi", countryId: "ES", stars: 4.5, totalStays: 1, lastStay: new Date("2026-02-10"), address: null, phone: "3902123456", comments: "Amante del buen vino", born: new Date("1983-04-05"), banned: false, banReason: null },
  { typeDocument: "Pasaporte", numberDocument: "E99001122", firstName: "sarah", lastName: "connor", countryId: "US", stars: 2.8, totalStays: 2, lastStay: new Date("2025-11-20"), address: null, phone: null, comments: "Seguridad reforzada", born: new Date("1975-11-11"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "66778899", firstName: "gabriela", lastName: "mistral", countryId: "CL", stars: 4.1, totalStays: 3, lastStay: new Date("2026-01-30"), address: "Av. Vicuña Mackenna", phone: "988776655", comments: null, born: new Date("1998-05-30"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "12123434", firstName: "fernando", lastName: "alonso", countryId: "ES", stars: 5.0, totalStays: 10, lastStay: new Date("2026-03-01"), address: "Oviedo 33", phone: null, comments: "VIP", born: new Date("1981-07-29"), banned: false, banReason: null },
  { typeDocument: "Carnet_Extranjeria", numberDocument: "009988771", firstName: "vladimir", lastName: "ivanov", countryId: "DE", stars: 1.5, totalStays: 1, lastStay: new Date("2025-10-05"), address: null, phone: null, comments: null, born: new Date("1990-01-01"), banned: true, banReason: "Comportamiento agresivo" },
  { typeDocument: "DNI", numberDocument: "22334455", firstName: "camila", lastName: "vallejo", countryId: "CL", stars: 3.9, totalStays: 2, lastStay: new Date("2025-12-01"), address: null, phone: null, comments: null, born: new Date("1988-04-28"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "88776655", firstName: "miguel", lastName: "grau", countryId: "PE", stars: 5.0, totalStays: 100, lastStay: new Date("2026-03-08"), address: "Paita 456", phone: "999888777", comments: "Caballero de los mares", born: new Date("1834-07-27"), banned: false, banReason: null },
  { typeDocument: "Pasaporte", numberDocument: "G11224466", firstName: "emma", lastName: "watson", countryId: "CA", stars: 4.8, totalStays: 3, lastStay: new Date("2026-02-15"), address: null, phone: null, comments: null, born: new Date("1990-04-15"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "77664433", firstName: "javier", lastName: "milei", countryId: "AR", stars: 2.2, totalStays: 1, lastStay: new Date("2026-01-10"), address: null, phone: null, comments: "Pidió no ruidos", born: new Date("1970-10-22"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "33445566", firstName: "isabella", lastName: "rossellini", countryId: "FR", stars: 4.6, totalStays: 2, lastStay: new Date("2025-08-15"), address: null, phone: null, comments: null, born: new Date("1952-06-18"), banned: false, banReason: null },
  { typeDocument: "Pasaporte", numberDocument: "K00991122", firstName: "li", lastName: "wei", countryId: "US", stars: 3.4, totalStays: 5, lastStay: new Date("2026-02-28"), address: null, phone: "8613800001", comments: "Desayuno tradicional", born: new Date("1995-03-20"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "10109090", firstName: "esteban", lastName: "quito", countryId: "EC", stars: 1.0, totalStays: 1, lastStay: new Date("2025-07-20"), address: "Quito Central", phone: null, comments: "Queja por almohadas", born: new Date("1990-05-05"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "54546565", firstName: "andrea", lastName: "pirlo", countryId: "ES", stars: 4.9, totalStays: 4, lastStay: new Date("2026-03-02"), address: null, phone: null, comments: null, born: new Date("1979-05-19"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "67678989", firstName: "sofia", lastName: "vergara", countryId: "CO", stars: 4.3, totalStays: 6, lastStay: new Date("2026-01-12"), address: "Barranquilla", phone: null, comments: null, born: new Date("1972-07-10"), banned: false, banReason: null },
  { typeDocument: "Pasaporte", numberDocument: "M12348765", firstName: "hans", lastName: "zimmer", countryId: "DE", stars: 5.0, totalStays: 2, lastStay: new Date("2025-11-30"), address: null, phone: null, comments: "Habitación insonorizada", born: new Date("1957-09-12"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "45612378", firstName: "karina", lastName: "vargas", countryId: "PE", stars: 3.7, totalStays: 3, lastStay: new Date("2026-02-18"), address: "Miraflores 987", phone: "911223344", comments: null, born: new Date("1994-02-14"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "99008811", firstName: "roberto", lastName: "gomez", countryId: "MX", stars: 5.0, totalStays: 50, lastStay: new Date("2025-12-31"), address: "Vecindad 72", phone: null, comments: "No contaban con su astucia", born: new Date("1929-02-21"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "78123490", firstName: "lucas", lastName: "moura", countryId: "BR", stars: 2.9, totalStays: 2, lastStay: new Date("2026-01-05"), address: null, phone: null, comments: null, born: new Date("1992-08-13"), banned: false, banReason: null },
  { typeDocument: "Pasaporte", numberDocument: "P44556677", firstName: "clara", lastName: "oswald", countryId: "CA", stars: 4.0, totalStays: 1, lastStay: new Date("2025-09-10"), address: null, phone: null, comments: "Imposible de encontrar", born: new Date("1986-04-27"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "34901234", firstName: "martin", lastName: "vizcarra", countryId: "PE", stars: 1.8, totalStays: 4, lastStay: new Date("2026-02-20"), address: "Moquegua", phone: null, comments: null, born: new Date("1963-03-22"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "65432198", firstName: "elena", lastName: "papamichail", countryId: "ES", stars: 3.1, totalStays: 1, lastStay: new Date("2025-11-15"), address: null, phone: null, comments: null, born: new Date("1993-03-09"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "12345670", firstName: "pablo", lastName: "escobar", countryId: "CO", stars: 0.5, totalStays: 1, lastStay: new Date("1993-12-02"), address: "Medellin", phone: null, comments: "Plata o plomo", born: new Date("1949-12-01"), banned: true, banReason: "Actividades ilícitas" },
  { typeDocument: "DNI", numberDocument: "88223344", firstName: "natalia", lastName: "oreiro", countryId: "AR", stars: 4.4, totalStays: 3, lastStay: new Date("2026-01-25"), address: "Montevideo", phone: null, comments: null, born: new Date("1977-05-19"), banned: false, banReason: null },
  { typeDocument: "Pasaporte", numberDocument: "R10203040", firstName: "bjorn", lastName: "ironside", countryId: "DE", stars: 3.6, totalStays: 2, lastStay: new Date("2025-07-12"), address: null, phone: null, comments: "Vikingo moderno", born: new Date("1980-06-06"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "55441122", firstName: "frida", lastName: "kahlo", countryId: "MX", stars: 5.0, totalStays: 5, lastStay: new Date("2026-03-04"), address: "Coyoacán", phone: null, comments: "Artista visual", born: new Date("1907-07-06"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "11992288", firstName: "leonardo", lastName: "da vinci", countryId: "FR", stars: 5.0, totalStays: 20, lastStay: new Date("2026-03-09"), address: "Toscana", phone: null, comments: "Polímata", born: new Date("1452-04-15"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "22883377", firstName: "marie", lastName: "curie", countryId: "FR", stars: 5.0, totalStays: 2, lastStay: new Date("2025-12-10"), address: "Varsovia", phone: null, comments: "Premios Nobel", born: new Date("1867-11-07"), banned: false, banReason: null },
  { typeDocument: "Pasaporte", numberDocument: "Z44332211", firstName: "nelson", lastName: "mandela", countryId: "US", stars: 5.0, totalStays: 1, lastStay: new Date("2025-06-20"), address: null, phone: null, comments: "Líder de paz", born: new Date("1918-07-18"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "66112233", firstName: "simon", lastName: "bolivar", countryId: "CO", stars: 4.8, totalStays: 10, lastStay: new Date("2026-02-14"), address: "Caracas", phone: null, comments: "El libertador", born: new Date("1783-07-24"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "99443322", firstName: "rosa", lastName: "parks", countryId: "US", stars: 4.9, totalStays: 1, lastStay: new Date("2025-08-30"), address: null, phone: null, comments: "Activista civil", born: new Date("1913-02-04"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "11559988", firstName: "albert", lastName: "einstein", countryId: "DE", stars: 5.0, totalStays: 3, lastStay: new Date("2026-01-01"), address: null, phone: null, comments: "Relatividad", born: new Date("1879-03-14"), banned: false, banReason: null },
  { typeDocument: "Pasaporte", numberDocument: "W11223344", firstName: "malala", lastName: "yousafzai", countryId: "CA", stars: 4.7, totalStays: 2, lastStay: new Date("2026-03-02"), address: null, phone: null, comments: null, born: new Date("1997-07-12"), banned: false, banReason: null },
  { typeDocument: "DNI", numberDocument: "77228833", firstName: "gustavo", lastName: "cerati", countryId: "AR", stars: 5.0, totalStays: 12, lastStay: new Date("2026-03-07"), address: "Buenos Aires", phone: null, comments: "Gracias totales", born: new Date("1959-08-11"), banned: false, banReason: null }
];


export const seedPays: Omit<Pay, 'id'|'userId' | 'stayId'>[] = [
  { date: new Date("2026-03-01T08:00:00Z"), description: "Pago Habitación 101", payType: "efectivo", mount: 120.50, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-01T10:30:00Z"), description: "Consumo Minibar", payType: "electronico", mount: 15.00, operationNumber: "BN-1001", startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-01T14:00:00Z"), description: "Reserva Suite", payType: "efectivo", mount: 300.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-01T17:15:00Z"), description: "Servicio de Lavandería", payType: "electronico", mount: 25.50, operationNumber: "BN-1002", startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-01T20:45:00Z"), description: "Pago Late Check-out", payType: "efectivo", mount: 50.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-02T09:00:00Z"), description: "Pago Habitación 202", payType: "efectivo", mount: 110.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-02T11:20:00Z"), description: "Desayuno Buffet", payType: "electronico", mount: 20.00, operationNumber: "BN-2001", startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-02T13:45:00Z"), description: "Pago Cochera", payType: "efectivo", mount: 15.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-02T16:10:00Z"), description: "Reserva Evento", payType: "electronico", mount: 500.00, operationNumber: "BN-2002", startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-02T19:30:00Z"), description: "Pago Habitación 105", payType: "efectivo", mount: 95.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-03T08:30:00Z"), description: "Pago Habitación 303", payType: "efectivo", mount: 140.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-03T10:45:00Z"), description: "Consumo Bar", payType: "electronico", mount: 45.50, operationNumber: "BN-3001", startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-03T12:00:00Z"), description: "Pago Tour Ciudad", payType: "efectivo", mount: 60.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-03T15:30:00Z"), description: "Pago Habitación 102", payType: "electronico", mount: 120.50, operationNumber: "BN-3002", startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-03T18:20:00Z"), description: "Cena Especial", payType: "efectivo", mount: 80.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-04T07:45:00Z"), description: "Reserva Anticipada Mayo", payType: "electronico", mount: 150.00, operationNumber: "BN-4001", startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-04T10:15:00Z"), description: "Pago Habitación 401", payType: "efectivo", mount: 180.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-04T13:00:00Z"), description: "Uso de Gimnasio Ext.", payType: "efectivo", mount: 10.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-04T16:40:00Z"), description: "Pago Traslado Aeropuerto", payType: "electronico", mount: 35.00, operationNumber: "BN-4002", startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-04T21:00:00Z"), description: "Consumo Cafetería", payType: "efectivo", mount: 12.50, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-05T09:10:00Z"), description: "Pago Habitación 110", payType: "efectivo", mount: 90.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-05T12:25:00Z"), description: "Almuerzo Ejecutivo", payType: "electronico", mount: 22.00, operationNumber: "BN-5001", startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-05T14:50:00Z"), description: "Pago Habitación 205", payType: "efectivo", mount: 110.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-05T17:35:00Z"), description: "Servicio de Spa", payType: "electronico", mount: 75.00, operationNumber: "BN-5002", startDayDate: null, endDayDate: null },
  { date: new Date("2026-03-05T20:15:00Z"), description: "Pago Habitación 301", payType: "efectivo", mount: 130.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-01T09:00:00Z"), description: "Pago Habitación 101",  payType: "efectivo", mount: 120.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-01T13:00:00Z"), description: "Consumo Restaurante",  payType: "electronico", mount: 45.00, operationNumber: "FEB-001", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-01T18:00:00Z"), description: "Servicio de Spa",  payType: "efectivo", mount: 60.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-02T09:00:00Z"), description: "Pago Habitación 202",  payType: "electronico", mount: 110.00, operationNumber: "FEB-002", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-02T13:00:00Z"), description: "Almuerzo Ejecutivo",  payType: "efectivo", mount: 25.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-02T18:00:00Z"), description: "Lavandería",  payType: "electronico", mount: 15.50, operationNumber: "FEB-003", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-03T09:00:00Z"), description: "Pago Habitación 303",  payType: "efectivo", mount: 140.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-03T13:00:00Z"), description: "Consumo Bar",  payType: "electronico", mount: 35.00, operationNumber: "FEB-004", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-03T18:00:00Z"), description: "Cochera",  payType: "efectivo", mount: 10.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-04T09:00:00Z"), description: "Pago Habitación 104",  payType: "electronico", mount: 120.00, operationNumber: "FEB-005", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-04T13:00:00Z"), description: "Cena",  payType: "efectivo", mount: 50.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-04T18:00:00Z"), description: "Minibar",  payType: "electronico", mount: 12.00, operationNumber: "FEB-006", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-05T09:00:00Z"), description: "Pago Habitación 105",  payType: "efectivo", mount: 130.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-05T13:00:00Z"), description: "Tour",  payType: "electronico", mount: 80.00, operationNumber: "FEB-007", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-05T18:00:00Z"), description: "Late Check-out",  payType: "efectivo", mount: 40.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-06T09:00:00Z"), description: "Pago Habitación 106",  payType: "electronico", mount: 115.00, operationNumber: "FEB-008", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-06T13:00:00Z"), description: "Desayuno",  payType: "efectivo", mount: 15.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-06T18:00:00Z"), description: "Gimnasio",  payType: "electronico", mount: 20.00, operationNumber: "FEB-009", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-07T09:00:00Z"), description: "Pago Habitación 107",  payType: "efectivo", mount: 125.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-07T13:00:00Z"), description: "Snacks",  payType: "electronico", mount: 10.50, operationNumber: "FEB-010", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-07T18:00:00Z"), description: "Bebidas",  payType: "efectivo", mount: 18.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-08T09:00:00Z"), description: "Pago Habitación 108",  payType: "electronico", mount: 110.00, operationNumber: "FEB-011", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-08T13:00:00Z"), description: "Almuerzo",  payType: "efectivo", mount: 30.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-08T18:00:00Z"), description: "Transporte",  payType: "electronico", mount: 40.00, operationNumber: "FEB-012", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-09T09:00:00Z"), description: "Pago Habitación 109",  payType: "efectivo", mount: 100.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-09T13:00:00Z"), description: "Consumo Bar",  payType: "electronico", mount: 22.00, operationNumber: "FEB-013", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-09T18:00:00Z"), description: "Servicio Cuarto",  payType: "efectivo", mount: 15.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-10T09:00:00Z"), description: "Pago Habitación 110",  payType: "electronico", mount: 120.00, operationNumber: "FEB-014", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-10T13:00:00Z"), description: "Cena",  payType: "efectivo", mount: 55.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-10T18:00:00Z"), description: "Minibar",  payType: "electronico", mount: 8.50, operationNumber: "FEB-015", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-11T09:00:00Z"), description: "Pago Habitación 111",  payType: "efectivo", mount: 135.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-11T13:00:00Z"), description: "Almuerzo",  payType: "electronico", mount: 28.00, operationNumber: "FEB-016", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-11T18:00:00Z"), description: "Lavandería",  payType: "efectivo", mount: 12.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-12T09:00:00Z"), description: "Pago Habitación 112",  payType: "electronico", mount: 110.00, operationNumber: "FEB-017", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-12T13:00:00Z"), description: "Cafetería",  payType: "efectivo", mount: 14.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-12T18:00:00Z"), description: "Spa",  payType: "electronico", mount: 45.00, operationNumber: "FEB-018", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-13T09:00:00Z"), description: "Pago Habitación 113",  payType: "efectivo", mount: 140.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-13T13:00:00Z"), description: "Comida Bar",  payType: "electronico", mount: 30.00, operationNumber: "FEB-019", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-13T18:00:00Z"), description: "Cochera",  payType: "efectivo", mount: 10.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-14T09:00:00Z"), description: "Especial San Valentín",  payType: "electronico", mount: 250.00, operationNumber: "FEB-020", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-14T13:00:00Z"), description: "Cena Romántica",  payType: "efectivo", mount: 180.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-14T18:00:00Z"), description: "Flores/Vino",  payType: "electronico", mount: 90.00, operationNumber: "FEB-021", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-15T09:00:00Z"), description: "Pago Habitación 115",  payType: "efectivo", mount: 110.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-15T13:00:00Z"), description: "Desayuno Familiar",  payType: "electronico", mount: 65.00, operationNumber: "FEB-022", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-15T18:00:00Z"), description: "Late Check-out",  payType: "efectivo", mount: 35.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-16T09:00:00Z"), description: "Pago Habitación 116",  payType: "electronico", mount: 120.00, operationNumber: "FEB-023", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-16T13:00:00Z"), description: "Almuerzo",  payType: "efectivo", mount: 20.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-16T18:00:00Z"), description: "Minibar",  payType: "electronico", mount: 15.00, operationNumber: "FEB-024", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-17T09:00:00Z"), description: "Pago Habitación 117",  payType: "efectivo", mount: 130.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-17T13:00:00Z"), description: "Cena",  payType: "electronico", mount: 40.00, operationNumber: "FEB-025", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-17T18:00:00Z"), description: "Cochera",  payType: "efectivo", mount: 10.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-18T09:00:00Z"), description: "Pago Habitación 118",  payType: "electronico", mount: 110.00, operationNumber: "FEB-026", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-18T13:00:00Z"), description: "Almuerzo",  payType: "efectivo", mount: 25.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-18T18:00:00Z"), description: "Lavandería",  payType: "electronico", mount: 18.00, operationNumber: "FEB-027", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-19T09:00:00Z"), description: "Pago Habitación 119",  payType: "efectivo", mount: 125.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-19T13:00:00Z"), description: "Café",  payType: "electronico", mount: 6.00, operationNumber: "FEB-028", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-19T18:00:00Z"), description: "Snacks",  payType: "efectivo", mount: 12.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-20T09:00:00Z"), description: "Pago Habitación 120",  payType: "electronico", mount: 140.00, operationNumber: "FEB-029", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-20T13:00:00Z"), description: "Almuerzo",  payType: "efectivo", mount: 32.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-20T18:00:00Z"), description: "Bar",  payType: "electronico", mount: 28.00, operationNumber: "FEB-030", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-21T09:00:00Z"), description: "Pago Habitación 121",  payType: "efectivo", mount: 110.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-21T13:00:00Z"), description: "Servicio Cuarto",  payType: "electronico", mount: 22.00, operationNumber: "FEB-031", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-21T18:00:00Z"), description: "Cochera",  payType: "efectivo", mount: 10.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-22T09:00:00Z"), description: "Pago Habitación 122",  payType: "electronico", mount: 130.00, operationNumber: "FEB-032", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-22T13:00:00Z"), description: "Desayuno",  payType: "efectivo", mount: 18.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-22T18:00:00Z"), description: "Late Check-out",  payType: "electronico", mount: 40.00, operationNumber: "FEB-033", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-23T09:00:00Z"), description: "Pago Habitación 123",  payType: "efectivo", mount: 120.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-23T13:00:00Z"), description: "Almuerzo",  payType: "electronico", mount: 25.00, operationNumber: "FEB-034", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-23T18:00:00Z"), description: "Minibar",  payType: "efectivo", mount: 9.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-24T09:00:00Z"), description: "Pago Habitación 124",  payType: "electronico", mount: 110.00, operationNumber: "FEB-035", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-24T13:00:00Z"), description: "Cena",  payType: "efectivo", mount: 48.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-24T18:00:00Z"), description: "Lavandería",  payType: "electronico", mount: 14.00, operationNumber: "FEB-036", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-25T09:00:00Z"), description: "Pago Habitación 125",  payType: "efectivo", mount: 150.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-25T13:00:00Z"), description: "Tour",  payType: "electronico", mount: 70.00, operationNumber: "FEB-037", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-25T18:00:00Z"), description: "Spa",  payType: "efectivo", mount: 55.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-26T09:00:00Z"), description: "Pago Habitación 126",  payType: "electronico", mount: 130.00, operationNumber: "FEB-038", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-26T13:00:00Z"), description: "Almuerzo",  payType: "efectivo", mount: 22.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-26T18:00:00Z"), description: "Bar",  payType: "electronico", mount: 30.00, operationNumber: "FEB-039", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-27T09:00:00Z"), description: "Pago Habitación 127",  payType: "efectivo", mount: 120.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-27T13:00:00Z"), description: "Cafetería",  payType: "electronico", mount: 12.00, operationNumber: "FEB-040", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-27T18:00:00Z"), description: "Cochera",  payType: "efectivo", mount: 10.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-28T09:00:00Z"), description: "Pago Habitación 128",  payType: "electronico", mount: 140.00, operationNumber: "FEB-041", startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-28T13:00:00Z"), description: "Almuerzo Cierre",  payType: "efectivo", mount: 35.00, operationNumber: null, startDayDate: null, endDayDate: null },
  { date: new Date("2026-02-28T18:00:00Z"), description: "Servicio Cuarto",  payType: "electronico", mount: 20.00, operationNumber: "FEB-042", startDayDate: null, endDayDate: null }
];


export const seedComments:Omit<DayComment,'id'>[] = [
  { date: new Date("2026-03-01T23:59:59Z"), comment: "Cierre de caja sin novedades, predominio de pagos en efectivo." },
  { date: new Date("2026-03-02T23:59:59Z"), comment: "Se registró un ingreso elevado por reserva de evento corporativo." },
  { date: new Date("2026-03-04T23:59:59Z"), comment: "Incremento en servicios adicionales (lavandería y traslados)." },
  { date: new Date("2026-03-05T23:59:59Z"), comment: "Día con alta rotación de habitaciones, todos los pagos procesados." },
  { date: new Date("2026-02-01T23:59:59Z"), comment: "Inicio de mes con alta demanda de servicios de spa y restaurante." },
  { date: new Date("2026-02-05T23:59:59Z"), comment: "Se reportó un incremento en pagos en efectivo durante el turno tarde." },
  { date: new Date("2026-02-10T23:59:59Z"), comment: "Cierre de caja cuadrado. Sin incidencias en las transacciones electrónicas." },
  { date: new Date("2026-02-14T23:59:59Z"), comment: "Pico máximo de ingresos por campaña de San Valentín; operatividad al 100%." },
  { date: new Date("2026-02-18T23:59:59Z"), comment: "Mantenimiento preventivo de terminales de pago realizado exitosamente." },
  { date: new Date("2026-02-22T23:59:59Z"), comment: "Predominio de servicios de lavandería y traslados al aeropuerto este domingo." },
  { date: new Date("2026-02-28T23:59:59Z"), comment: "Cierre mensual finalizado. Todos los folios de habitación liquidados correctamente." }
];

export const seedReservations:Omit<Reservation,'id' | 'userId' | 'active'>[] = [
  // 12 de marzo
  // { name: "Juan Perez", persons: 2, date: new Date("2026-03-12T10:00:00Z"), amount: 150, typeRooms: ["Matrimonial"], numberRooms: [1], phone: "987654321" },
  // { name: "Maria Garcia", persons: 1, date: new Date("2026-03-12T12:30:00Z"), amount: 80, typeRooms: ["Personal"], numberRooms: [1], phone: null },
  // { name: "Carlos Lopez", persons: 4, date: new Date("2026-03-12T14:00:00Z"), amount: 250, typeRooms: ["Doble_Familiar"], numberRooms: [1], phone: "912345678" },
  // { name: "Ana Torres", persons: 2, date: new Date("2026-03-12T16:45:00Z"), amount: 160, typeRooms: ["Doble"], numberRooms: [1, 2], phone: null },
  // { name: "Roberto Diaz", persons: 3, date: new Date("2026-03-12T19:00:00Z"), amount: 200, typeRooms: ["Triple_Familiar"], numberRooms: [1], phone: "955443322"},

  // // 13 de marzo
  // { name: "Elena Ruiz", persons: 2, date: new Date("2026-03-13T09:15:00Z"), amount: 150, typeRooms: ["Matrimonial_Simple"], numberRooms: [1], phone: "944556677" },
  // { name: "Luis Miguel", persons: 2, date: new Date("2026-03-13T11:00:00Z"), amount: 180, typeRooms: ["Doble"], numberRooms: [1, 1], phone: null },
  // { name: "Sofia Castro", persons: 5, date: new Date("2026-03-13T15:30:00Z"), amount: 350, typeRooms: ["Doble_Familiar", "Personal"], numberRooms: [1, 2], phone: "922113344"},
  // { name: "Jorge Luna", persons: 1, date: new Date("2026-03-13T18:20:00Z"), amount: 85, typeRooms: ["Personal"], numberRooms: [1], phone: null },
  // { name: "Patricia Vera", persons: 2, date: new Date("2026-03-13T21:00:00Z"), amount: 150, typeRooms: ["Matrimonial"], numberRooms: [1], phone: "933887766" },

  // // 14 de marzo
  // { name: "Ricardo Arjona", persons: 2, date: new Date("2026-03-14T08:00:00Z"), amount: 150, typeRooms: ["Matrimonial"], numberRooms: [1], phone: "900112233"},
  // { name: "Marta Sanchez", persons: 3, date: new Date("2026-03-14T10:45:00Z"), amount: 220, typeRooms: ["Triple_Familiar"], numberRooms: [2], phone: null },
  // { name: "Fernando Soler", persons: 2, date: new Date("2026-03-14T13:20:00Z"), amount: 160, typeRooms: ["Doble"], numberRooms: [1, 1], phone: "977665544" },
  // { name: "Gabriela Mistral", persons: 1, date: new Date("2026-03-14T17:50:00Z"), amount: 80, typeRooms: ["Personal"], numberRooms: [3], phone: null },
  // { name: "Victor Jara", persons: 4, date: new Date("2026-03-14T20:30:00Z"), amount: 300, typeRooms: ["Doble_Familiar"], numberRooms: [1], phone: "966554433" }
];