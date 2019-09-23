


export const getDate = () => {
  return fetch('http://localhost:3000/date', { method: "post" }).then(res => res.json());
}


export const getGoods = (date) => {
  return fetch(`http://localhost:3000/goods?date=${date}`, { method: "post" }).then(res => res.json());
}

export const getData = (date, good) => {
  return fetch(`http://localhost:3000/list?date=${date}&good=${good}`, { method: "post" }).then(res => res.json());
}