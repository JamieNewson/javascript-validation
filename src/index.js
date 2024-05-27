import "./styles.css";

if (process.env.NODE_ENV !== "production")
  console.log("Looks like we are in development mode!");

function HelloWorld() {
  const title = document.createElement("h1");
  title.innerText = "Hello World!";

  return title;
}

document.body.appendChild(HelloWorld());
