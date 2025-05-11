document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('age-calculator-form');
  const dayInput = document.getElementById('day');
  const monthInput = document.getElementById('month');
  const yearInput = document.getElementById('year');
  
  const dayError = document.getElementById('day-error');
  const monthError = document.getElementById('month-error');
  const yearError = document.getElementById('year-error');
  
  const dayGroup = document.getElementById('day-group');
  const monthGroup = document.getElementById('month-group');
  const yearGroup = document.getElementById('year-group');
  
  const yearsResult = document.getElementById('years');
  const monthsResult = document.getElementById('months');
  const daysResult = document.getElementById('days');
  
  // Function to validate the form
  function validateForm() {
    let isValid = true;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    // Reset error states
    dayGroup.classList.remove('error');
    monthGroup.classList.remove('error');
    yearGroup.classList.remove('error');
    dayError.textContent = '';
    monthError.textContent = '';
    yearError.textContent = '';
    
    // Validate day
    if (!dayInput.value) {
      dayError.textContent = 'This field is required';
      dayGroup.classList.add('error');
      isValid = false;
    } else if (parseInt(dayInput.value) < 1 || parseInt(dayInput.value) > 31) {
      dayError.textContent = 'Must be a valid day';
      dayGroup.classList.add('error');
      isValid = false;
    }
    
    // Validate month
    if (!monthInput.value) {
      monthError.textContent = 'This field is required';
      monthGroup.classList.add('error');
      isValid = false;
    } else if (parseInt(monthInput.value) < 1 || parseInt(monthInput.value) > 12) {
      monthError.textContent = 'Must be a valid month';
      monthGroup.classList.add('error');
      isValid = false;
    }
    
    // Validate year
    if (!yearInput.value) {
      yearError.textContent = 'This field is required';
      yearGroup.classList.add('error');
      isValid = false;
    } else if (parseInt(yearInput.value) > currentYear) {
      yearError.textContent = 'Must be in the past';
      yearGroup.classList.add('error');
      isValid = false;
    }
    
    // Validate date is valid (e.g., not 31/04/YYYY)
    if (isValid) {
      const day = parseInt(dayInput.value);
      const month = parseInt(monthInput.value);
      const year = parseInt(yearInput.value);
      
      const daysInMonth = new Date(year, month, 0).getDate();
      
      if (day > daysInMonth) {
        dayError.textContent = `Invalid date`;
        dayGroup.classList.add('error');
        monthGroup.classList.add('error');
        yearGroup.classList.add('error');
        isValid = false;
      }
      
      // Check if date is in the future
      const inputDate = new Date(year, month - 1, day);
      if (inputDate > currentDate) {
        yearError.textContent = 'Must be in the past';
        dayGroup.classList.add('error');
        monthGroup.classList.add('error');
        yearGroup.classList.add('error');
        isValid = false;
      }
    }
    
    return isValid;
  }
  
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
  
  // Function to animate counting up to a number
  function animateCount(element, target) {
    const duration = 1000; // Animation duration in milliseconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.floor(progress * target);
      
      element.textContent = currentCount;
      
      if (frame === totalFrames) {
        clearInterval(counter);
        element.textContent = target;
      }
    }, frameDuration);
  }
  
  // Form submission handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const day = parseInt(dayInput.value);
      const month = parseInt(monthInput.value) - 1; // JavaScript months are 0-indexed
      const year = parseInt(yearInput.value);
      
      const birthDate = new Date(year, month, day);
      const age = calculateAge(birthDate);
      
      // Reset result display
      yearsResult.textContent = '0';
      monthsResult.textContent = '0';
      daysResult.textContent = '0';
      
      // Animate the results
      animateCount(yearsResult, age.years);
      animateCount(monthsResult, age.months);
      animateCount(daysResult, age.days);
    }
  });
});
