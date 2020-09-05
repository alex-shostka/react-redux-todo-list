export const getData = async () => {
  try {
    const data = await fetch('http://localhost:3100/get');
    return data.json();
  } catch (error) {
    console.log("error", error);
  }
}
