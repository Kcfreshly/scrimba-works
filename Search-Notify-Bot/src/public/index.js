const btn = document.querySelector("button[type='submit']");

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  const res = await fetch("http://localhost:3006/api");
  console.log(res);
  const data = await res.json();
  console.log(data);
  document.body.innerHTML = `<h1>${data.message}</h1>`;
});


btn.addEventListener("click", async (e) => {
  e.preventDefault();
  const res = await fetch("http://localhost:3006/api",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ key: "value" })
  });
  console.log(res);
  const data = await res.json();
  console.log(data);
  document.body.innerHTML = `<h1>${data.message}</h1>`;
});