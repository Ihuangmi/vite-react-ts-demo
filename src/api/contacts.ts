export function getContacts() {
  return new Promise((resolve, reject) => {
    resolve([
      {
        id: "xxx",
        first: "黄",
        last: "小米",
        favorite: true,
      },
      {
        id: "xxx2",
        first: "里",
        last: "跟",
      },
    ]);
  });
}

export function createContact() {
  return new Promise((resolve, reject) => {
    resolve([
      {
        id: "xxx",
        first: "黄",
        last: "小米",
        favorite: true,
      },
    ]);
  });
}
