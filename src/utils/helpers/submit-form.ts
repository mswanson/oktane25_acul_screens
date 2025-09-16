export default function submitForm(formValues: object) {
  // Create a hidden form
  const form = document.createElement("form");
  form.method = "POST";
  form.style.display = "none";

  for (const [key, value] of Object.entries({ ...formValues })) {
    const input = document.createElement("input");
    input.value = value as string;
    input.name = key;
    form.appendChild(input);
  }

  // Append and submit form
  document.body.appendChild(form);
  form.submit();
}
