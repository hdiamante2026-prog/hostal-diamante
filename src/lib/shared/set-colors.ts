 const colors = [
'#1A237E', // 0: Azul muy oscuro
    '#E64A19', // 1: Naranja rojizo
    '#1B5E20', // 2: Verde bosque
    '#880E4F', // 3: Rosa fuerte
    '#FBC02D', // 4: Amarillo
    '#4A148C', // 5: Púrpura profundo
    '#006064', // 6: Cian oscuro
    '#F44336', // 7: Rojo vibrante
    '#2196F3', // 8: Azul brillante
    '#795548', // 9: Marrón
    '#4CAF50', // 10: Verde medio
    '#E91E63', // 11: Rosa fucsia
    '#03A9F4', // 12: Celeste
    '#FF6F00', // 13: Ámbar oscuro
    '#004D40', // 14: Verde azulado
    '#9C27B0', // 15: Púrpura
    '#B71C1C', // 16: Rojo oscuro
    '#0097A7', // 17: Turquesa
    '#8BC34A', // 18: Verde lima
    '#673AB7', // 19: Violeta
    '#37474F', // 20: Gris azulado
    '#FF8F00', // 21: Naranja
    '#009688', // 22: Verde esmeralda
    '#4E342E', // 23: Marrón oscuro
    '#3F51B5'  // 24: Índigo
  ];

export const genRandomColor = () => {
 
  const len = colors.length
  
  const {floor,random} = Math
  const ix = floor(random() * len);
  return colors[ix];
}

// export const genRandomColor = () => {
//   let currentIndex = 0;

//   return () => {
//     const color = colors[currentIndex];
//     currentIndex = (currentIndex + 1) % colors.length;
//     return color;
//   };
// };