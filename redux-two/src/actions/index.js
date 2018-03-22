export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const INPUTVAL = 'INPUTVAL';
export const increment = () => ({type : INCREMENT}); // add increment action
export const decrement = () => ({type : DECREMENT}); // add decrement action
export const inputval = (number) => ({type : INPUTVAL,number});

