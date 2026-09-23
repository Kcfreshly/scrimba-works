// accessiblity testing

// below will throw an error because the alt text is empty
// screen.getByRole("img", { name: "troll face" })

// this is a test driven development (TDD) approach to writing tests first before the code is written


import { test, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'

import Header from './Header'

describe("Header", () => {

  test("displays the app name", () => {
    render(<Header />)

    expect(screen.getByText("Meme Generator")).toBeInTheDocument()
  })

  test("displays the troll face", () => {
    render(<Header />)

    expect(screen.getByRole("img").src).toContain("troll-face.png")
  })
})


import { test, expect, describe } from 'vitest'

import { render, screen } from '@testing-library/react'

import App from './App'

describe("a11y", () => {

  test("ensures troll face image is accessible", () => {
    render(<App />)

    expect(screen.getByAltText("Troll face")).toBeInTheDocument()
  })

  test("ensures meme image is accessible", () => {
    render(<App />)

    expect(screen.getByAltText("One Does Not Simply")).toBeInTheDocument()
  })
})



// How to test

// Manual and Automated testing are two different approaches to software testing. 
// Manual testing involves human testers executing test cases and verifying the results, 
// while automated testing uses scripts and tools to run tests automatically.

// Funcitonal testing is a type of software testing that focuses on verifying the functionality of a software application or system.
// It involves testing the software against its functional requirements to ensure that it behaves as expected and meets 
// the specified criteria.

// Non-functional testing, on the other hand, focuses on evaluating the non-functional aspects of a software application or system.
// It assesses attributes such as performance, security, usability, reliability, and scalability, 
// which are not directly related to specific functionalities but are crucial for the overall quality and user experience of the software.

// Another way to classify testing is by the type of testing being performed. Some common types of testing include:

// Unit testing: Testing individual units or components of the software in isolation.
// Integration testing: Testing the interaction between different units or components to ensure they work together correctly.
// System testing: Testing the entire system as a whole to verify that it meets the specified requirements.
// Acceptance testing: Testing the software from the end user's perspective to ensure it meets their needs and expectations.
// Regression testing: Testing the software after changes or updates to ensure that existing functionality is not broken.



//Nonfunctional testing: Testing the software's non-functional aspects, such as performance, usability, and reliability.
// Usability testing: Testing the software's user interface and user experience to ensure it is intuitive and user-friendly.
// Performance testing: Testing the software's performance under various conditions, such as load testing and stress testing.
// Security testing: Testing the software for vulnerabilities and weaknesses to ensure it is secure against potential threats.
// Compatibility testing: Testing the software's compatibility with different operating systems, browsers, and devices.

// Covers both funcitonal and non-functional testing
// Regression testing: Testing the software after changes or updates to ensure that existing functionality is not broken and that new features do not introduce new issues.
//smoke testing: A quick and basic test to check if the software is stable enough for further testing.