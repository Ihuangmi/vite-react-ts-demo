const key = localStorage.getItem("contacts");

let contacts: Array<any> = [
  {
    id: "xxx",
    first: "黄",
    last: "小米",
    favorite: true,
  },
  {
    id: "xxx2",
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  },
];

if (key) {
  contacts = JSON.parse(key);
}

function setStorage(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

export function getContacts(searchText) {
  let filterContacts = [...contacts];
  if (searchText) {
    filterContacts = contacts.filter((item) => {
      if (item.first.includes(searchText) || item.last.includes(searchText)) {
        return item;
      }
    });
  }

  return new Promise((resolve) => {
    resolve(filterContacts);
  });
}

export function createContact(params) {
  return new Promise((resolve) => {
    const contact = {
      id: Date.now().toString(),
      first: "",
      last: "",
      favorite: false,
      ...params,
    };
    contacts.push(contact);
    setStorage(contacts);

    resolve(contact);
  });
}

export function getContact(contactId) {
  return new Promise((resolve, reject) => {
    const contact = contacts.find((item) => item.id === contactId);
    resolve(contact);
  });
}

export function updateContact(contactId, updates) {
  return new Promise((resolve, reject) => {
    if (contactId === "undefined") {
      contacts[contacts.length - 1] = {
        id: updates.first + updates.last,
        ...updates,
      };
      setStorage(contacts);
      resolve(contacts);
    } else {
      const i = contacts.findIndex((item) => item.id === contactId);
      contacts[i] = { ...contacts[i], ...updates };

      setStorage(contacts);
      resolve(contacts);
    }
  });
}

export function deleteContact(contactId) {
  return new Promise((resolve, reject) => {
    const i = contacts.findIndex((item) => item.id === contactId);
    contacts.splice(i, 1);
    setStorage(contacts);
    resolve(contacts);
  });
}

function fn() {
  // 原始数据
  let arr = [
    { id: 1, name: "部门1", pid: 0 },
    { id: 2, name: "部门2", pid: 1 },
    { id: 3, name: "部门3", pid: 1 },
    { id: 4, name: "部门4", pid: 3 },
    { id: 5, name: "部门5", pid: 4 },
  ];
  // 希望输出的结果如下，可以尝试如何把时间复杂度降到最低
  let tranArr = [
    {
      id: 1,
      name: "部门1",
      pid: 0,
      children: [
        {
          id: 2,
          name: "部门2",
          pid: 1,
          children: [],
        },
        {
          id: 3,
          name: "部门3",
          pid: 1,
          children: [
            {
              id: 4,
              name: "部门4",
              pid: 3,
              children: [{ id: 5, name: "部门5", pid: 4 }],
            },
          ],
        },
      ],
    },
  ];

  function tranToTree(arr) {
    if (!arr.length) return;

    let newArr = [];
    for (let i = 0; i < arr.length; i++) {}
  }
}
