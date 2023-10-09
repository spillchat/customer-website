// when the DOM is ready
$(document).ready(function () {
  // make an array of invalid domains
  const invalidDomains = ["gmail.com", "yahoo.com", "hotmail.com"];

  // get the submit button
  const submitBtn = $("#modal-submit");

  // on submit button click
  submitBtn.click(() => {
    // get the email field
    const email = $("#work-email");
    // split email at '@' character to get domain
    const domainPart = email.val().split("@")[1];

    // if the domain exists in the invalidDomains array
    if (invalidDomains.indexOf(domainPart) !== -1) {
      // clear email field
      email.val("");
      // add a 'use business mail' placeholder
      email.attr("placeholder", "Please enter a business email");
      // prevent form submission
      return false;
    } else {
      // else if email is not invalid
      // submit form
      return true;
    }
  });
});
