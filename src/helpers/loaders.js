async function loader(query) {
  try {
    const response = await fetch(`http://localhost:3000/${query}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export { loader };
