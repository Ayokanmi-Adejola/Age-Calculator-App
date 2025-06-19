# Frontend Mentor - Age Calculator App Solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects.




## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

![Design preview for the Age calculator app coding challenge](preview.jpg)

### Features

- **Responsive Design**: The app is fully responsive and works on both mobile and desktop devices.
- **Form Validation**: Comprehensive form validation with clear error messages.
- **Age Calculation**: Accurate calculation of age in years, months, and days.
- **Animated Results**: The age numbers animate to their final values when the form is submitted.
- **Accessibility**: The app is built with accessibility in mind, including proper labels and focus states.


## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- Vanilla JavaScript
- Google Fonts (Poppins)

### What I learned

This project was a great opportunity to practice form validation and date calculations in JavaScript. I learned how to:

- Implement comprehensive form validation with clear error messages
- Calculate age accurately considering months with different numbers of days
- Create smooth animations for number counting
- Design a responsive layout that works well on different screen sizes

Some code snippets I'm proud of:

```html
<div class="input-group" id="day-group">
  <label for="day">Day</label>
  <input type="number" id="day" name="day" placeholder="DD" min="1" max="31">
  <p class="error-message" id="day-error"></p>
</div>
```

```css
.submit-btn {
  background-color: var(--purple-500);
  border: none;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: var(--black);
}
```

```js
// Function to calculate age
function calculateAge(birthDate) {
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Adjust if current day is less than birth day
  if (days < 0) {
    months--;
    // Get the last day of the previous month
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // Adjust if current month is less than birth month
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}
```

### Continued development

In future projects, I would like to focus on:

- Implementing more advanced animations and transitions
- Exploring more complex form validation techniques
- Improving accessibility features
- Adding unit tests for JavaScript functions

## Author

- Frontend Mentor - [@AyokanmiAdejola](https://www.frontendmentor.io/profile/Ayokanmi-Adejola)
