const fs = require('fs');

// Sample data arrays for generating realistic candidates
const firstNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Nancy', 'Daniel', 'Lisa',
  'Matthew', 'Betty', 'Anthony', 'Helen', 'Mark', 'Sandra', 'Donald', 'Donna',
  'Steven', 'Carol', 'Paul', 'Ruth', 'Andrew', 'Sharon', 'Joshua', 'Michelle',
  'Kenneth', 'Laura', 'Kevin', 'Sarah', 'Brian', 'Kimberly', 'George', 'Deborah',
  'Edward', 'Dorothy', 'Ronald', 'Lisa', 'Timothy', 'Nancy', 'Jason', 'Karen'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
  'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
  'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker'
];

const roles = [
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile Developer',
  'DevOps Engineer', 'Data Scientist', 'Machine Learning Engineer', 'Product Manager',
  'UX Designer', 'UI Designer', 'QA Engineer', 'Security Engineer', 'Cloud Architect',
  'Software Architect', 'Technical Lead', 'Scrum Master', 'Business Analyst',
  'Data Analyst', 'System Administrator', 'Network Engineer'
];

const statuses = ['new', 'processed', 'rejected', 'hired'];

const hrAssignees = [
  'Alice Cooper', 'Bob Wilson', 'Carol Davis', 'David Miller', 'Eva Johnson',
  'Frank Brown', 'Grace Lee', 'Henry Taylor', 'Iris Chen', 'Jack Robinson'
];

// Generate random data
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomDate = () => {
  const start = new Date(2023, 0, 1);
  const end = new Date(2024, 11, 31);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    .toISOString().split('T')[0];
};

/**
 * Generates realistic candidate data for testing
 * Creates 1000 candidates with varied information
 */
const generateCandidates = () => {
  const candidates = [];
  
  for (let i = 1; i <= 1000; i++) {
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`;
    const phone = `+1-555-${String(getRandomNumber(1000, 9999))}`;
    
    candidates.push({
      id: i,
      name,
      email,
      phone,
      role: getRandomItem(roles),
      status: getRandomItem(statuses),
      resume: `https://example.com/resumes/${firstName.toLowerCase()}-${lastName.toLowerCase()}.pdf`,
      date: getRandomDate(),
      experience: getRandomNumber(0, 15),
      assignee: getRandomItem(hrAssignees)
    });
  }
  
  return candidates;
};

// Generate and save data
const data = {
  candidates: generateCandidates()
};

fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
console.log('Generated 1000 candidates in db.json');