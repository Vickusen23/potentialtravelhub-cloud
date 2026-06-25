const form = document.getElementById("inquiryForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById("document");
  const file = fileInput.files[0];

  let fileKey = "";

  try {
    if (file) {
      const uploadUrlResponse = await fetch(
  `https://p30rp2pbrc.execute-api.us-east-1.amazonaws.com/generate-upload-url?fileName=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const uploadUrlData = await uploadUrlResponse.json();

      await fetch(uploadUrlData.uploadUrl, {
  method: "PUT",
  headers: {
    "Content-Type": file.type
  },
  body: file
});

      fileKey = uploadUrlData.fileKey || file.name;
    }

    const data = {
      fullName: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      service: document.getElementById("service").value,
      message: document.getElementById("message").value,
      documentKey: fileKey
    };

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

    await response.json();

    form.reset();

    document.getElementById("successMessage").style.display = "block";

  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please try again.");
  }
});
