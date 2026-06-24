const form = document.getElementById("inquiryForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    service: document.getElementById("service").value,
    message: document.getElementById("message").value
  };

  try {
    const response = await fetch(
      "https://p30rp2pbrc.execute-api.us-east-1.amazonaws.com/inquiry",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();

    form.reset();

    document.getElementById("successMessage").style.display = "block";

  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please try again.");
  }
});
