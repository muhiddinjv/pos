const fetchData = async () => {
  try {
    const res = await fetch('http://localhost:5000/getuser');
    const data = await res.json();
    console.log('res', data)
    if (data.cod == "404") {
      inputError.innerText = "Please enter a valid name!";
    }
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const handleSubmit = async (e) => {
  postData("http://localhost:5000/adduser", {
    username: username.value,
    userage: userage.value,
  })
  .then(() => fetchData())
  .then(function () {
    updateUI();
  });
};

const postData = async (url = "", data = {}) => {
  // console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = async () => {
  const request = await fetch("http://localhost:5000/getuser");
  try {
    const allData = await request.json();
    const entryHolder = document.getElementById("output");
    const fragment = document.createDocumentFragment();
    const entryRow = document.createElement("li");

    allData.map(d => {
      entryRow.innerHTML = `
        <li>name: ${d.username}</li>
        <li>age: ${d.userage}</li>
      `
    })

    entryRow.setAttribute("class", "entryRow");
    fragment.appendChild(entryRow);
    entryHolder.appendChild(fragment);
  } catch (error) {
    console.log("error", error);
  }
};
// JavaScript program for reversing the linked list
 
var head;
 
     class Node {
        constructor(val) {
            this.data = val;
            this.next = null;
        }
    }
 
    /* Function to reverse the linked list */
    function reverse(node) {
    var prev = null;
    var current = node;
    var next = null;
        while (current != null) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        node = prev;
        return node;
    }
 
    // prints content of double linked list
    function printList(node) {
        while (node != null) {
            document.write(node.data + " ");
            node = node.next;
        }
    }
 
    // Driver Code
     
        head = new Node(85);
        head.next = new Node(15);
        head.next.next = new Node(4);
        head.next.next.next = new Node(20);
 
        document.write("Given Linked list<br/>");
        printList(head);
        head = reverse(head);
        document.write("<br/>");
        document.write("Reversed linked list<br/> ");
        printList(head);
 
// This code is contributed by todaysgaurav
 x`x`

// const nums = [];
// const generateNumbersBelow = (num) => {
  
//   for (let i = 0; i < num; i++) {
//         nums.push(i)
//         nums.reverse()
//   }
  
// }
// generateNumbersBelow(8);

// console.log(nums)